function validateMinLength(number: number) {
  if (number > 10) return `${number}`

  return `${number}`.padStart(2, '0')
}

export function msToMinutesAndSeconds(milliseconds: number) {
  const minutes = validateMinLength(Math.floor(milliseconds / 60000))
  const seconds = validateMinLength((milliseconds % 60000) / 1000)

  return `${minutes}:${seconds}`
}

export function minutesToMs(minutes: number) {
  return minutes * 60000
}
