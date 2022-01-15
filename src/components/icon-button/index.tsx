import { Button } from './styles'
import { IconButtonPropTypes } from './types'
import { useTheme } from 'styled-components'

const BUTTON_SIZE = 48

export function IconButton({
  Icon,
  onClick,
  isDisabled = false
}: IconButtonPropTypes) {
  const theme = useTheme()

  return (
    <Button onClick={onClick} disabled={isDisabled}>
      <Icon size={BUTTON_SIZE} color={theme.colors.primary} />
    </Button>
  )
}
