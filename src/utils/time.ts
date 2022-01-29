type GetDateInTheFutureParams = {
  minutes: number
}

type ToMinutesAndSecondsParams = {
  hours: number
  minutes: number
  seconds: number
}

function validateMinLength(number: number) {
  if (number > 10) return `${number}`

  return `${number}`.padStart(2, '0')
}

export function toMinutesAndSeconds({
  hours,
  minutes,
  seconds
}: ToMinutesAndSecondsParams) {
  return {
    minutes: validateMinLength(minutes + hours * 60),
    seconds: validateMinLength(seconds)
  }
}

export function getDateInTheFuture({ minutes }: GetDateInTheFutureParams) {
  const data = new Date()
  data.setMinutes(data.getMinutes() + minutes)

  return data
}
