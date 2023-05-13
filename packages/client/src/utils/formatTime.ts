export const formatTime = (seconds: number) => {
  const getMinutes = Math.floor(seconds / 60)
  const getSeconds = seconds % 60
  const getFormattedSeconds = getSeconds < 10 ? `0${getSeconds}` : `${getSeconds}`
  const getFormattedMinutes = getMinutes >= 1 ? getMinutes : 0
  return `${getFormattedMinutes}:${getFormattedSeconds}`
}
