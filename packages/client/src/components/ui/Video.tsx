import React, { useRef, useState } from "react"

type VideoProps = {
  src: string | undefined
}

const Video: React.FC<VideoProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
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

  return (
    <div className="video-container">
      <video src={src} ref={videoRef} onClick={togglePlay} className="video" />
      <div className="video-controls">
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={toggleFullScreen}>{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</button>
      </div>
    </div>
  )
}

export default Video
