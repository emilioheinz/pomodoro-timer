// eslint-disable-next-line no-use-before-define
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useCountdownTimer } from '~/hooks/use-count-down-timer'
import { TimerContextProviderProps, TimerContextValues } from './types'

const defaultValue: TimerContextValues = {
  isTimerRunning: false,
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
    isTimerRunning,
    formattedTimeLeft,
    setOnEndReachCallback,
    timeLeftInMilliseconds
  } = useCountdownTimer()

  const [currentTaskDuration, setCurrentTaskDuration] = useState(0)

  useEffect(() => {
    setStartTime(currentTaskDuration)
  }, [currentTaskDuration])

  const progressPercentage = useMemo(() => {
    if (!isTimerRunning) return 0

    const progress = currentTaskDuration - timeLeftInMilliseconds
    return (progress / currentTaskDuration) * 100
  }, [currentTaskDuration, timeLeftInMilliseconds, isTimerRunning])

  const providerValue: TimerContextValues = {
    start,
    reset,
    pause,
    isTimerRunning,
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
