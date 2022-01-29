export type TimerProps = {
  isRunning: boolean
  hours: number
  minutes: number
  seconds: number
  currentTaskDuration: number
  onPause: () => void
  onResume: () => void
}
