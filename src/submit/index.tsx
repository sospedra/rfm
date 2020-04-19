import React, { useState } from 'react'
import useSWR from 'swr'
import { fetcherSubmitRequest } from '../rfm/services/api/github'
import Shell from '../rfm/components/Shell'
import Error from '../rfm/components/Error'
import Preview from './Preview'
import Find from './Find'

const Submit: React.FC<{}> = () => {
  const [githubRepo, setGithubRepo] = useState('')
  const { data, error } = useSWR(githubRepo, fetcherSubmitRequest)

  return (
    <Shell>
      <section className='flex flex-col items-center justify-center w-full text-center md:p-8'>
        <label htmlFor={!!data ? 'submit' : 'githubRepo'}>
          <h1 className='font-mono text-xl font-bold'>
            Add a new repository that needs maintance
          </h1>
        </label>

        <Find setGithubRepo={setGithubRepo} data={data} />
        <Error error={error} />
      </section>

      <Preview data={data} />
    </Shell>
  )
}

export default Submit
