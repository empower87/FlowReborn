import { Dispatch, RefObject, SetStateAction } from "react"
import { useMediaProgress } from "src/features/video/hooks/useMediaProgress"

type ProgressBarProps = {
  addClass: string
  progress: number
  duration: number
  onScrub: (value: string) => void
  onScrubEnd: () => void
}

type ProgressBarTimeProps = {
  seconds: number
  type: "Start" | "End"
}

type MediaProgressBarProps = {
  duration: number
  videoRef: RefObject<HTMLVideoElement>
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

function ProgressBarTime({ seconds, type }: ProgressBarTimeProps) {
  function formatTime(seconds: number) {
    const getMinutes = Math.floor(seconds / 60)
    const getSeconds = seconds % 60
    const getFormattedSeconds = getSeconds < 10 ? `0${getSeconds}` : `${getSeconds}`
    const getFormattedMinutes = getMinutes >= 1 ? getMinutes : 0
    return `${getFormattedMinutes}:${getFormattedSeconds}`
  }

  const roundedTime = Math.round(seconds)
  const time = formatTime(roundedTime)
  return <div className={`progress-bar__text ${type}`}>{time}</div>
}

function ProgressBar({ addClass, progress, duration, onScrub, onScrubEnd }: ProgressBarProps) {
  const BACKGROUND_COLOR = "#eeb2cb"
  const PROGRESS_COLOR = "#ec6aa0"

  const roundedDuration = Math.round(duration / 1000)
  const currentPercentage = `${(progress / roundedDuration) * 100 + 0.02}%`
  const trackSlider = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, ${PROGRESS_COLOR}), color-stop(${currentPercentage}, ${BACKGROUND_COLOR}))
  `

  return (
    <input
      className={`${addClass}`}
      type="range"
      value={`${progress}`}
      step=".1"
      min="0"
      max={`${roundedDuration}`}
      onChange={(e) => onScrub(e.target.value)}
      onMouseUp={() => onScrubEnd()}
      onKeyUp={() => onScrubEnd()}
      onTouchEnd={() => onScrubEnd()}
      style={{ background: trackSlider }}
    />
  )
}

export const MediaProgressBar = ({ duration, videoRef, isPlaying, setIsPlaying }: MediaProgressBarProps) => {
  const { progress, onScrub, onScrubEnd } = useMediaProgress(videoRef, isPlaying, setIsPlaying)

  return (
    <div className="progress-bar">
      <ProgressBarTime seconds={progress} type="Start" />

      <div className="progress-bar__slider">
        <div className="progress-bar__slider--bs-inset">
          <ProgressBar addClass="" progress={progress} duration={duration} onScrub={onScrub} onScrubEnd={onScrubEnd} />
        </div>
      </div>

      <ProgressBarTime seconds={duration / 1000} type="End" />
    </div>
  )
}
