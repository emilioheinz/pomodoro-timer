import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'
import RangeSlider from '~/components/range-slider'
import Timer from '~/components/timer'

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

  useEffect(() => {
    setCurrentTask(task => {
      if (task.type === TasksTypes.rest) {
        return {
          type: TasksTypes.rest,
          duration: restTime
        }
      }

      return {
        type: TasksTypes.focus,
        duration: focusTime
      }
    })
  }, [focusTime, restTime])

  const onTimerEndReach = useCallback(() => {
    setCurrentTask(task => {
      if (task.type === TasksTypes.rest) {
        return {
          type: TasksTypes.focus,
          duration: focusTime
        }
      }

      return {
        type: TasksTypes.rest,
        duration: restTime
      }
    })
  }, [focusTime, restTime])

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
              startTimeInMs={minutesToMs(currentTask.duration)}
              onEndReach={onTimerEndReach}
            />
          </TimerContainer>
          <RightContainer>
            <RangeSlider
              range={[1, 120]}
              onChange={e => setFocusTime(Number(e.target.value))}
              currentValue={focusTime}
              renderLabel={() => renderRangeInputLabel(focusTime, 'Focus')}
            />
            <RangeSlider
              range={[1, 120]}
              onChange={e => setRestTime(Number(e.target.value))}
              currentValue={restTime}
              renderLabel={() => renderRangeInputLabel(restTime, 'Rest')}
            />
          </RightContainer>
        </Container>
      </main>
    </>
  )
}
