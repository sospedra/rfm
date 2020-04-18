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
