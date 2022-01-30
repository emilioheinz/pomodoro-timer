// eslint-disable-next-line no-use-before-define
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  DEFAULT_FOCUS_TIME_IN_MINUTES,
  DEFAULT_REST_TIME_IN_MINUTES,
  DELAY_BETWEEN_TASKS_IN_MS,
  INITIAL_TASK
} from '~/contants'
import { makeFocusTask } from '~/factories/focus-task'
import { makeRestTask } from '~/factories/rest-task'
import { Task, TasksTypes } from '~/types/task'
import { notifyFocusEnd, notifyRestEnd } from '~/utils/notifications'

import { TimerContextProviderProps, TimerContextValues } from './types'

const defaultValue: TimerContextValues = {
  currentTask: INITIAL_TASK,
  onTimerEndReach: () => undefined,
  setCurrentTask: task => task,
  focusTime: DEFAULT_FOCUS_TIME_IN_MINUTES,
  setFocusTime: time => time,
  restTime: DEFAULT_REST_TIME_IN_MINUTES,
  setRestTime: time => time,
  getTaskByType: type =>
    type === TasksTypes.focus
      ? makeFocusTask({ duration: DEFAULT_FOCUS_TIME_IN_MINUTES })
      : makeRestTask({ duration: DEFAULT_REST_TIME_IN_MINUTES })
}

const TimerContext = React.createContext(defaultValue)

function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [currentTask, setCurrentTask] = useState<Task>(INITIAL_TASK)
  const [focusTime, setFocusTime] = useState(DEFAULT_FOCUS_TIME_IN_MINUTES)
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME_IN_MINUTES)

  useEffect(() => {
    if (currentTask.type !== TasksTypes.focus) return

    setCurrentTask(getTaskByType(TasksTypes.focus))
  }, [focusTime])

  useEffect(() => {
    if (currentTask.type !== TasksTypes.rest) return

    setCurrentTask(getTaskByType(TasksTypes.rest))
  }, [restTime])

  const getTaskByType = useCallback(
    (taskTyke: TasksTypes) => {
      const isUserResting = taskTyke === TasksTypes.rest

      return isUserResting
        ? makeRestTask({ duration: restTime })
        : makeFocusTask({ duration: focusTime })
    },
    [restTime, focusTime]
  )

  function onTimerEndReach() {
    if (currentTask.type === TasksTypes.focus) {
      notifyFocusEnd()
      setTimeout(() => {
        setCurrentTask(makeRestTask({ duration: restTime }))
      }, DELAY_BETWEEN_TASKS_IN_MS)
    } else if (currentTask.type === TasksTypes.rest) {
      notifyRestEnd()
      setTimeout(() => {
        setCurrentTask(makeFocusTask({ duration: focusTime }))
      }, DELAY_BETWEEN_TASKS_IN_MS)
    }
  }

  const providerValue: TimerContextValues = {
    currentTask,
    focusTime,
    restTime,
    setCurrentTask,
    onTimerEndReach,
    getTaskByType,
    setFocusTime,
    setRestTime
  }

  return (
    <TimerContext.Provider value={providerValue}>
      {children}
    </TimerContext.Provider>
  )
}

const useTimerContext = () => useContext(TimerContext)

export { useTimerContext, TimerContextProvider }
