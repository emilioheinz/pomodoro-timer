import { ChangeEvent, useState } from 'react'
import { TasksTypes } from '~/types/task'
import { Container } from './styles'
import { TabsMenuProps } from './types'

export default function TabsMenu({
  options,
  onChange,
  checkedValue
}: TabsMenuProps) {
  function renderTab(label: string, value: number | string) {
    return (
      <div key={value}>
        <input
          name="tabs-menu-option"
          type="radio"
          value={value}
          id={label + value}
          onChange={onChange}
          checked={checkedValue === value}
        />
        <label htmlFor={label + value}>{label}</label>
      </div>
    )
  }

  return (
    <Container>
      {options.map(({ label, value }) => renderTab(label, value))}
    </Container>
  )
}
