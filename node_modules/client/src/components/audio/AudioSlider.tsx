type AudioSliderProps = {
  addClass: string
  progress: number
  duration: number
  onScrub: (value: string) => void
  onScrubEnd: () => void
  style: string
}

export default function AudioSlider({ addClass, progress, duration, onScrub, onScrubEnd, style }: AudioSliderProps) {
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
