import { Task, TasksTypes } from '~/types/task'

export const DEFAULT_ALERTS_SOUND_VOLUME = 50
export const DEFAULT_FOCUS_TIME_IN_MINUTES = 50
export const DEFAULT_REST_TIME_IN_MINUTES = 10
export const DELAY_BETWEEN_TASKS_IN_MS = 7000
export const TOAST_DURATION = 5000
export const INITIAL_TASK: Task = {
  type: TasksTypes.focus,
  duration: DEFAULT_FOCUS_TIME_IN_MINUTES
}
