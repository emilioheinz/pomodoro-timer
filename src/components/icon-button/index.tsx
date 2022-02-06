import { Button } from './styles'
import { IconButtonPropTypes } from './types'
import { useTheme } from 'styled-components'

const DEFAULT_BUTTON_SIZE = 48

export function IconButton({
  Icon,
  onClick,
  ariaLabel,
  color,
  isDisabled = false,
  size = DEFAULT_BUTTON_SIZE
}: IconButtonPropTypes) {
  const theme = useTheme()

  return (
    <Button aria-label={ariaLabel} onClick={onClick} disabled={isDisabled}>
      <Icon size={size} color={color || theme.colors.primary} />
    </Button>
  )
}
