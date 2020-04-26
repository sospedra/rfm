import React from 'react'
import Info from '../rfm/components/Info'
import { Link } from 'react-router-dom'

const Search: React.FC<{
  setQuery: (query: string) => void
}> = (props) => {
  return (
    <section
      className='flex flex-col items-center justify-center w-full text-center md:p-8'
      style={{ height: '50%' }}
    >
      <h2 className='italic text-blue-600 whitespace-no-wrap hover:text-blue-800'>
        <Link to='/about'>
          Track OSS requests for maintainers <Info />
        </Link>
      </h2>
      <form
        className='w-full max-w-xl mx-auto'
        onSubmit={(e) => {
          e.preventDefault()
          const form = new FormData(e.currentTarget)
          const query = form.get('search') as string
          props.setQuery(query)
        }}
      >
        <label htmlFor='search' className='block'>
          <h1 className='font-mono text-xl font-bold'>
            Browse repos that need support
          </h1>
        </label>
        <div className='flex flex-row my-4'>
          <input
            id='search'
            name='search'
            className='block w-full px-4 py-2 border rounded shadow-lg'
            placeholder='Type a name, language, tag, etc.'
          />
          <input
            className='px-4 py-2 ml-4 text-white bg-pink-600 rounded shadow-lg cursor-pointer hover:bg-pink-700'
            type='submit'
            value='Search'
          />
        </div>
      </form>
    </section>
  )
}

export default Search
