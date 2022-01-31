import React from 'react'
import { TimerResult } from 'react-timer-hook'
import { Task } from '~/types/task'

export type TimerContextValues = {
  currentTask: Task
  setCurrentTask: (task: Task) => void
  isRunning: boolean
  formattedTimeLeft: string
  progressPercentage: number
} & Pick<TimerResult, 'resume' | 'pause'>

export type TimerContextProviderProps = {
  children: React.ReactNode
}
