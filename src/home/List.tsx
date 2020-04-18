import React from 'react'
import { Code as PlaceholderCode } from 'react-content-loader'
import { Request } from '../rfm/services/api/github'
import { request } from 'http'

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
        {props.requestList.map((repoRequest) => (
          <li key={repoRequest.id}>{repoRequest.url}</li>
        ))}
      </ul>
    </section>
  )
}

export default List
