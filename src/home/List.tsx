import React from 'react'
import { Code as PlaceholderCode } from 'react-content-loader'
import humanNumber from 'human-number'
import { Request } from '../rfm/services/api/github'
import Star from '../rfm/components/Star'
import Issue from '../rfm/components/Issue'
import Circle from '../rfm/components/Circle'

const selectMessage = (total?: number) => {
  switch (total) {
    case 0:
      return (
        <p className='text-lg'>
          There are not requests that matches your criteria{' '}
          <span role='img' aria-label='shrug'>
            🤷🏻‍♂️
          </span>{' '}
          Try another search.
        </p>
      )
    case 1:
      return (
        <p className='text-lg'>
          There is <b>1</b> request that needs your help{' '}
          <span role='img' aria-label='muscle'>
            💪
          </span>
        </p>
      )
    default:
      return (
        <p className='text-lg'>
          There are <b>{total}</b> requests that need your help{' '}
          <span role='img' aria-label='hero'>
            🦸🏽‍♀️
          </span>
        </p>
      )
  }
}

const List: React.FC<{
  requestList?: Request[]
  total?: number
}> = (props) => {
  if (!props.requestList) {
    return (
      <section className='w-full py-4 md:w-2/3'>
        <PlaceholderCode />
        <br />
        <PlaceholderCode />
      </section>
    )
  }
  return (
    <section className='w-full py-4'>
      {selectMessage(props.total)}
      <ul>
        {props.requestList.map(({ url, createdAt, body }) => (
          <li key={url} className='py-4 border-b sm:mx-4'>
            <a
              href={body.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-lg text-blue-600 hover:text-blue-800'
              style={{ display: 'block' }}
            >
              {body.owner}/<b>{body.name}</b>
            </a>
            <p className='pt-1'>{body.description}</p>
            <div className='flex flex-row flex-wrap items-end w-full pt-1 text-sm'>
              {body.topics?.map((topic) => (
                <span
                  key={topic}
                  className='p-1 mb-1 mr-1 text-pink-500 bg-pink-100 rounded'
                >
                  {topic}
                </span>
              ))}
            </div>
            <p className='text-sm text-gray-700'>
              Requested at{' '}
              <b className='font-semibold'>{createdAt.toLocaleDateString()}</b>{' '}
              <a
                href={url}
                className='text-blue-600 hover:text-blue-800'
                target='_blank'
                rel='noopener noreferrer'
              >
                Did something change?
              </a>
            </p>
            <div className='flex flex-row pt-1 text-sm text-gray-700'>
              <span className='mr-4'>
                <Star /> {humanNumber(body.stars)}
              </span>
              <span className='flex flex-row items-center mr-4'>
                <Circle color={body.color} /> {body.language}
              </span>
              <span className='mr-4'>
                <Issue /> {body.openIssues}
              </span>
              <span className='mr-4'>{body.license}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default List
