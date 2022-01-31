import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'
import RangeSlider from '~/components/range-slider'
import TabsMenu from '~/components/tabs-menu'
import Timer from '~/components/timer'

import {
  Container,
  RangeInputLabelContainer,
  RightContainer,
  LeftContainer
} from '~/styles/pages/home'
import { Task, TasksTypes } from '~/types/task'
import { getDateInTheFuture } from '~/utils/time'

import { useTimerConfig } from '~/contexts/timer-config'
import { DELAY_BETWEEN_TASKS_IN_MS, INITIAL_TASK } from '~/contants'
import { notifyFocusEnd, notifyRestEnd } from '~/utils/notifications'
import { makeRestTask } from '~/factories/rest-task'
import { makeFocusTask } from '~/factories/focus-task'

const options = [
  { value: TasksTypes.focus, label: 'Focus' },
  { value: TasksTypes.rest, label: 'Rest' }
]

export default function Home() {
  const [currentTask, setCurrentTask] = useState<Task>(INITIAL_TASK)

  const { focusTime, restTime, setFocusTime, setRestTime, getTaskByType } =
    useTimerConfig()

  const { hours, minutes, seconds, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: getDateInTheFuture({ minutes: currentTask.duration }),
      autoStart: false,
      onExpire: onTimerEndReach
    })

  useEffect(() => {
    if (currentTask.type !== TasksTypes.focus) return

    setCurrentTask(getTaskByType(TasksTypes.focus))
  }, [focusTime])

  useEffect(() => {
    if (currentTask.type !== TasksTypes.rest) return

    setCurrentTask(getTaskByType(TasksTypes.rest))
  }, [restTime])

  useEffect(() => {
    const date = getDateInTheFuture({ minutes: currentTask.duration })

    restart(date)
    pause()
  }, [currentTask])

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

  function onTabsMenuValueChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedTaskType = e.target.value as TasksTypes
    setCurrentTask(getTaskByType(selectedTaskType))
  }

  function renderRangeInputLabel(minutes: number, label: string) {
    return (
      <RangeInputLabelContainer>
        <span>{`${minutes} min`}</span>
        <span>{label}</span>
      </RangeInputLabelContainer>
    )
  }

  function renderLeftContainerWithTimerAndTabs() {
    return (
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
          currentTaskDuration={currentTask.duration}
        />
      </LeftContainer>
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
          id="focus-range-slider"
        />
        <RangeSlider
          range={[1, 120]}
          onChange={e => setRestTime(Number(e.target.value))}
          currentValue={restTime}
          renderLabel={() => renderRangeInputLabel(restTime, 'Rest')}
          isDisabled={isRunning}
          id="rest-range-slider"
        />
      </RightContainer>
    )
  }

  return (
    <>
      <Head>
        <title>Pomodoro Time Tracker</title>
        <meta
          name="description"
          content="Tired of not having focus? Try Pomodoro Time Tracker, it is a flexible and easy to use online Pomodoro Technique Time Tracker."
        />
      </Head>
      <main>
        <Container>
          {renderLeftContainerWithTimerAndTabs()}
          {renderRightContainerWithConfig()}
        </Container>
      </main>
    </>
  )
}
