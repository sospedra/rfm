import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

const PHBanner: React.FC<{}> = () => {
  const [isBeating, setIsBeating] = useState(false)
  const { x } = useSpring({
    from: { x: 0 },
    x: isBeating ? 1 : 0,
    config: { duration: 1000 },
  })

  return (
    <aside className='flex items-center justify-center pt-4 pb-4 sm:pt-0'>
      <a
        href='https://www.producthunt.com/posts/request-for-maintainers'
        className='flex flex-row items-center p-4 bg-gray-800 rounded shadow-lg'
        onTouchStart={() => setIsBeating(true)}
        onTouchEnd={() => setIsBeating(false)}
        onMouseEnter={() => setIsBeating(true)}
        onMouseLeave={() => setIsBeating(false)}
      >
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g fill='none' fillRule='evenodd'>
            <path
              d='M40 20c0 11.046-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0s20 8.954 20 20'
              fill='#DA552F'
            ></path>
            <path
              d='M22.667 20H17v-6h5.667a3 3 0 0 1 0 6m0-10H13v20h4v-6h5.667a7 7 0 1 0 0-14'
              fill='#FFF'
            ></path>
          </g>
        </svg>
        <div className='ml-4 text-white '>
          <p className='text-sm'>
            <b>Today</b> we're on Product Hunt
          </p>
          <p className='text-xl font-bold'>
            Support us{' '}
            <animated.span
              role='img'
              aria-label='heart'
              className='inline-block'
              style={{
                transformOrigin: 'center center',
                transform: x
                  .interpolate({
                    range: [0, 0.25, 0.5, 0.75, 1],
                    output: [1, 1.1, 0.8, 1.1, 1],
                  })
                  .interpolate((x) => `scale(${x})`),
              }}
            >
              💖
            </animated.span>
          </p>
        </div>
      </a>
    </aside>
  )
}

export default PHBanner
