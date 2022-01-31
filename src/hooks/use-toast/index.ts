import toast from 'react-hot-toast'
import { useTranslation } from 'next-i18next'
import IntlNamespaces from '~/enums/intl-namespaces'
import { useRouter } from 'next/router'

export default function useToast() {
  const { locale } = useRouter()
  const { t, i18n } = useTranslation(IntlNamespaces.toast)

  const notify = (text: string) => {
    const hasLoadedToastTranslations = i18n.hasResourceBundle(
      locale as string,
      IntlNamespaces.toast
    )

    if (hasLoadedToastTranslations) toast(t(text))
  }

  const notifyFocusEnd = () => notify('focus-time-ended')
  const notifyRestEnd = () => notify('rest-time-ended')

  return { notifyFocusEnd, notifyRestEnd }
}
