import React from 'react'
import './button.css'

const Button: React.FC<{
  disabled?: boolean
  href?: string
  form?: string
  children: string
}> = (props) => {
  return props.href ? (
    <a
      className='w-64 px-4 py-2 text-white bg-pink-600 rounded shadow-lg hover:bg-pink-700'
      href={props.href}
      id='submit'
    >
      {props.children}
    </a>
  ) : (
    <input
      disabled={props.disabled}
      id='submit'
      type='submit'
      form={props.form}
      value={props.children}
      className={`w-64 px-4 py-2 text-white rounded shadow-lg ${
        props.disabled
          ? 'bg-gray-500 cursor-not-allowed'
          : 'cursor-pointer bg-pink-600 hover:bg-pink-700'
      }`}
    />
  )
}

export default Button
