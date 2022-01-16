import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin: 16px 0;

  span {
    color: ${props => props.theme.colors.text};
    line-height: 35px;
    font-size: 20px;
  }

  .slider {
    border: none;
    border-radius: 8px;
    height: 8px;
    width: 100%;
    outline: none;
    -webkit-appearance: none;

    ::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${props => props.theme.colors.primary};
      cursor: pointer;

      :hover {
        width: 25px;
        height: 25px;
        transition: 0.2s;
      }
    }
  }
`
