export enum TasksTypes {
  focus = 'FOCUS',
  rest = 'REST'
}

export type Task = {
  type: TasksTypes
  duration: number
}
