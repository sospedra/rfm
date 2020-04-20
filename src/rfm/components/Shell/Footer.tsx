import React from 'react'

const Footer: React.FC<{}> = () => {
  return (
    <footer className='flex flex-row justify-between w-full max-w-4xl p-4 mx-auto mt-4'>
      <p>
        Hand-crafted with
        <span className='mx-1 text-red-700' aria-label='heart' role='img'>
          ♥️
        </span>
        by
        <a
          className='ml-1 link'
          href='https://sospedra.me'
          rel='noopener noreferrer'
          target='_blank'
        >
          @sospedra
        </a>
      </p>

      <div className='flex flex-col items-end'>
        <a
          href='https://twitter.com/sospedra_r'
          target='_blank'
          rel='noopener noreferrer'
          className='link'
        >
          Contact
        </a>
        <a
          href='https://github.com/sospedra/rfm'
          target='_blank'
          rel='noopener noreferrer'
          className='link'
        >
          Github
        </a>
      </div>
    </footer>
  )
}

export default Footer
