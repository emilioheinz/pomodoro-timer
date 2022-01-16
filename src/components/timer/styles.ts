import styled from 'styled-components'

export const Container = styled.div<{ progressPercentage: number }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 20px;
  padding: 30px;
  border: ${props => `8px solid ${props.theme.colors.primary30}`};
  box-shadow: ${props => `5px 5px 20px ${props.theme.colors.background}`};

  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    padding: 8px;
    background: ${props =>
      `conic-gradient(${props.theme.colors.primary} ${props.progressPercentage}%, transparent 0%)`};
    -webkit-mask: linear-gradient(#ffffff 0 0) content-box,
      linear-gradient(#ffffff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
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
