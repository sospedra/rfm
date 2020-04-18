import React, { useState } from 'react'
import useSWR from 'swr'
import Shell from '../rfm/components/Shell'
import { fetcherRequestList } from '../rfm/services/api/github'
import Search from './Search'
import List from './List'

const Home: React.FC<{}> = () => {
  const [query, setQuery] = useState(' ')
  const { data } = useSWR(query, fetcherRequestList)

  return (
    <Shell>
      <Search setQuery={setQuery} />
      <List {...data} />
    </Shell>
  )
}

export default Home
