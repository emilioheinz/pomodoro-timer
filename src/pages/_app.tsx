import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from '../styles/global'
import theme from '../styles/theme'
import Toast from '~/components/toast'
import { TimerConfigContextProvider } from '~/contexts/timer-config'
import { TimerContextProvider } from '~/contexts/timer'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <TimerConfigContextProvider>
        <TimerContextProvider>
          <Component {...pageProps} />
          <GlobalStyle />
          <Toast />
        </TimerContextProvider>
      </TimerConfigContextProvider>
    </ThemeProvider>
  )
}

export default appWithTranslation(MyApp)
