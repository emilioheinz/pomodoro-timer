import React from 'react'
import { Task, TasksTypes } from '~/types/task'

export type TimerConfigContextValues = {
  focusTime: number
  setFocusTime: (time: number) => void
  restTime: number
  setRestTime: (time: number) => void
  getTaskByType: (type: TasksTypes) => Task
  alertsSoundVolume: number
  setAlertsSoundVolume: (volume: number) => void
}

export type TimerConfigContextProviderProps = {
  children: React.ReactNode
}
