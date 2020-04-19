import React from 'react'
import { SubmitRequest } from '../rfm/services/api/github'
import { createGithubIssue, isValidGithubUrl } from '../rfm/services/github'
import './submit-button.css'

const SubmitButton: React.FC<{
  data?: SubmitRequest
  inputValue: string
}> = (props) => {
  const isValid = isValidGithubUrl(props.inputValue)

  return props.data?.fullName ? (
    <a
      id='submit'
      href={createGithubIssue(props.data)}
      className='w-64 px-4 py-2 text-white bg-pink-600 rounded shadow-lg hover:bg-pink-700'
    >
      Submit request
    </a>
  ) : (
    <input
      value='Find repo'
      type='submit'
      disabled={!isValid}
      className={`w-64 px-4 py-2 text-white rounded shadow-lg ${
        isValid
          ? 'cursor-pointer bg-pink-600 hover:bg-pink-700'
          : 'bg-gray-500 cursor-not-allowed'
      }`}
    />
  )
}

export default SubmitButton
