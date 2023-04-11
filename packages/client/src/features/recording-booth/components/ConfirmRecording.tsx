import { Outlet, useNavigate } from "react-router-dom"
import { useSongDraftsContext } from "../hooks/useSongDrafts"
import { ActionButton } from "./RecordInteractions/ActionButtons"

export default function ConfirmRecording() {
  const { allDrafts, currentDraft } = useSongDraftsContext()
  const navigate = useNavigate()

  const onClose = () => {
    navigate("/recording-booth")
  }

  const navigateToPostRecording = () => {
    // going to have to add a isVideo boolean to SongModel which will take a lot of refactoring,
    // so I've hardcoded recordingType that needs to be passed to PostRecording
    navigate("post-recording", {
      state: {
        currentDraft: currentDraft,
        allDrafts: allDrafts,
        recordingType: "video",
      },
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
      <video src={currentDraft?.src} className="fullscreen-video__video" autoPlay loop playsInline />
    </div>
  )
}
