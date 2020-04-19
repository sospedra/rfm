import React from 'react'

const Circle: React.FC<{ color?: string }> = (props) => (
  <span
    className='relative inline-block mr-1 bg-gray-900 rounded-full'
    style={{
      backgroundColor: props.color,
      width: 14,
      height: 14,
    }}
  />
)

export default Circle
