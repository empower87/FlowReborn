import { forwardRef, RefObject, useState } from "react"
import { PlayPauseButton } from "src/components/buttons/PlayButton"
import MediaProgressBar from "src/features/video/components/MediaProgressBar"
import { useMediaProgressTime } from "src/features/video/hooks/useMediaProgress"

type MediaProgressBarProps = {
  duration: number
  videoRef: RefObject<HTMLVideoElement>
}

export const PlaybackButtonContainer = ({
  isPlaying,
  setIsPlaying,
}: {
  isPlaying: boolean
  setIsPlaying: () => void
}) => {
  const [isAdded, setIsAdded] = useState<boolean>(false)

  // const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden")

  // useEffect(() => {
  //   setVisibility("visible")
  //   setTimeout(() => {
  //     setVisibility("hidden")
  //   }, 2000)
  // }, [isPlaying])

  return (
    <div className={`song-post__playback-btn `}>
      <div className="song-post__playback-btn--bs-inset">
        <div className="song-post__playback-btn--wrapper">
          <PlayPauseButton isPlaying={isPlaying} onPlayPause={setIsPlaying} />
        </div>
      </div>
    </div>
  )
}

export const MediaProgressBarWrapper = ({ duration, videoRef }: MediaProgressBarProps) => {
  const { currentTime, progress, end, onScrub, onScrubEnd } = useMediaProgressTime(videoRef, duration)
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

type Ref = HTMLVideoElement

type VideoProps = {
  thumbnail: string | undefined
  src: string | undefined
  onClick: () => void
  placeholder?: string | undefined
  toggleAspectRatio: "Landscape" | "Portrait"
}

// TODO: should create popup modal to make video fullscreen vs. hiding ui elements in parent
export const Video = forwardRef<Ref, VideoProps>(({ thumbnail, src, onClick, placeholder, toggleAspectRatio }, ref) => {
  return (
    <div
      className="song-post__video--container"
      style={{ backgroundImage: `url(${placeholder ? placeholder : ""})` }}
      onClick={() => onClick()}
    >
      {thumbnail && (
        <video
          id={`${src}_video`}
          ref={ref}
          className={`video-pane-video`}
          style={{ objectFit: toggleAspectRatio === "Landscape" ? "contain" : "cover" }}
          src={src}
          poster={thumbnail}
          loop
          playsInline
        />
      )}
      <div className="song-post__video-shadow-overlay"></div>
    </div>
  )
})
