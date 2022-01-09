import styled from 'styled-components'

export const ButtonContainer = styled.button`
  border: none;
  outline: none;
  background: ${props => props.theme.colors.primary};
  padding: 20px;
  margin: 15px;
  border-radius: 30px;
  display: flex;
  flex-basis: 350px;
  justify-content: center;
`
export const Label = styled.span`
  color: ${props => props.theme.colors.textOnPrimary};
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 18px;
  font-weight: 500;
`
