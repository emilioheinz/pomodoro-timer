import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 350px;
  background: ${props => props.theme.colors.primary};
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 350px;
  margin: 20px;
`

export const Time = styled.span`
  font-size: 65px;
  font-weight: bold;
  letter-spacing: 2px;
  color: ${props => props.theme.colors.textOnPrimary};
`
