import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 350px;
  margin: 20px;
  padding: 30px;
  border: ${props => `3px solid ${props.theme.colors.primary30}`};
`

export const TimeWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;

  span {
    font-size: 65px;
    font-weight: bold;
    letter-spacing: 2px;
    color: ${props => props.theme.colors.text};
  }
`
