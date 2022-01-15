import styled from 'styled-components'
import { ButtonTypes } from './types'

export const ButtonContainer = styled.button<{ buttonType: ButtonTypes }>`
  width: 100%;
  max-width: 350px;

  outline: none;
  background: ${props =>
    props.buttonType === ButtonTypes.solid
      ? props.theme.colors.primary
      : 'transparent'};
  border: ${props => `2px solid ${props.theme.colors.primary}`};

  padding: 20px;
  margin: 10px;
  border-radius: 30px;

  :hover {
    cursor: pointer;
  }

  span {
    color: ${props => props.theme.colors.text};
  }
`
export const Label = styled.span`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  font-weight: 500;
`
