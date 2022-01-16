import Head from 'next/head'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import RangeSlider from '~/components/range-slider'
import TabsMenu from '~/components/tabs-menu'
import Timer from '~/components/timer'
import { useTimerContext } from '~/contexts/timer'
import { makeFocusTask } from '~/factories/focus-task'
import { makeRestTask } from '~/factories/rest-task'

import {
  Container,
  RangeInputLabelContainer,
  RightContainer,
  LeftContainer
} from '~/styles/pages/home'
import { Task, TasksTypes } from '~/types/task'
import { minutesToMs } from '~/utils/time'

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
  const { isTimerRunning, setCurrentTaskDuration, setOnEndReachCallback } =
    useTimerContext()

  const [currentTask, setCurrentTask] = useState<Task>(INITIAL_TASK)
  const [focusTime, setFocusTime] = useState(DEFAULT_FOCUS_TIME_IN_MINUTES)
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME_IN_MINUTES)

  // useEffect(() => {
  //   console.log(currentTask)
  // }, [currentTask])

  const updateCurrentTaskDuration = useCallback(
    (taskTyke: TasksTypes) => {
      const isUserResting = taskTyke === TasksTypes.rest

      return isUserResting
        ? makeRestTask({ duration: restTime })
        : makeFocusTask({ duration: focusTime })
    },
    [restTime, focusTime]
  )

  useEffect(() => {
    setCurrentTask(task => updateCurrentTaskDuration(task.type))
  }, [updateCurrentTaskDuration])

  const onEndReach = useCallback(() => {
    setCurrentTask(task => {
      const wasUserResting = task.type === TasksTypes.rest

      return wasUserResting
        ? makeFocusTask({ duration: focusTime })
        : makeRestTask({ duration: restTime })
    })
  }, [focusTime, restTime])

  useEffect(() => {
    setOnEndReachCallback?.(onEndReach)
  }, [onEndReach])

  useEffect(() => {
    setCurrentTaskDuration?.(minutesToMs(currentTask.duration))
  }, [currentTask.duration])

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
          range={[0.1, 120]}
          onChange={e => setFocusTime(Number(e.target.value))}
          currentValue={focusTime}
          renderLabel={() => renderRangeInputLabel(focusTime, 'Focus')}
          isDisabled={isTimerRunning}
          stepsGap={0.1}
        />
        <RangeSlider
          range={[0.1, 120]}
          onChange={e => setRestTime(Number(e.target.value))}
          currentValue={restTime}
          renderLabel={() => renderRangeInputLabel(restTime, 'Rest')}
          isDisabled={isTimerRunning}
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
            />
            <Timer />
          </LeftContainer>
          {renderRightContainerWithConfig()}
        </Container>
      </main>
    </>
  )
}
