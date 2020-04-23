import React, { useState } from 'react'
import { SubmitRequest } from '../rfm/services/api/github'
import Button from './Button'

const Find: React.FC<{
  onNext: () => void
  data?: SubmitRequest
}> = (props) => {
  const [issueURL, setIssueURL] = useState<string | null>(null)

  return (
    <form
      className='flex flex-col items-center w-full'
      onSubmit={(e) => {
        e.preventDefault()
        props.onNext()
      }}
    >
      <div className='w-full md:w-2/3'>
        {[{ label: 'None', url: '' }].map(({ label, url }) => (
          <label key={label}>
            <input
              name='issue'
              type='radio'
              value={url}
              checked={issueURL === url}
              onChange={(e) => setIssueURL(e.currentTarget.value)}
              className='w-full py-2 pl-24 pr-4 my-4 border rounded shadow-lg'
              required
            />
            {label}
          </label>
        ))}
      </div>

      <Button disabled={issueURL === null}>Select request issue</Button>
    </form>
  )
}

export default Find
