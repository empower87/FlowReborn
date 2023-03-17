import { forwardRef, ReactNode, useEffect, useState } from "react"
import { PlaybackButton } from "src/components/buttons/PlayButton"

type MediaProgressBarProps = {
  current: string
  end: string
  children: ReactNode
}

export const PlaybackButtonContainer = ({
  isPlaying,
  setIsPlaying,
}: {
  isPlaying: boolean
  setIsPlaying: () => void
}) => {
  const [isAdded, setIsAdded] = useState<boolean>(false)

  const [visibility, setVisibility] = useState<"hidden" | "visible">("hidden")

  useEffect(() => {
    setVisibility("visible")
    setTimeout(() => {
      setVisibility("hidden")
    }, 2000)
  }, [isPlaying])

  return (
    <div className={`song-post__playback-btn ${isAdded ? "btn-fade-anim" : ""}`} style={{ visibility: visibility }}>
      <div className="song-post__playback-btn--bs-inset">
        <div className="song-post__playback-btn--wrapper">
          <PlaybackButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>
      </div>
    </div>
  )
}

export const MediaProgressBar = ({ current, end, children }: MediaProgressBarProps) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__text Start">{current}</div>
      <div className="progress-bar__slider">
        <div className="progress-bar__slider--bs-inset">
          {/* <AudioSlider
            addClass=""
            progress={progress}
            duration={duration}
            onScrub={onScrub}
            onScrubEnd={onScrubEnd}
            style={style}
          /> */}
          {children}
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
