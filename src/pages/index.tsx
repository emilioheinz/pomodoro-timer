import Head from 'next/head'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import RangeSlider from '~/components/range-slider'
import TabsMenu from '~/components/tabs-menu'
import Timer from '~/components/timer'
import { makeFocusTask } from '~/factories/focus-task'
import { makeRestTask } from '~/factories/rest-task'

import {
  Container,
  RangeInputLabelContainer,
  RightContainer,
  LeftContainer
} from '~/styles/pages/home'
import { Task, TasksTypes } from '~/types/task'
import { getDateInTheFuture } from '~/utils/time'

const DEFAULT_FOCUS_TIME_IN_MINUTES = 50
const DEFAULT_REST_TIME_IN_MINUTES = 10
const INITIAL_TASK: Task = {
  type: TasksTypes.focus,
  duration: DEFAULT_FOCUS_TIME_IN_MINUTES
}

const options = [
  { value: TasksTypes.focus, label: 'Focus' },
  { value: TasksTypes.rest, label: 'Rest' }
]

export default function Home() {
  const [currentTask, setCurrentTask] = useState<Task>(INITIAL_TASK)
  const [focusTime, setFocusTime] = useState(DEFAULT_FOCUS_TIME_IN_MINUTES)
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME_IN_MINUTES)

  const { hours, minutes, seconds, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: getDateInTheFuture({ minutes: currentTask.duration }),
      autoStart: false
    })

  useEffect(() => {
    const date = getDateInTheFuture({ minutes: currentTask.duration })

    restart(date)
    pause()
  }, [currentTask])

  useEffect(() => {
    if (currentTask.type !== TasksTypes.focus) return

    setCurrentTask(updateCurrentTaskDuration(TasksTypes.focus))
  }, [focusTime])

  useEffect(() => {
    if (currentTask.type !== TasksTypes.rest) return

    setCurrentTask(updateCurrentTaskDuration(TasksTypes.rest))
  }, [restTime])

  const updateCurrentTaskDuration = useCallback(
    (taskTyke: TasksTypes) => {
      const isUserResting = taskTyke === TasksTypes.rest

      return isUserResting
        ? makeRestTask({ duration: restTime })
        : makeFocusTask({ duration: focusTime })
    },
    [restTime, focusTime]
  )

  function onTabsMenuValueChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedTaskType = e.target.value as TasksTypes
    setCurrentTask(updateCurrentTaskDuration(selectedTaskType))
  }

  function renderRangeInputLabel(minutes: number, label: string) {
    return (
      <RangeInputLabelContainer>
        <span>{`${minutes} min`}</span>
        <span>{label}</span>
      </RangeInputLabelContainer>
    )
  }

  function renderRightContainerWithConfig() {
    return (
      <RightContainer>
        <RangeSlider
          range={[1, 120]}
          onChange={e => setFocusTime(Number(e.target.value))}
          currentValue={focusTime}
          renderLabel={() => renderRangeInputLabel(focusTime, 'Focus')}
          isDisabled={isRunning}
        />
        <RangeSlider
          range={[1, 120]}
          onChange={e => setRestTime(Number(e.target.value))}
          currentValue={restTime}
          renderLabel={() => renderRangeInputLabel(restTime, 'Rest')}
          isDisabled={isRunning}
        />
      </RightContainer>
    )
  }

  return (
    <>
      <Head>
        <title>Pomodoro Timer</title>
      </Head>
      <main>
        <Container>
          <LeftContainer>
            <TabsMenu
              options={options}
              onChange={onTabsMenuValueChange}
              checkedValue={currentTask.type}
              isDisabled={isRunning}
            />
            <Timer
              isRunning={isRunning}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              onPause={pause}
              onResume={resume}
            />
          </LeftContainer>
          {renderRightContainerWithConfig()}
        </Container>
      </main>
    </>
  )
}
