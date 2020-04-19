import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC<{}> = () => {
  return (
    <header className='flex flex-row justify-between w-full max-w-4xl p-4 mx-auto'>
      <Link to='/' className='font-mono text-xl font-bold text-black'>
        <span role='img' aria-label='construction'>
          🚧
        </span>{' '}
        rfm
      </Link>
      <Link
        to='/submit'
        className='px-2 py-1 text-pink-600 border border-pink-600 rounded'
      >
        Submit new repo
      </Link>
    </header>
  )
}

export default Header
