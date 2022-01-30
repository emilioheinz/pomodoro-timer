import { Toaster } from 'react-hot-toast'
import { useTheme } from 'styled-components'
import { TOAST_DURATION } from '~/contants'

export default function Toast() {
  const theme = useTheme()

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: TOAST_DURATION,
        style: {
          background: theme.colors.primary,
          color: theme.colors.text
        }
      }}
    />
  )
}
