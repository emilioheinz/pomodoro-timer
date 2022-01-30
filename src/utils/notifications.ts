import toast from 'react-hot-toast'

export const notifyFocusEnd = () =>
  toast('Your focus time ended. Starting rest time.')
export const notifyRestEnd = () =>
  toast('Your rest time ended. Starting focus time.')
