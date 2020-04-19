const GITHUB_ROOT = 'https://api.github.com'

export type Request = {
  body: string
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
  const path = `${GITHUB_ROOT}/search/issues?q=${params.join('+')}`
  const response = await fetch(path)
  const payload: {
    items: { [key: string]: any }[]
    total_count: number
  } = await response.json()
  const requestList = payload.items.map<Request>((item) => ({
    body: item.body,
    id: item.id,
    comments: item.comments,
    createdAt: new Date(item.created_at),
    title: item.title,
    updatedAt: new Date(item.updated_at),
    url: item.url,
  }))

  return {
    requestList,
    total: payload.total_count,
  }
}

export type SubmitRequest = {
  description: string
  fullName: string
  language: string
  license: string
  name: string
  openIssues: number
  stars: number
  topics: string
  updatedAt: string
  url: string
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
  const repo: SubmitRequest = {
    description: payload.description,
    fullName: payload.full_name,
    language: payload.language,
    license: payload.license.spdx_id,
    name: payload.name,
    openIssues: payload.open_issues_count,
    stars: payload.stargazers_count,
    topics: payload.topics.join(', '),
    updatedAt: payload.updated_at,
    url: payload.url,
  }

  return repo
}
