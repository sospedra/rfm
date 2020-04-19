import React, { useState } from 'react'
import SubmitButton from './SubmitButton'
import { createGithubRepoUrl } from '../rfm/services/github'
import { SubmitRequest } from '../rfm/services/api/github'

const Find: React.FC<{
  setGithubRepo: (repo: string) => void
  data?: SubmitRequest
}> = (props) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <form
      className='flex flex-col items-center w-full'
      onSubmit={(e) => {
        e.preventDefault()
        props.setGithubRepo(createGithubRepoUrl(inputValue))
      }}
    >
      <div
        className={`w-full transition transform duration-1000 relative md:w-2/3 ${
          props.data?.fullName
            ? '-translate-y-8 opacity-0'
            : 'translate-y-0 opacity-100'
        }`}
      >
        <input
          id='githubRepo'
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          className='w-full py-2 pl-24 pr-4 my-4 border rounded shadow-lg'
        />
        <span
          className='absolute text-gray-500'
          style={{
            left: '0.9rem',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          github.com/
        </span>
      </div>

      <SubmitButton inputValue={inputValue} data={props.data} />
    </form>
  )
}

export default Find
