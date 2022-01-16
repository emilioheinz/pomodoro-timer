export type TimerProps = {
  isTimerRunning: boolean
  formattedTimeLeft: string
  start: () => void
  reset: () => void
  ranPercentage: number
}
