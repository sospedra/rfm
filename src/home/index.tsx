import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcherRequestList } from '../rfm/services/api/github'
import Shell from '../rfm/components/Shell'
import Error from '../rfm/components/Error'
import { track } from '../rfm/services/analytics'
import Search from './Search'
import List from './List'
import Newsletter from './Newsletter'

const Home: React.FC<{}> = () => {
  const [query, setQuery] = useState(' ')
  const { data, error } = useSWR(query, fetcherRequestList)

  useEffect(() => {
    if (query !== ' ') {
      track('search', { query, total: data?.total || 0 })
    }
  }, [query])

  return (
    <Shell>
      <Search setQuery={setQuery} />
      <a
        href='https://www.producthunt.com/posts/request-for-maintainers?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-request-for-maintainers'
        className='justify-center w-full'
        target='_blank'
      >
        <img
          src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=195531&theme=dark'
          alt='Request for maintainers - Find any OSS project calling for collaborators | Product Hunt Embed'
          style={{ width: 250, height: 54 }}
          width='250px'
          height='54px'
        />
      </a>
      <Error error={error} />
      <List {...data} />
      <Newsletter />
    </Shell>
  )
}

export default Home
