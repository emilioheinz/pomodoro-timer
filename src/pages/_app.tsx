import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import Toast from '~/components/toast'
import { TimerConfigContextProvider } from '~/contexts/timer-config'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <TimerConfigContextProvider>
        <Component {...pageProps} />
        <GlobalStyle />
        <Toast />
      </TimerConfigContextProvider>
    </ThemeProvider>
  )
}

export default MyApp
