import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import Toast from '~/components/toast'
import { TimerContextProvider } from '~/contexts/timer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <TimerContextProvider>
        <Component {...pageProps} />
        <GlobalStyle />
        <Toast />
      </TimerContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
