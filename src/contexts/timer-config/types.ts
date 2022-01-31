import React from 'react'
import { Task, TasksTypes } from '~/types/task'

export type TimerConfigContextValues = {
  focusTime: number
  setFocusTime: (time: number) => void
  restTime: number
  setRestTime: (time: number) => void
  getTaskByType: (type: TasksTypes) => Task
}

export type TimerConfigContextProviderProps = {
  children: React.ReactNode
}
