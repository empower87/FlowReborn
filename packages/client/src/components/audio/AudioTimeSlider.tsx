import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { ISongTake } from "src/features/recording-booth/utils/types"
import { ISong } from "../../../../server/src/models/Song"

type Props = {
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  currentSong: ISong | ISongTake
  bgColor: string
}

function UseAudioPlayer({ isPlaying, setIsPlaying, currentSong, bgColor }: Props) {
  const [trackProgress, setTrackProgress] = useState(0)
  const [songDuration, setSongDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement>(new Audio(currentSong?.src))
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const secondsRef = useRef<ReturnType<typeof setInterval>>()
  const currentProgressRef = useRef(0)

  const [currentTime, setCurrentTime] = useState<string>("0:00")
  const [endTime, setEndTime] = useState<string>("0:00")

  const startTimer = useCallback(() => {
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
  }, [setTrackProgress, setIsPlaying])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
      startTimer()
    } else {
      if (intervalRef.current && secondsRef.current) {
        clearInterval(intervalRef.current)
        clearInterval(secondsRef.current)
      }
      audioRef.current.pause()
    }
  }, [isPlaying, startTimer])

  useEffect(() => {
    if (currentProgressRef.current) {
      const getCurrentTime = formatTime(currentProgressRef.current)
      setCurrentTime(getCurrentTime)
    }
  }, [])

  useEffect(() => {
    let filteredDuration = Math.round(currentSong?.duration / 1000)
    setSongDuration(filteredDuration)

    const getEndTime = formatTime(filteredDuration)
    setEndTime(getEndTime)
  }, [currentSong])

  useEffect(() => {
    audioRef.current.pause()
    audioRef.current.src = currentSong?.src
    setTrackProgress(audioRef.current.currentTime)
    currentProgressRef.current = 0
  }, [currentSong])

  const currentPercentage = songDuration ? `${(trackProgress / songDuration) * 100}%` : "0%"
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #63DEBC), color-stop(${currentPercentage}, ${bgColor}))
  `

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

  return (
    <div className="play-slider_shadow-div-inset">
      <input
        className="dur-onset progress"
        type="range"
        value={trackProgress}
        step=".1"
        min="0"
        max={songDuration ? songDuration : `${songDuration}`}
        onChange={(e) => onScrub(e.target.value)}
        onMouseUp={() => onScrubEnd()}
        onKeyUp={() => onScrubEnd()}
        onTouchEnd={() => onScrubEnd()}
        style={{ background: trackStyling }}
      ></input>
      <div className="time-text-container">
        <div className="time-text-start">
          {/* {currentProgressRef.current >= 60
            ? currentMinutesRef.current
            : currentProgressRef.current} */}
          {currentTime}
        </div>
        <div className="time-text-end">
          {/* {songDuration >= 60 ? songMinutes : `${songDuration}`} */}
          {endTime}
        </div>
      </div>
    </div>
  )
}
export default UseAudioPlayer
