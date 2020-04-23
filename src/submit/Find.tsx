import React, { useState, useEffect } from 'react'
import { createGithubRepoUrl, isValidGithubUrl } from '../rfm/services/github'
import { SubmitRequest } from '../rfm/services/api/github'
import Error from '../rfm/components/Error'
import Button from './Button'

const Repo: React.FC<{
  setRepoUrl: (repo: string) => void
  onNext: () => void
  error: any
  data?: SubmitRequest
}> = (props) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (props.data?.fullName) {
      props.onNext()
    }
  }, [props.data])

  return (
    <section>
      <h1 className='font-mono text-xl font-bold'>
        Add a new repository that needs maintance
      </h1>

      <form
        className='flex flex-col items-center w-full'
        onSubmit={(e) => {
          e.preventDefault()
          props.setRepoUrl(createGithubRepoUrl(inputValue))
        }}
      >
        <div className='relative w-full md:w-2/3'>
          <input
            id='githubRepo'
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            className='w-full py-2 pl-24 pr-4 my-4 border rounded shadow-lg'
            required
          />
          <span
            className='absolute text-gray-500'
            style={{
              left: '0.8rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            github.com/
          </span>
        </div>

        <Error error={props.error} />
        <Button disabled={!isValidGithubUrl(inputValue)}>Find repo</Button>
      </form>
    </section>
  )
}

export default Repo
