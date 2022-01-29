// eslint-disable-next-line no-use-before-define
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useCountdownTimer } from '~/hooks/use-count-down-timer'
import { TimerContextProviderProps, TimerContextValues } from './types'

const defaultValue: TimerContextValues = {
  isRunning: false,
  formattedTimeLeft: '00:00',
  progressPercentage: 0
}

const TimerContext = React.createContext(defaultValue)

function TimerContextProvider({ children }: TimerContextProviderProps) {
  const {
    start,
    reset,
    pause,
    setStartTime,
    isRunning,
    formattedTimeLeft,
    setOnEndReachCallback,
    timeLeftInMilliseconds
  } = useCountdownTimer()

  const [currentTaskDuration, setCurrentTaskDuration] = useState(0)

  useEffect(() => {
    setStartTime(currentTaskDuration)
  }, [currentTaskDuration])

  const progressPercentage = useMemo(() => {
    const progress = currentTaskDuration - timeLeftInMilliseconds
    return (progress / currentTaskDuration) * 100
  }, [timeLeftInMilliseconds])

  const providerValue: TimerContextValues = {
    start,
    reset,
    pause,
    isRunning,
    formattedTimeLeft,
    progressPercentage,
    setOnEndReachCallback,
    setCurrentTaskDuration
  }

  return (
    <TimerContext.Provider value={providerValue}>
      {children}
    </TimerContext.Provider>
  )
}

const useTimerContext = () => useContext(TimerContext)

export { useTimerContext, TimerContextProvider }
