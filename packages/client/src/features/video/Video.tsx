import { MouseEvent, ReactNode, RefObject, useEffect, useRef, useState } from "react"
import placeholderGifs from "src/assets/images/gifs.json"
import { Icon } from "src/components/buttons/Icon/Icon"
import { PlayPauseButton } from "src/components/buttons/PlayButton"
import { MediaProgressBar } from "./components/MediaProgressBar"

type VideoProps = {
  src: string | undefined
  duration: number
  isVideo: boolean
  thumbnail?: string
  inView?: boolean
}
type VideoControlsProps = {
  showControls: boolean
  onVideoClick: (e: MouseEvent<HTMLDivElement>) => void
  children: ReactNode
}

function FullscreenButton({ toggleFullscreen }: { toggleFullscreen: () => void }) {
  return (
    <button onClick={toggleFullscreen}>
      <Icon type="Fullscreen" options={{ color: "Primary", size: 70 }} />
    </button>
  )
}

function PlayPauseButtonWrapper({ isPlaying, onPlayPause }: { isPlaying: boolean; onPlayPause: () => void }) {
  return (
    <div className="song-post__playback-btn">
      <div className="song-post__playback-btn--bs-inset">
        <div className="song-post__playback-btn--wrapper">
          <PlayPauseButton isPlaying={isPlaying} onPlayPause={() => onPlayPause()} />
        </div>
      </div>
    </div>
  )
}

function VideoControls({ showControls, onVideoClick, children }: VideoControlsProps) {
  return (
    <div
      className={`song-post__video-controls-overlay ${showControls ? "show-controls" : "hide-controls"}`}
      onClick={onVideoClick}
    >
      {children}
    </div>
  )
}

const useMediaPlayer = (videoRef: RefObject<HTMLVideoElement>) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [placeholder, setPlaceholder] = useState<string | null>(null)
  const [showVideoControls, setShowVideoControls] = useState<boolean>(false)

  // const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isPlaying])

  const playPauseHandler = () => {
    setIsPlaying((prev) => !prev)
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

  const onVideoClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (showVideoControls) {
      setShowVideoControls(false)
    } else {
      setShowVideoControls(true)
    }
  }
  return {
    isPlaying,
  }
}

export const Video = ({ src, duration, isVideo, thumbnail, inView }: VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [placeholder, setPlaceholder] = useState<string | null>(null)
  const [showVideoControls, setShowVideoControls] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isVideo) {
      const index = Math.floor(Math.random() * 40)
      setPlaceholder(placeholderGifs[index].url)
    }
  }, [isVideo])

  // useEffect(() => {
  //   if (src && videoRef.current) {
  //     videoRef.current.src = src
  //     videoRef.current.load()
  //   }
  // }, [src])

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }, [isPlaying])

  const playPauseHandler = () => {
    setIsPlaying((prev) => !prev)
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

  const onVideoClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    if (showVideoControls) {
      setShowVideoControls(false)
    } else {
      setShowVideoControls(true)
    }
  }

  return (
    <div className="song-post__video--container" style={!isVideo ? { backgroundImage: `url(${placeholder})` } : {}}>
      {isVideo && inView === true && (
        <video
          src={src}
          ref={videoRef}
          className="video-pane-video"
          style={{ objectFit: placeholder ? "contain" : "cover" }}
          poster={thumbnail}
          loop
          playsInline
        />
      )}

      <VideoControls showControls={showVideoControls} onVideoClick={(event) => onVideoClickHandler(event)}>
        <PlayPauseButtonWrapper isPlaying={isPlaying} onPlayPause={playPauseHandler} />
        <FullscreenButton toggleFullscreen={toggleFullScreen} />
        <MediaProgressBar duration={duration} videoRef={videoRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </VideoControls>
    </div>
  )
}
