// eslint-disable-next-line no-use-before-define
import React, { useContext, useEffect, useState } from 'react'
import { DELAY_BETWEEN_TASKS_IN_MS, INITIAL_TASK } from '~/contants'
import { useTimer as useReactTimerHookTimer } from 'react-timer-hook'
import { Task, TasksTypes } from '~/types/task'
import { useTimerConfig } from '../timer-config'
import iPhoneAlarmSound from '~/assets/sounds/iphone-alarm.mp3'

import { TimerContextProviderProps, TimerContextValues } from './types'
import { getDateInTheFuture, toMinutesAndSeconds } from '~/utils/time'
import { makeRestTask } from '~/factories/rest-task'
import { makeFocusTask } from '~/factories/focus-task'
import useTimerProgressPercentage from '~/hooks/use-timer-progress-percentage'
import useToast from '~/hooks/use-toast'
import useSound from 'use-sound'

const defaultValue: TimerContextValues = {
  currentTask: INITIAL_TASK,
  setCurrentTask: task => task,
  isRunning: false,
  resume: () => undefined,
  pause: () => undefined,
  formattedTimeLeft: '',
  progressPercentage: 0
}

const TimerContext = React.createContext(defaultValue)

function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [currentTask, setCurrentTask] = useState<Task>(INITIAL_TASK)

  const { notifyFocusEnd, notifyRestEnd } = useToast()
  const { focusTime, restTime, getTaskByType, alertsSoundVolume } =
    useTimerConfig()
  const { hours, minutes, seconds, isRunning, pause, restart, resume } =
    useReactTimerHookTimer({
      expiryTimestamp: getDateInTheFuture({ minutes: currentTask.duration }),
      autoStart: false,
      onExpire: onTimerEndReach
    })
  const [playSound, { stop }] = useSound(iPhoneAlarmSound, {
    volume: alertsSoundVolume / 100
  })

  const { minutes: formattedMinutes, seconds: formattedSeconds } =
    toMinutesAndSeconds({ hours, minutes, seconds })

  const { getProgressPercentage } = useTimerProgressPercentage({
    currentTaskDurationInMinutes: currentTask.duration,
    timeLeftInMinutes: hours * 60 + minutes + seconds / 60
  })

  useEffect(() => {
    const date = getDateInTheFuture({ minutes: currentTask.duration })

    restart(date)
    pause()
  }, [currentTask])

  useEffect(() => {
    if (currentTask.type !== TasksTypes.focus) return

    setCurrentTask(getTaskByType(TasksTypes.focus))
  }, [focusTime])

  useEffect(() => {
    if (currentTask.type !== TasksTypes.rest) return

    setCurrentTask(getTaskByType(TasksTypes.rest))
  }, [restTime])

  function onTimerEndReach() {
    playSound()
    if (currentTask.type === TasksTypes.focus) {
      notifyFocusEnd()
      setTimeout(() => {
        setCurrentTask(makeRestTask({ duration: restTime }))
        stop()
      }, DELAY_BETWEEN_TASKS_IN_MS)
    } else if (currentTask.type === TasksTypes.rest) {
      notifyRestEnd()
      setTimeout(() => {
        setCurrentTask(makeFocusTask({ duration: focusTime }))
        stop()
      }, DELAY_BETWEEN_TASKS_IN_MS)
    }
  }

  const providerValue: TimerContextValues = {
    currentTask,
    setCurrentTask,
    isRunning,
    resume,
    pause,
    progressPercentage: getProgressPercentage(),
    formattedTimeLeft: `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <TimerContext.Provider value={providerValue}>
      {children}
    </TimerContext.Provider>
  )
}

const useTimer = () => useContext(TimerContext)

export { useTimer, TimerContextProvider }
