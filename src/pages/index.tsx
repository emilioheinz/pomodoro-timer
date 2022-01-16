import Head from 'next/head'
import { useCallback, useEffect, useMemo, useState } from 'react'
import RangeSlider from '~/components/range-slider'
import Timer from '~/components/timer'
import { makeFocusTask } from '~/factories/focus-task'
import { makeRestTask } from '~/factories/rest-task'
import { useCountdownTimer } from '~/hooks/use-count-down-timer'

import {
  Container,
  LeftContainer,
  RangeInputLabelContainer,
  RightContainer,
  TimerContainer
} from '~/styles/pages/home'
import { Task, TasksTypes } from '~/types/task'
import { minutesToMs } from '~/utils/time'

const DEFAULT_FOCUS_TIME_IN_MINUTES = 50
const DEFAULT_REST_TIME_IN_MINUTES = 10
const INITIAL_TASK: Task = {
  type: TasksTypes.focus,
  duration: DEFAULT_FOCUS_TIME_IN_MINUTES
}

export default function Home() {
  const [currentTask, setCurrentTask] = useState<Task>(INITIAL_TASK)
  const [focusTime, setFocusTime] = useState(DEFAULT_FOCUS_TIME_IN_MINUTES)
  const [restTime, setRestTime] = useState(DEFAULT_REST_TIME_IN_MINUTES)

  const currentTaskDurationInMs = minutesToMs(currentTask.duration)

  useEffect(() => {
    setCurrentTask(task => {
      const isUserResting = task.type === TasksTypes.rest

      return isUserResting
        ? makeRestTask({ duration: restTime })
        : makeFocusTask({ duration: focusTime })
    })
  }, [focusTime, restTime])

  const onTimerEndReach = useCallback(() => {
    setCurrentTask(task => {
      const wasUserResting = task.type === TasksTypes.rest

      return wasUserResting
        ? makeFocusTask({ duration: focusTime })
        : makeRestTask({ duration: restTime })
    })
  }, [focusTime, restTime])

  const {
    start,
    reset,
    setStartTime,
    isTimerRunning,
    formattedTimeLeft,
    timeLeftInMilliseconds
  } = useCountdownTimer(onTimerEndReach)

  useEffect(() => {
    setStartTime(minutesToMs(currentTask.duration))
  }, [currentTask.duration])

  const ranPercentage = useMemo(
    () =>
      isTimerRunning
        ? ((currentTaskDurationInMs - timeLeftInMilliseconds) /
            currentTaskDurationInMs) *
          100
        : 0,
    [currentTaskDurationInMs, timeLeftInMilliseconds, isTimerRunning]
  )

  function renderRangeInputLabel(minutes: number, label: string) {
    return (
      <RangeInputLabelContainer>
        <span>{`${minutes} min`}</span>
        <span>{label}</span>
      </RangeInputLabelContainer>
    )
  }

  return (
    <>
      <Head>
        <title>Pomodoro Timer</title>
      </Head>

      <main>
        <Container>
          <LeftContainer />
          <TimerContainer>
            <Timer
              isTimerRunning={isTimerRunning}
              formattedTimeLeft={formattedTimeLeft}
              start={start}
              reset={reset}
              ranPercentage={ranPercentage}
            />
          </TimerContainer>
          <RightContainer>
            <RangeSlider
              range={[1, 120]}
              onChange={e => setFocusTime(Number(e.target.value))}
              currentValue={focusTime}
              renderLabel={() => renderRangeInputLabel(focusTime, 'Focus')}
              isDisabled={isTimerRunning}
            />
            <RangeSlider
              range={[1, 120]}
              onChange={e => setRestTime(Number(e.target.value))}
              currentValue={restTime}
              renderLabel={() => renderRangeInputLabel(restTime, 'Rest')}
              isDisabled={isTimerRunning}
            />
          </RightContainer>
        </Container>
      </main>
    </>
  )
}
