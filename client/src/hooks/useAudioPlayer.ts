import { useEffect, useRef, useState } from "react"

type UseAudioPlayerProps = {
  src: string
  duration: number
  bgColor: string
  video?: string
}

export default function useAudioPlayer({ src, duration, bgColor, video }: UseAudioPlayerProps) {
  const [trackProgress, setTrackProgress] = useState(0)
  const [songDuration, setSongDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const videoElement = document.getElementById(`${video}`)
  const audioElement = new Audio(src)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const secondsRef = useRef<ReturnType<typeof setInterval>>()
  const currentProgressRef = useRef(0)

  const [currentTime, setCurrentTime] = useState<string>("0:00")
  const [endTime, setEndTime] = useState<string>("0:00")
  const audioRef = useRef<any>(null)

  useEffect(() => {
    if (video) {
      console.log(audioRef.current, video, videoElement, "lololol wtfh are these values going to be probably null")
      audioRef.current = videoElement
    } else {
      audioRef.current = audioElement
    }
  }, [src, video])

  useEffect(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef?.current?.play()
      startTimer()
    } else {
      if (intervalRef.current && secondsRef.current) {
        clearInterval(intervalRef.current)
        clearInterval(secondsRef.current)
      }
      audioRef?.current?.pause()
    }
  }, [isPlaying, audioRef.current])

  useEffect(() => {
    if (currentProgressRef.current) {
      const getCurrentTime = formatTime(currentProgressRef.current)
      setCurrentTime(getCurrentTime)
    }
  }, [currentProgressRef.current])

  useEffect(() => {
    let filteredDuration = Math.round(duration / 1000)
    setSongDuration(filteredDuration)

    const getEndTime = formatTime(filteredDuration)
    setEndTime(getEndTime)
  }, [src])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.src = src
    setTrackProgress(audioRef.current.currentTime)
    currentProgressRef.current = 0
  }, [src])

  const currentPercentage = songDuration ? `${(trackProgress / songDuration) * 100 + 0.02}%` : "0%"
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #63DEBC), color-stop(${currentPercentage}, ${bgColor}))
  `

  const startTimer = () => {
    if (audioRef.current !== null) {
      if (intervalRef.current && secondsRef.current) {
        clearInterval(intervalRef.current)
        clearInterval(secondsRef.current)
      }

      intervalRef.current = setInterval(() => {
        if (audioRef.current?.ended) {
          setIsPlaying(false)
          currentProgressRef.current = 0
        } else {
          setTrackProgress(audioRef.current?.currentTime)
        }
      }, 100)

      secondsRef.current = setInterval(() => {
        if (audioRef.current?.ended) {
        } else {
          currentProgressRef.current++
        }
      }, 1000)
    }
  }

  const onScrub = (value: string) => {
    if (intervalRef.current && secondsRef.current) {
      clearInterval(intervalRef.current)
      clearInterval(secondsRef.current)
    }
    const numberValue: number = parseInt(value)

    audioRef.current.currentTime = numberValue
    currentProgressRef.current = Math.round(numberValue)
    setTrackProgress(audioRef.current.currentTime)
  }

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }

  const formatTime = (seconds: number) => {
    const getMinutes = Math.floor(seconds / 60)
    const getSeconds = seconds % 60
    const getFormattedSeconds = getSeconds < 10 ? `0${getSeconds}` : `${getSeconds}`
    const getFormattedMinutes = getMinutes >= 1 ? getMinutes : 0

    return `${getFormattedMinutes}:${getFormattedSeconds}`
  }

  return {
    slider: {
      progress: trackProgress,
      duration: songDuration,
      onScrub: onScrub,
      onScrubEnd: onScrubEnd,
      style: trackStyling,
    },
    time: {
      current: currentTime,
      end: endTime,
    },
    isPlaying,
    setIsPlaying,
  }
}
