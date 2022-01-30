import React, { ChangeEvent } from 'react'

export type RangeSliderProps = {
  range: Array<number>
  stepsGap?: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  renderLabel?: () => React.ReactElement
  currentValue: number
  isDisabled?: boolean
  id: string
}
