import React, { useState } from 'react'
import useSWR from 'swr'
import Shell from '../rfm/components/Shell'
import { fetcherSubmitRequest } from '../rfm/services/api/github'
import Preview from './Preview'
import SubmitButton from './SubmitButton'

const Submit: React.FC<{}> = () => {
  const [githubRepo, setGithubRepo] = useState('')
  const [inputValue, setInputValue] = useState('')
  const { data, error } = useSWR(githubRepo, fetcherSubmitRequest)

  return (
    <Shell>
      <section className='flex flex-col items-center justify-center w-full text-center md:p-8'>
        <label htmlFor={!!data ? 'submit' : 'githubRepo'}>
          <h1 className='font-mono text-xl font-bold'>
            Add a new repository that needs maintance
          </h1>
          <h2 className='text-lg'>Submit a github.com valid url</h2>
        </label>
        <div
          className={`w-full transition transform duration-1000 ${
            !!data ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <input
            id='githubRepo'
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            placeholder='Type a github.com repository url'
            className='w-full px-4 py-2 my-4 border rounded shadow-lg md:w-2/3'
          />
        </div>
        <SubmitButton
          inputValue={inputValue}
          setGithubRepo={setGithubRepo}
          data={data}
        />

        {error && (
          <aside className='p-4 m-6 text-red-700 border border-red-700 rounded'>
            {console.error(error)}
            Something went wrong. Check the report details in the console.
          </aside>
        )}
      </section>

      <Preview data={data} />
    </Shell>
  )
}

export default Submit
