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
  const isValidUrl = isURL(candidate, {
    host_whitelist: [/^.*github\.com$/],
  })
  const isValidFullName =
    candidate.split('/').length === 2 && candidate.match(/\//gi)?.length === 1

  return isValidUrl || isValidFullName
}

export const createGithubRepoUrl = (candidate: string) => {
  return isURL(candidate) ? candidate : `https://github.com/${candidate}`
}
