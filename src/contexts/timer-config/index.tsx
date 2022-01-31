// eslint-disable-next-line no-use-before-define
import React, { useCallback, useContext, useState } from 'react'
import {
  DEFAULT_FOCUS_TIME_IN_MINUTES,
  DEFAULT_REST_TIME_IN_MINUTES
} from '~/contants'
import { makeFocusTask } from '~/factories/focus-task'
import { makeRestTask } from '~/factories/rest-task'
import { TasksTypes } from '~/types/task'

import {
  TimerConfigContextProviderProps,
  TimerConfigContextValues
} from './types'

const defaultValue: TimerConfigContextValues = {
  focusTime: DEFAULT_FOCUS_TIME_IN_MINUTES,
  setFocusTime: time => time,
  restTime: DEFAULT_REST_TIME_IN_MINUTES,
  setRestTime: time => time,
  getTaskByType: type =>
    type === TasksTypes.focus
      ? makeFocusTask({ duration: DEFAULT_FOCUS_TIME_IN_MINUTES })
      : makeRestTask({ duration: DEFAULT_REST_TIME_IN_MINUTES })
}

const TimerConfigContext = React.createContext(defaultValue)

function TimerConfigContextProvider({
  children
}: TimerConfigContextProviderProps) {
  const [focusTime, setFocusTime] = useState(DEFAULT_FOCUS_TIME_IN_MINUTES)
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME_IN_MINUTES)

  const getTaskByType = useCallback(
    (taskTyke: TasksTypes) => {
      const isUserResting = taskTyke === TasksTypes.rest

      return isUserResting
        ? makeRestTask({ duration: restTime })
        : makeFocusTask({ duration: focusTime })
    },
    [restTime, focusTime]
  )

  const providerValue: TimerConfigContextValues = {
    focusTime,
    setFocusTime,
    restTime,
    setRestTime,
    getTaskByType
  }

  return (
    <TimerConfigContext.Provider value={providerValue}>
      {children}
    </TimerConfigContext.Provider>
  )
}

const useTimerConfig = () => useContext(TimerConfigContext)

export { useTimerConfig, TimerConfigContextProvider }
