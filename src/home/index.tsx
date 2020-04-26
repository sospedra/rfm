import React, { useState } from 'react'
import useSWR from 'swr'
import { fetcherRequestList } from '../rfm/services/api/github'
import Shell from '../rfm/components/Shell'
import Error from '../rfm/components/Error'
import Search from './Search'
import List from './List'
import Newsletter from './Newsletter'

const Home: React.FC<{}> = () => {
  const [query, setQuery] = useState(' ')
  const { data, error } = useSWR(query, fetcherRequestList)

  return (
    <Shell>
      <Search setQuery={setQuery} />
      <Error error={error} />
      <List {...data} />
      <Newsletter />
    </Shell>
  )
}

export default Home
