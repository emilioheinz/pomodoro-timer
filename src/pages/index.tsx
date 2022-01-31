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
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'
import IntlNamespaces from '~/enums/intl-namespaces'

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const translationProps = await serverSideTranslations(locale as string, [
    IntlNamespaces.home,
    IntlNamespaces.common
  ])

  return {
    props: {
      ...translationProps
    }
  }
}

export default function Home() {
  const { locale } = useRouter()
  const { t } = useTranslation([IntlNamespaces.home, IntlNamespaces.common])

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
        <span>{`${minutes} ${t('time.minutes-abbreviation', {
          ns: IntlNamespaces.common
        })}`}</span>
        <span>{label}</span>
      </RangeInputLabelContainer>
    )
  }

  function renderLeftContainerWithTimerAndTabs() {
    const options = [
      {
        value: TasksTypes.focus,
        label: t('focus', { ns: IntlNamespaces.common })
      },
      {
        value: TasksTypes.rest,
        label: t('rest', { ns: IntlNamespaces.common })
      }
    ]

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
          renderLabel={() =>
            renderRangeInputLabel(
              focusTime,
              t('focus', { ns: IntlNamespaces.common })
            )
          }
          isDisabled={isRunning}
          id="focus-range-slider"
        />
        <RangeSlider
          range={[1, 120]}
          onChange={e => setRestTime(Number(e.target.value))}
          currentValue={restTime}
          renderLabel={() =>
            renderRangeInputLabel(
              restTime,
              t('rest', { ns: IntlNamespaces.common })
            )
          }
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
          lang={locale}
          name="description"
          content={t('meta.description')}
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
