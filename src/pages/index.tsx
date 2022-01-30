import Head from 'next/head'
import { ChangeEvent, useEffect } from 'react'
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
import { TasksTypes } from '~/types/task'
import { getDateInTheFuture } from '~/utils/time'

import { useTimerContext } from '~/contexts/timer'

const options = [
  { value: TasksTypes.focus, label: 'Focus' },
  { value: TasksTypes.rest, label: 'Rest' }
]

export default function Home() {
  const {
    currentTask,
    focusTime,
    restTime,
    setFocusTime,
    setRestTime,
    onTimerEndReach,
    setCurrentTask,
    getTaskByType
  } = useTimerContext()

  const { hours, minutes, seconds, isRunning, pause, resume, restart } =
    useTimer({
      expiryTimestamp: getDateInTheFuture({ minutes: currentTask.duration }),
      autoStart: false,
      onExpire: onTimerEndReach
    })

  useEffect(() => {
    const date = getDateInTheFuture({ minutes: currentTask.duration })

    restart(date)
    pause()
  }, [currentTask])

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
          {renderLeftContainerWithTimerAndTabs()}
          {renderRightContainerWithConfig()}
        </Container>
      </main>
    </>
  )
}
