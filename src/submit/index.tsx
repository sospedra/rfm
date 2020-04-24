import React, { useState, useCallback } from 'react'
import useSWR from 'swr'
import { useTransition, animated } from 'react-spring'
import { fetcherSubmitRequest } from '../rfm/services/api/github'
import Shell from '../rfm/components/Shell'
import Progress from '../rfm/components/Progress'
import Preview from './Preview'
import Issue from './Issue'
import Find from './Find'

const Submit: React.FC<{}> = () => {
  const [repoUrl, setRepoUrl] = useState('')
  const [requestIssue, setRequestIssue] = useState('')
  const { data, error } = useSWR(repoUrl, fetcherSubmitRequest)
  const [index, setIndex] = useState(0)
  const onNext = useCallback(() => setIndex((state) => (state + 1) % 3), [])
  const transitions = useTransition(index, (p) => p, {
    from: {
      display: 'block',
      width: '100%',
      opacity: 0,
      transform: 'translate3d(100%, 0, 0)',
    },
    enter: {
      display: 'block',
      width: '100%',
      opacity: 1,
      transform: 'translate3d(0%, 0, 0)',
    },
    leave: {
      display: 'none',
      width: '100%',
      opacity: 0,
      transform: 'translate3d(-50%, 0, 0)',
    },
  })

  return (
    <Shell>
      <div className='flex flex-col items-center justify-center w-full text-center md:p-8'>
        <Progress ratio={(index + 1) / 3} />
        <div className='flex flex-row w-full'>
          {transitions.map(({ item, props, key }) => {
            return [
              <animated.div key={key} style={props}>
                <Find
                  onNext={onNext}
                  setRepoUrl={setRepoUrl}
                  error={error}
                  data={data}
                />
              </animated.div>,
              <animated.div key={key} style={props}>
                <Issue
                  onNext={onNext}
                  data={data}
                  requestIssue={requestIssue}
                  setRequestIssue={setRequestIssue}
                />
              </animated.div>,
              <animated.div key={key} style={props}>
                <Preview data={data} requestIssue={requestIssue} />
              </animated.div>,
            ][item]
          })}
        </div>
      </div>
    </Shell>
  )
}

export default Submit
