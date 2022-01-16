import { ChangeEvent } from 'react'

type Option = {
  value: string | number
  label: string
}

export type TabsMenuProps = {
  options: Array<Option>
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  checkedValue: number | string
}
