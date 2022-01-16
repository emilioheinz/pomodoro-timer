import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  height: 20px;
  margin: 20px 0 60px 0;

  input {
    display: none;
  }

  label {
    position: relative;
    display: inline-block;
    color: ${props => props.theme.colors.secondary};
    padding: 16px 30px;
    font-family: sans-serif, Arial;
    font-size: 22px;
  }

  input:checked + label {
    ::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 5px;
      width: 100%;
      background: ${props => props.theme.colors.primary};
    }
  }
`
