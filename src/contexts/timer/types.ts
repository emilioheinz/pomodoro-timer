import React from 'react'
import { Task, TasksTypes } from '~/types/task'

export type TimerContextValues = {
  currentTask: Task
  onTimerEndReach: () => void
  setCurrentTask: (task: Task) => void
  getTaskByType: (type: TasksTypes) => Task
  focusTime: number
  setFocusTime: (time: number) => void
  restTime: number
  setRestTime: (time: number) => void
}

export type TimerContextProviderProps = {
  children: React.ReactNode
}
