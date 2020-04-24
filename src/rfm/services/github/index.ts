import newGithubIssueUrl from 'new-github-issue-url'
import isURL from 'validator/lib/isURL'
import { SubmitRequest } from '../api/github'

export const createGithubIssue = (request?: SubmitRequest) => {
  if (!request) return ''
  return newGithubIssueUrl({
    body: JSON.stringify(request, null, 4),
    labels: ['search'],
    repo: 'rfm',
    title: request.fullName,
    user: 'sospedra',
  })
}

export const isValidGithubUrl = (candidate: string) => {
  try {
    const isValidUrl = isURL(candidate, {
      host_whitelist: [/^.*github\.com$/],
    })
    const isValidFullName =
      candidate.split('/').length === 2 && candidate.match(/\//gi)?.length === 1

    return isValidUrl || isValidFullName
  } catch (ex) {
    return false
  }
}

export const createGithubRepoUrl = (candidate: string) => {
  return isURL(candidate) ? candidate : `https://github.com/${candidate}`
}

export const NONE_ISSUE = 'NONE'

export const isValidGithubIssueUrl = (candidate: string) => {
  try {
    if (candidate === NONE_ISSUE) return true

    if (isValidGithubUrl(candidate)) {
      const [path, number] = candidate.split('/').slice(-2)
      if (path === 'issues') {
        if (!Number.isNaN(Number(number))) {
          return true
        }
      }
    }

    return false
  } catch (ex) {
    return false
  }
}
