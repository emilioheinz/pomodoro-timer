import Head from 'next/head'
import { ChangeEvent } from 'react'

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

import { useTimerConfig } from '~/contexts/timer-config'
import { useTimer } from '~/contexts/timer'

const options = [
  { value: TasksTypes.focus, label: 'Focus' },
  { value: TasksTypes.rest, label: 'Rest' }
]

export default function Home() {
  const { focusTime, restTime, setFocusTime, setRestTime, getTaskByType } =
    useTimerConfig()

  const {
    progressPercentage,
    formattedTimeLeft,
    currentTask,
    setCurrentTask,
    isRunning,
    pause,
    resume
  } = useTimer()

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
          formattedTimeLeft={formattedTimeLeft}
          onPauseClick={pause}
          onResumeClick={resume}
          progressPercentage={progressPercentage}
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
