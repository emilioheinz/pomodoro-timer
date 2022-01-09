import { ButtonContainer, Label } from './styles'
import { ButtonPropTypes, ButtonTypes } from './types'

export default function Button({
  label,
  onClick,
  type = ButtonTypes.solid
}: ButtonPropTypes) {
  return (
    <ButtonContainer buttonType={type} onClick={onClick}>
      <Label>{label}</Label>
    </ButtonContainer>
  )
}
