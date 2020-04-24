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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.data?.fullName) {
      props.onNext()
    } else {
      setLoading(false)
    }
  }, [props.data])

  return (
    <section className='flex flex-col w-full'>
      <h1 className='font-mono text-xl font-bold'>
        Add a new repository that needs maintance
      </h1>

      <form
        className='flex flex-col items-center w-full'
        onSubmit={(e) => {
          e.preventDefault()
          setLoading(true)
          props.setRepoUrl(createGithubRepoUrl(inputValue))
        }}
      >
        <div className='relative w-full md:w-2/3'>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            className='w-full py-2 pl-24 pr-4 my-4 border rounded shadow-lg'
            required
          />
          <span
            className='absolute text-gray-500'
            style={{
              left: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            github.com/
          </span>
        </div>

        <Error error={props.error} />
        {props.data && !props.data?.fullName && (
          <div className='flex flex-col justify-center py-6 text-lg text-center'>
            <p>
              We couldn't find any repo named{' '}
              <b>
                {props.data?.owner}/{props.data?.name}
              </b>
            </p>
            <p>Try to copy and paste the link directly</p>
          </div>
        )}
        <Button disabled={!isValidGithubUrl(inputValue)} loading={loading}>
          Find repo
        </Button>
      </form>
    </section>
  )
}

export default Repo
