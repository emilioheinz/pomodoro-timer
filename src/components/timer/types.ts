export type TimerProps = {
  isRunning: boolean
  hours: number
  minutes: number
  seconds: number
  onPause: () => void
  onResume: () => void
}
