import React from 'react'
import Shell from '../rfm/components/Shell'
import { Link } from 'react-router-dom'

const Confirm: React.FC<{}> = (props) => {
  return (
    <Shell>
      <div className='flex flex-col items-center p-8 text-center sm:text-lg'>
        <h1 className='pb-4 font-mono text-2xl font-bold'>Almost there!</h1>
        <p>Your privacy means a lot to us.</p>
        <p>
          That's why you will need to{' '}
          <b>check your inbox and confirm your subscription</b>.
        </p>
        <p>Thanks for subscribing.</p>

        <Link
          to='/'
          className='px-4 py-2 mt-10 text-white bg-pink-600 rounded shadow-lg hover:bg-pink-700'
        >
          Take me back to the home
        </Link>
      </div>
    </Shell>
  )
}

export default Confirm
