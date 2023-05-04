import { useEffect, useRef, useState } from "react"
import placeholderGifs from "src/assets/images/gifs.json"
import { PlayPauseButton } from "src/components/buttons/PlayButton"
import { MediaProgressBarWrapper } from "../song-post/components/VideoPlayer"

type VideoProps = {
  src: string | undefined
  isVideo: boolean
  thumbnail?: string
  inView?: boolean
}

function PlayPauseButtonWrapper({ isPlaying, onPlayPause }: { isPlaying: boolean; onPlayPause: () => void }) {
  return (
    <div className={`song-post__playback-btn`}>
      <div className="song-post__playback-btn--bs-inset">
        <div className="song-post__playback-btn--wrapper">
          <PlayPauseButton isPlaying={isPlaying} onPlayPause={onPlayPause} />
        </div>
      </div>
    </div>
  )
}

export const Video = ({ src, isVideo, thumbnail, inView }: VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false)
  // const [index, setIndex] = useState<number>()
  const [placeholder, setPlaceholder] = useState<string>("")
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isVideo) {
      const index = Math.floor(Math.random() * 40)
      setPlaceholder(placeholderGifs[index].url)
    }
  }, [isVideo])

  useEffect(() => {
    if (src && videoRef.current) {
      videoRef.current.src = src
      videoRef.current.load()
    }
  }, [src])

  const playPauseHandler = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleFullScreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullScreen(!isFullScreen)
    }
  }

  const getVideoOrientation = (_src: string) => {
    const video = document.createElement("video")
    video.src = _src
    return video.videoWidth > video.videoHeight ? "landscape" : "portrait"
  }

  const onVideoClickHandler = () => {
    if (showPlayPauseButton) {
      setShowPlayPauseButton(false)
    } else {
      setShowPlayPauseButton(true)
    }
  }

  return (
    <div
      className="song-post__video--container"
      style={!isVideo && placeholder ? { backgroundImage: `url(${placeholder})` } : {}}
    >
      {isVideo && (
        <video
          src={src}
          ref={videoRef}
          className="video-pane-video"
          style={{ objectFit: "contain" }}
          poster={thumbnail}
          loop
          playsInline
        />
      )}

      <div className="song-post__video-shadow-overlay" onClick={onVideoClickHandler}>
        {showPlayPauseButton && <PlayPauseButtonWrapper isPlaying={isPlaying} onPlayPause={playPauseHandler} />}

        <button onClick={toggleFullScreen}>{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</button>
        <MediaProgressBarWrapper duration={10} videoRef={videoRef} />
      </div>
    </div>
  )
}
