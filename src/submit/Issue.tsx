import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import Markdown from 'markdown-to-jsx'
import useSWR from 'swr'
import { isValidGithubUrl } from '../rfm/services/github'
import {
  SubmitRequest,
  fetcherFindSupportIssues,
} from '../rfm/services/api/github'
import Comments from '../rfm/components/Comments'
import Error from '../rfm/components/Error'
import Button from './Button'
import './issue.css'

const NONE_ISSUE = 'NONE'

const Issue: React.FC<{
  onNext: () => void
  data?: SubmitRequest
}> = (props) => {
  const [issueURL, setIssueURL] = useState<string>('')
  const isValidUrl = isValidGithubUrl(issueURL) || issueURL === NONE_ISSUE
  const { data, error } = useSWR(
    [props.data?.fullName],
    fetcherFindSupportIssues,
  )

  return (
    <section>
      <h1 className='font-mono text-xl font-bold'>Enter the issue link</h1>
      <h3>
        To ensure the best communication we need to know in which Github issue
        the owners of <b>{props.data?.fullName}</b> requested support to
        maintain the project
      </h3>
      <form
        id='js-submit-issue'
        className='flex flex-col items-center w-full'
        onSubmit={(e) => {
          e.preventDefault()
          props.onNext()
        }}
      >
        <div className='w-full md:w-2/3'>
          <Error error={error} />
          <input
            id='githubRepo'
            value={issueURL}
            onChange={(e) => setIssueURL(e.currentTarget.value)}
            placeholder={`github.com/${props.data?.fullName}/:number`}
            className='w-full px-4 py-2 my-4 border rounded shadow-lg'
            required
          />
          {!!data?.total && (
            <div className='flex flex-col flex-1 w-full'>
              <p className='pt-4 font-mono text-xs font-bold text-left text-gray-600'>
                Suggestions
              </p>
              <p className='pb-2 text-left'>Maybe it's one of these</p>
              {data.requestList.map(
                ({
                  id,
                  url,
                  title,
                  user,
                  createdAt,
                  comments,
                  number,
                  body,
                }) => (
                  <label
                    key={id}
                    className='flex flex-row items-baseline p-4 border-t cursor-pointer'
                  >
                    <input
                      name='issue'
                      type='radio'
                      value={url}
                      checked={issueURL === url}
                      onChange={(e) => setIssueURL(e.currentTarget.value)}
                    />
                    <div className='flex-1 px-4 text-left'>
                      <p className='font-bold'>
                        <span className='text-sm'>#{number}</span> {title}
                      </p>
                      <div className='w-full text-xs italic text-gray-600 markdown'>
                        <Markdown>{body?.slice(0, 140)}</Markdown>
                        {'... '}
                        <a
                          href={url}
                          className='text-blue-500 hover:text-blue-700'
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          view more
                        </a>
                      </div>
                      <p className='text-sm text-gray-800'>
                        Opened by <b>{user}</b> at{' '}
                        <span>{createdAt?.toLocaleDateString()}</span>{' '}
                        <Comments /> {comments}
                      </p>
                    </div>
                  </label>
                ),
              )}
              <label className='flex flex-row items-baseline p-4 border-t cursor-pointer'>
                <input
                  name='issue'
                  type='radio'
                  value={NONE_ISSUE}
                  checked={issueURL === NONE_ISSUE}
                  onChange={(e) => setIssueURL(e.currentTarget.value)}
                />
                <div className='flex-1 px-4 text-left'>
                  <p className='font-bold'>No issue exists</p>
                  <p className='text-sm text-yellow-700'>
                    <span>⚠️</span>This action is discouraged
                  </p>
                  <p className='text-sm text-gray-800'>
                    If no issue calling for maintainers exists yet we'll create
                    one. However, we recommend asking the current repo's owner
                    first.
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        {createPortal(
          <div className='sticky bottom-0 left-0 right-0 flex justify-center w-full p-2 bg-white'>
            <Button disabled={!isValidUrl} form='js-submit-issue'>
              Select request issue
            </Button>
          </div>,
          document.getElementsByTagName('main')[0],
        )}
      </form>
    </section>
  )
}

export default Issue
