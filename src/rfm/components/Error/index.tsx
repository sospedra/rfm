import React from 'react'

const Error: React.FC<{
  error: any
}> = (props) => {
  if (!props.error) return null
  return (
    <aside className='p-4 m-6 text-red-700 border border-red-700 rounded'>
      {console.error(props.error)}
      Something went wrong. Check the report details in the console.
    </aside>
  )
}

export default Error
