import { Task, TasksTypes } from '~/types/task'
import { MakeFocusTaskParams } from './types'

export function makeFocusTask({ duration }: MakeFocusTaskParams): Task {
  return {
    type: TasksTypes.focus,
    duration
  }
}
