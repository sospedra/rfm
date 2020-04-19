import React from 'react'
import { SubmitRequest } from '../rfm/services/api/github'

const Preview: React.FC<{
  data?: SubmitRequest
}> = (props) =>
  props.data ? (
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
                  {props.data && props.data[key as keyof SubmitRequest]}
                </span>
                ,
              </span>
            </p>
          ))}
          <p>{`}`}</p>
        </pre>
      </div>
    </section>
  ) : null

export default Preview
