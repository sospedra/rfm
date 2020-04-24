import React from 'react'
import { SubmitRequest } from '../rfm/services/api/github'
import { createGithubIssue } from '../rfm/services/github'
import Button from './Button'

const formatProperty = (key: string, data?: SubmitRequest) => {
  const property = data && data[key as keyof SubmitRequest]
  if (property instanceof Array) return `[${property.join(', ')}]`
  return property
}

const parseRequestIssue = (requestIssue: string) => {
  if (requestIssue === 'NONE')
    return {
      requestIssueURL: requestIssue,
      requestIssueNumber: -1,
    }

  const [left, number] = requestIssue.split('/issues/')
  return {
    requestIssueFullName: left.split('/').slice(-2).join('/'),
    requestIssueNumber: Number(number),
  }
}

const Preview: React.FC<{
  data?: SubmitRequest
  requestIssue: string
}> = (props) => {
  const repo = {
    ...props.data,
    ...parseRequestIssue(props.requestIssue),
  } as SubmitRequest
  return (
    <section className='flex flex-col items-center w-full py-6'>
      <h1 className='font-mono text-xl font-bold'>Save the request</h1>
      <h3 className='mb-4 text-lg'>
        You're gonna be redirected to our Github to save this request. After
        that the project <b>{repo?.fullName}</b> will be marked as calling for
        maintainers.
      </h3>
      <Button href={createGithubIssue(repo)}>Submit request</Button>
      <div className='w-full text-left sm:w-auto'>
        <p className='pt-4 font-mono text-xs font-bold text-left text-gray-600'>
          Inspect
        </p>
        <p className='pb-2'>This is the repo you're about to submit:</p>

        <pre className='overflow-auto'>
          <p>{`{`}</p>
          {Object.keys(repo || {}).map((key) => (
            <p className='pl-4' key={key}>
              <span className='text-pink-500'>{key}</span>
              <span className='whitespace-pre-wrap'>
                :
                <span className='text-gray-800'>
                  {' '}
                  {formatProperty(key, repo)}
                </span>
                ,
              </span>
            </p>
          ))}
          <p>{`}`}</p>
        </pre>
      </div>
    </section>
  )
}

export default Preview
