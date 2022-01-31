export type TimerProps = {
  isRunning: boolean
  formattedTimeLeft: string
  onPauseClick: () => void
  onResumeClick: () => void
  progressPercentage: number
}
