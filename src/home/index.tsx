import React, { useState } from 'react'
import useSWR from 'swr'
import Shell from '../rfm/components/Shell'
import { fetcherRequestList } from '../rfm/services/api/github'
import Search from './Search'
import List from './List'
import Error from '../rfm/components/Error'

const Home: React.FC<{}> = () => {
  const [query, setQuery] = useState(' ')
  const { data, error } = useSWR(query, fetcherRequestList)

  return (
    <Shell>
      <Search setQuery={setQuery} />
      <Error error={error} />
      <List {...data} />
    </Shell>
  )
}

export default Home
