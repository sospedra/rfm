import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { fetcherRequestList } from '../rfm/services/api/github'
import Shell from '../rfm/components/Shell'
import Error from '../rfm/components/Error'
import { track } from '../rfm/services/analytics'
import Search from './Search'
import List from './List'
import Newsletter from './Newsletter'
import NewsletterBanner from './NewsletterBanner'

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
      <NewsletterBanner />
      <Error error={error} />
      <List {...data} />
      <Newsletter />
    </Shell>
  )
}

export default Home
