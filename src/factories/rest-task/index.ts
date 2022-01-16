import { Task, TasksTypes } from '~/types/task'
import { MakeRestTaskParams } from './types'

export function makeRestTask({ duration }: MakeRestTaskParams): Task {
  return {
    type: TasksTypes.rest,
    duration
  }
}
