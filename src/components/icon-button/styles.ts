import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  background: transparent;
  margin: 10px;
  opacity: ${props => (props.disabled ? 0.3 : 1)};

  :hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`
