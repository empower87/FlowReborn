import { MutableRefObject, useEffect, useRef, useState } from "react"
import { PlayPauseButton } from "src/components/buttons/PlayButton"
import { MediaProgressBarWrapper } from "../song-post/components/VideoPlayer"

type VideoProps = {
  src: string | undefined
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

export const Video = ({ src, inView }: VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showPlayPauseButton, setShowPlayPauseButton] = useState(false)

  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const copyRef = (ref as MutableRefObject<HTMLVideoElement>).current
    if (src && (ref as MutableRefObject<HTMLVideoElement>).current) {
      copyRef.src = src
      copyRef.load()
    }
  }, [src])

  const playPauseHandler = () => {
    if ((ref as MutableRefObject<HTMLVideoElement>).current) {
      if (isPlaying) {
        ;(ref as MutableRefObject<HTMLVideoElement>).current.pause()
        setIsPlaying(false)
      } else {
        ;(ref as MutableRefObject<HTMLVideoElement>).current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleFullScreen = () => {
    if ((ref as MutableRefObject<HTMLVideoElement>).current) {
      if (!document.fullscreenElement) {
        ;(ref as MutableRefObject<HTMLVideoElement>).current.requestFullscreen()
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
      // style={{ backgroundImage: `url(${placeholder ? placeholder : ""})` }}
    >
      <video src={src} ref={ref} className="video-pane-video" />

      <div className="song-post__video-shadow-overlay" onClick={onVideoClickHandler}>
        {showPlayPauseButton && <PlayPauseButtonWrapper isPlaying={isPlaying} onPlayPause={playPauseHandler} />}

        <button onClick={toggleFullScreen}>{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</button>
        <MediaProgressBarWrapper duration={10} videoRef={ref} />
      </div>
    </div>
  )
}
// export const Video = forwardRef<HTMLVideoElement, VideoProps>(({ src, inView }, ref) => {
//   const [isPlaying, setIsPlaying] = useState(false)
//   const [isFullScreen, setIsFullScreen] = useState(false)
//   const [showPlayPauseButton, setShowPlayPauseButton] = useState(false)

//   useEffect(() => {
//     const copyRef = (ref as MutableRefObject<HTMLVideoElement>).current
//     if (src && (ref as MutableRefObject<HTMLVideoElement>).current) {
//       copyRef.src = src
//       copyRef.load()
//     }
//   }, [src])

//   const playPauseHandler = () => {
//     if ((ref as MutableRefObject<HTMLVideoElement>).current) {
//       if (isPlaying) {
//         ;(ref as MutableRefObject<HTMLVideoElement>).current.pause()
//         setIsPlaying(false)
//       } else {
//         ;(ref as MutableRefObject<HTMLVideoElement>).current.play()
//         setIsPlaying(true)
//       }
//     }
//   }

//   const toggleFullScreen = () => {
//     if ((ref as MutableRefObject<HTMLVideoElement>).current) {
//       if (!document.fullscreenElement) {
//         ;(ref as MutableRefObject<HTMLVideoElement>).current.requestFullscreen()
//       } else {
//         document.exitFullscreen()
//       }
//       setIsFullScreen(!isFullScreen)
//     }
//   }

//   const getVideoOrientation = (_src: string) => {
//     const video = document.createElement("video")
//     video.src = _src
//     return video.videoWidth > video.videoHeight ? "landscape" : "portrait"
//   }

//   const onVideoClickHandler = () => {
//     if (showPlayPauseButton) {
//       setShowPlayPauseButton(false)
//     } else {
//       setShowPlayPauseButton(true)
//     }
//   }

//   return (
//     <div
//       className="song-post__video--container"
//       // style={{ backgroundImage: `url(${placeholder ? placeholder : ""})` }}
//     >
//       <video src={src} ref={ref} className="video-pane-video" />

//       <div className="song-post__video-shadow-overlay" onClick={onVideoClickHandler}>
//         {showPlayPauseButton && <PlayPauseButtonWrapper isPlaying={isPlaying} onPlayPause={playPauseHandler} />}

//         <button onClick={toggleFullScreen}>{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</button>
//         <MediaProgressBarWrapper duration={10} videoRef={ref} />
//       </div>
//     </div>
//   )
// })
