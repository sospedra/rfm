import React from 'react'

const Header: React.FC<{}> = () => {
  return (
    <header className='flex flex-row justify-between w-full max-w-4xl p-4 mx-auto'>
      <a href='/' className='font-mono text-xl font-bold text-black'>
        <span role='img' aria-label='construction'>
          🚧
        </span>{' '}
        rfm
      </a>
      <a
        href='/'
        className='px-2 py-1 text-pink-600 border border-pink-600 rounded'
      >
        Submit new repo
      </a>
    </header>
  )
}

export default Header
