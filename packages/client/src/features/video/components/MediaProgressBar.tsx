import { RefObject } from "react"
import { useMediaProgressTime } from "src/features/video/hooks/useMediaProgress"

type MediaProgressBarProps = {
  addClass: string
  progress: number
  duration: number
  onScrub: (value: string) => void
  onScrubEnd: () => void
  style: string
}

function MediaProgressBar({ addClass, progress, duration, onScrub, onScrubEnd, style }: MediaProgressBarProps) {
  return (
    <input
      className={`${addClass}`}
      type="range"
      value={progress}
      step=".1"
      min="0"
      max={duration ? duration : `${duration}`}
      onChange={(e) => onScrub(e.target.value)}
      onMouseUp={() => onScrubEnd()}
      onKeyUp={() => onScrubEnd()}
      onTouchEnd={() => onScrubEnd()}
      style={{ background: style }}
    />
  )
}

type MediaProgressBarWrapperProps = {
  duration: number
  videoRef: RefObject<HTMLVideoElement>
  isPlaying: boolean
}

export const MediaProgressBarWrapper = ({ duration, videoRef, isPlaying }: MediaProgressBarWrapperProps) => {
  const { currentTime, progress, end, onScrub, onScrubEnd } = useMediaProgressTime(videoRef, duration, isPlaying)
  const bgColor = "#eeb2cb"
  let filteredDuration = Math.round(duration / 1000)

  const currentPercentage = duration ? `${(progress / filteredDuration) * 100 + 0.02}%` : "0%"
  const style = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #63DEBC), color-stop(${currentPercentage}, ${bgColor}))
`
  return (
    <div className="progress-bar">
      <div className="progress-bar__text Start">{currentTime}</div>
      <div className="progress-bar__slider">
        <div className="progress-bar__slider--bs-inset">
          <MediaProgressBar
            addClass=""
            progress={progress}
            duration={filteredDuration}
            onScrub={onScrub}
            onScrubEnd={onScrubEnd}
            style={style}
          />
        </div>
      </div>
      <div className="progress-bar__text End">{end}</div>
    </div>
  )
}
