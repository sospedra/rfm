import React from 'react'
import { SWRConfig } from 'swr'

export const APIProvider: React.FC<{}> = (props) => (
  <SWRConfig
    value={{
      fetcher: async (input: RequestInfo, init?: RequestInit | undefined) => {
        const response = await fetch(input, init)
        return await response.json()
      },
    }}
  >
    {props.children}
  </SWRConfig>
)
