import React from 'react'
import { useSpring, animated } from 'react-spring'

const Progress: React.FC<{
  ratio: number
}> = (props) => {
  const style = useSpring({ width: props.ratio * document.body.clientWidth })

  return (
    <div className='fixed top-0 left-0 right-0 z-50 h-1'>
      <animated.div className='h-full bg-pink-500' style={style} />
    </div>
  )
}

export default Progress
