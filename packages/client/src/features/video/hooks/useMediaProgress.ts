import { RefObject, useEffect, useState } from "react"

function formatTime(seconds: number) {
  const getMinutes = Math.floor(seconds / 60)
  const getSeconds = seconds % 60
  const getFormattedSeconds = getSeconds < 10 ? `0${getSeconds}` : `${getSeconds}`
  const getFormattedMinutes = getMinutes >= 1 ? getMinutes : 0
  return `${getFormattedMinutes}:${getFormattedSeconds}`
}

// TODO: should handle both current and total time
export const useMediaProgressTime = (videoRef: RefObject<HTMLVideoElement>, duration: number, isPlaying: boolean) => {
  const [currentTime, setCurrentTime] = useState<string>("0:00")
  const [progress, setProgress] = useState<number>(0)
  const [end, setEnd] = useState<string>("0:00")

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", handleTimeUpdate)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleTimeUpdate)
      }
    }
  }, [videoRef])

  useEffect(() => {
    if (!videoRef.current) return
    console.log(currentTime, "tracking the currentTime of the videoRef")
  }, [currentTime])

  useEffect(() => {
    const endTime = formatTime(duration)
    setEnd(endTime)
  }, [duration, videoRef])

  const handleTimeUpdate = () => {
    if (videoRef.current && isPlaying) {
      const roundTime = Math.floor(videoRef.current.currentTime)
      const time = formatTime(roundTime)
      setProgress(roundTime)
      setCurrentTime(time)
    }
  }

  const onScrub = (value: string) => {
    if (!videoRef.current) return
    const numberValue: number = parseInt(value)
    videoRef.current.currentTime = numberValue
  }

  const onScrubEnd = () => {
    console.log("scrub ended")
  }

  return { currentTime, progress, end, onScrub, onScrubEnd }
}
