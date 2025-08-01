import { RefObject } from "react"
import { useMediaProgress } from "src/features/video/hooks/useMediaProgress"
import { formatTime } from "src/utils/formatTime"

type ProgressBarProps = {
  addClass: string
  progress: number
  isScrubbing: boolean
  seekValue: number | null
  // currentPercentage: string
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
  // isPlaying: boolean
  // setIsPlaying: Dispatch<SetStateAction<boolean>>
}

function ProgressBarTime({ seconds, type }: ProgressBarTimeProps) {
  const roundedTime = Math.round(seconds)
  const time = formatTime(roundedTime)
  return <div className={`progress-bar__text ${type}`}>{time}</div>
}

function ProgressBar({
  addClass,
  progress,
  isScrubbing,
  seekValue,
  // currentPercentage,
  duration,
  onScrub,
  onScrubEnd,
}: ProgressBarProps) {
  const BACKGROUND_COLOR = "#eeb2cb"
  const PROGRESS_COLOR = "#ec6aa0"

  const roundedDuration = Math.round(duration / 1000)
  const prog = isScrubbing && seekValue ? seekValue : progress
  const currentPercentage = `${(prog / roundedDuration) * 100 + 0.02}%`

  const trackSlider = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, ${PROGRESS_COLOR}), color-stop(${currentPercentage}, ${BACKGROUND_COLOR}))
  `

  return (
    <input
      className={`${addClass}`}
      type="range"
      value={`${prog}`}
      step=".01"
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

export const MediaProgressBar = ({ duration, videoRef }: MediaProgressBarProps) => {
  const { progress, seekValue, isScrubbing, onScrub, onScrubEnd } = useMediaProgress(
    videoRef,
    duration
    // isPlaying,
    // setIsPlaying
  )

  return (
    <div className="progress-bar">
      <ProgressBarTime seconds={progress} type="Start" />

      <div className="progress-bar__slider">
        <div className="progress-bar__slider--bs-inset">
          <ProgressBar
            addClass=""
            progress={progress}
            seekValue={seekValue}
            isScrubbing={isScrubbing}
            // currentPercentage={currentPercentage}
            duration={duration}
            onScrub={onScrub}
            onScrubEnd={onScrubEnd}
          />
        </div>
      </div>

      <ProgressBarTime seconds={duration / 1000} type="End" />
    </div>
  )
}
