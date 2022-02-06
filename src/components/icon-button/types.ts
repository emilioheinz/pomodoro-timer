import { IconType } from 'react-icons/lib'

export type IconProps = {
  color: string
  width: number
}

export type IconButtonPropTypes = {
  Icon: IconType
  onClick?: () => void
  isDisabled?: boolean
  ariaLabel: string
  size?: number
  color?: string
}
