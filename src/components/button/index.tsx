import { ButtonContainer, Label } from './styles'

interface ButtonPropTypes {
  label: string
}

export default function Button({ label }: ButtonPropTypes) {
  return (
    <ButtonContainer>
      <Label>{label}</Label>
    </ButtonContainer>
  )
}
