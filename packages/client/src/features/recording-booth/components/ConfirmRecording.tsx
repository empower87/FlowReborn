import { useEffect, useRef, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useSongDraftsContext } from "../hooks/useSongDrafts"
import { ActionButton } from "./RecordInteractions/ActionButtons"

export default function ConfirmRecording() {
  const { currentDraft } = useSongDraftsContext()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsPlaying(true)
  }, [])

  useEffect(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [isPlaying])

  const onClose = () => {
    navigate("/recording-booth")
  }

  const navigateToPostRecording = () => {
    navigate("/recording-booth/post-recording", {
      replace: true,
    })
  }

  return (
    <div className="fullscreen-video">
      <div className="fullscreen-video__header">
        <div className="fullscreen-video__header-btns back">
          <ActionButton type="Back" onClick={() => onClose()} size={80} />
        </div>
        <div className="fullscreen-video__header-btns next">
          <ActionButton type="Forward" onClick={() => navigateToPostRecording()} />
        </div>
      </div>
      <Outlet />
      <video src={currentDraft?.src} ref={videoRef} className="fullscreen-video__video" loop playsInline />
    </div>
  )
}
