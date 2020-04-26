import React from 'react'
import './button.css'

const Button: React.FC<{
  disabled?: boolean
  href?: string
  form?: string
  loading?: boolean
  onClick?: () => any
  children: string
}> = (props) => {
  return props.href ? (
    <a
      className='w-64 px-4 py-2 text-white bg-pink-600 rounded shadow-lg hover:bg-pink-700'
      href={props.href}
      id='submit'
      onClick={props.onClick}
    >
      {props.children}
    </a>
  ) : (
    <div
      className={`gradient shadow-lg ${
        props.disabled
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-pink-600 cursor-pointer hover:bg-pink-700'
      } ${props.loading ? 'bg-pink-700 cursor-wait loading' : ''}`}
    >
      <input
        disabled={props.disabled || props.loading}
        id='submit'
        type='submit'
        form={props.form}
        value={props.children}
        className={`w-64 px-4 py-2 text-white ${
          props.disabled
            ? 'cursor-not-allowed bg-gray-500'
            : 'cursor-pointer bg-pink-600 hover:bg-pink-700'
        } ${props.loading ? 'cursor-wait' : ''}`}
      />
    </div>
  )
}

export default Button
