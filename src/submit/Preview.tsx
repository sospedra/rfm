import React from 'react'
import { SubmitRequest } from '../rfm/services/api/github'

const formatProperty = (key: string, data?: SubmitRequest) => {
  const property = data && data[key as keyof SubmitRequest]
  if (property instanceof Array) return `[${property.join(', ')}]`
  return property
}

const Preview: React.FC<{
  data?: SubmitRequest
}> = (props) => {
  if (!props.data) return null

  if (!props.data.fullName) {
    return (
      <section className='flex flex-col justify-center py-6 text-lg text-center'>
        <p>
          We couldn't find any repo named{' '}
          <b>
            {props.data.owner}/{props.data.name}
          </b>
        </p>
        <p>Try to copy and paste the link directly</p>
      </section>
    )
  }

  return (
    <section className='flex justify-center py-6'>
      <div className='w-full sm:w-auto'>
        <p className='py-4 text-lg'>
          The repo <b>{props.data.fullName}</b> will be posted
        </p>
        <pre className='overflow-auto'>
          <p>{`{`}</p>
          {Object.keys(props.data).map((key) => (
            <p className='pl-4' key={key}>
              <span className='text-pink-500'>{key}</span>
              <span className='whitespace-pre-wrap'>
                :
                <span className='text-gray-800'>
                  {' '}
                  {formatProperty(key, props.data)}
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
