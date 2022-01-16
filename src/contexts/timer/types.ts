import React from 'react'

export type TimerContextValues = {
  isTimerRunning: boolean
  formattedTimeLeft: string
  progressPercentage: number
  start?: () => void
  reset?: () => void
  setOnEndReachCallback?: (cb?: () => void) => void
  setCurrentTaskDuration?: (duration: number) => void
}

export type TimerContextProviderProps = {
  children: React.ReactNode
}
