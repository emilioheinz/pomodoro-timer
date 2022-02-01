import toast from 'react-hot-toast'
import { useTranslation } from 'next-i18next'

export default function useToast() {
  const { t } = useTranslation()

  const notify = async (text: string) => {
    toast(t(`toast.${text}`))
  }

  const notifyFocusEnd = () => notify('focus-time-ended')
  const notifyRestEnd = () => notify('rest-time-ended')

  return { notifyFocusEnd, notifyRestEnd }
}
