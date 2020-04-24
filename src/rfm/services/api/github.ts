import langmap from 'language-map'

const GITHUB_ROOT = 'https://api.github.com'

export type SubmitRequest = {
  aceMode?: string
  aliases?: string[]
  color?: string
  description: string
  extensions?: string[]
  filenames?: string[]
  fullName: string
  owner: string
  name: string
  group?: string
  interpreters?: string[]
  language: string
  license?: string
  requestIssueURL: string
  requestIssueNumber: number
  openIssues: number
  stars: number
  topics?: string[]
  updatedAt: string
  url: string
}

export type Request = {
  body: SubmitRequest
  comments: number
  createdAt: Date
  title: string
  id: number
  updatedAt: Date
  url: string
}

export const fetcherRequestList = async (query: string = '') => {
  const params = [
    'repo:sospedra/rfm',
    'state:open',
    'label:search',
    query,
    'in:title,body',
  ]
  const path = `${GITHUB_ROOT}/search/issues?q=${params.join('+')}&per_page=100`
  const response = await fetch(path)
  const payload: {
    items: { [key: string]: any }[]
    total_count: number
  } = await response.json()
  const items = payload.items.map<Request | null>((item) => {
    try {
      return {
        body: JSON.parse(item.body),
        id: item.id,
        comments: item.comments,
        createdAt: new Date(item.created_at),
        title: item.title,
        updatedAt: new Date(item.updated_at),
        url: item.html_url,
      }
    } catch (ex) {
      return null
    }
  })
  const requestList = items.filter((_) => _ !== null) as Request[]

  return {
    requestList,
    total: payload.total_count,
  }
}

const safe = <T extends { [key: string]: any }>(
  collection: T | undefined,
  key: keyof T,
  name?: string,
) => {
  if (!collection) return {}
  let property = collection[key] as string | string[] | number
  return !!property ? { [name || key]: property } : {}
}

export const fetcherSubmitRequest = async (repoUrl: string) => {
  const [_, pathname] = repoUrl.split('github.com/')
  const [owner, name] = pathname.split('/')
  const response: { [key: string]: any } = await fetch(
    `${GITHUB_ROOT}/repos/${owner}/${name}`,
    {
      headers: {
        Accept: 'application/vnd.github.mercy-preview+json',
      },
    },
  )
  const payload = await response.json()
  const language = langmap[payload.language]
  const repo: SubmitRequest = {
    description: payload.description,
    fullName: payload.full_name,
    language: payload.language,
    name,
    openIssues: payload.open_issues_count,
    owner,
    stars: payload.stargazers_count,
    updatedAt: payload.updated_at,
    url: payload.html_url,
    requestIssueURL: 'NONE',
    requestIssueNumber: -1,
    ...safe(payload.license, 'spdx_id', 'license'),
    ...safe(payload, 'topics'),
    ...safe(language, 'filenames'),
    ...safe(language, 'aceMode'),
    ...safe(language, 'aliases'),
    ...safe(language, 'color'),
    ...safe(language, 'extensions'),
    ...safe(language, 'group'),
    ...safe(language, 'interpreters'),
  }

  return repo
}

export const fetcherFindSupportIssues = async (fullName: string) => {
  const params = [
    `repo:${fullName}`,
    'state:open',
    'type:issue',
    'support OR maintain',
    'in:title,body',
  ]
  const path = `${GITHUB_ROOT}/search/issues?q=${params.join('+')}&per_page=10`
  const response = await fetch(path)
  const payload: {
    items: { [key: string]: any }[]
    total_count: number
  } = await response.json()
  const items = payload.items.map<
    Partial<Request> & {
      user: string
      number: number
      body: string
    }
  >((item) => ({
    id: item.id,
    body: item.body,
    comments: item.comments,
    createdAt: new Date(item.created_at),
    title: item.title,
    url: item.html_url,
    user: item.user.login,
    number: item.number,
  }))

  return {
    requestList: items,
    total: payload.total_count,
  }
}
