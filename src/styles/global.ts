import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
 * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }

 html, body {
  height: 100%;
 }

 body {
   background: ${props =>
     `linear-gradient(to bottom right, ${props.theme.colors.background}, ${props.theme.colors.secondaryBackground})`};

   font: 400 16px Roboto, sans-serif;
 }
`
