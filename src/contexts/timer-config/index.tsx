// eslint-disable-next-line no-use-before-define
import React, { useCallback, useContext, useState } from 'react'
import {
  DEFAULT_ALERTS_SOUND_VOLUME,
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

const initialState: TimerConfigContextValues = {
  alertsSoundVolume: DEFAULT_ALERTS_SOUND_VOLUME,
  setAlertsSoundVolume: volume => volume,
  focusTime: DEFAULT_FOCUS_TIME_IN_MINUTES,
  setFocusTime: time => time,
  restTime: DEFAULT_REST_TIME_IN_MINUTES,
  setRestTime: time => time,
  getTaskByType: type =>
    type === TasksTypes.focus
      ? makeFocusTask({ duration: DEFAULT_FOCUS_TIME_IN_MINUTES })
      : makeRestTask({ duration: DEFAULT_REST_TIME_IN_MINUTES })
}

const TimerConfigContext = React.createContext(initialState)

function TimerConfigContextProvider({
  children
}: TimerConfigContextProviderProps) {
  const [focusTime, setFocusTime] = useState(initialState.focusTime)
  const [restTime, setRestTime] = useState(initialState.restTime)
  const [alertsSoundVolume, setAlertsSoundVolume] = useState(
    initialState.alertsSoundVolume
  )

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
    alertsSoundVolume,
    setAlertsSoundVolume,
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
