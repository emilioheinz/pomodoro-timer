import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { TimerContextProvider } from '~/contexts/timer'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <TimerContextProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </TimerContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
