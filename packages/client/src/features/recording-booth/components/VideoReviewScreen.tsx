import { Dispatch, SetStateAction } from "react"
import ReactDOM from "react-dom"
import { useNavigate } from "react-router-dom"
import { useSongDraftsContext } from "../hooks/useSongDrafts"
import { ActionButton } from "./RecordInteractions/ActionButtons"

type VideoReviewScreenProps = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}

export default function VideoReviewScreen({ isOpen, onClose }: VideoReviewScreenProps) {
  const root = document.getElementById("root")!

  const { allDrafts, currentDraft } = useSongDraftsContext()
  const navigate = useNavigate()

  const navigateToPostRecording = () => {
    // going to have to add a isVideo boolean to SongModel which will take a lot of refactoring,
    // so I've hardcoded recordingType that needs to be passed to PostRecording
    navigate("/post-recording", {
      state: {
        currentDraft: currentDraft,
        allDrafts: allDrafts,
        recordingType: "video",
      },
    })
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="fullscreen-video">
      <div className="fullscreen-video__header">
        <div className="fullscreen-video__header-btns back">
          <ActionButton type="Back" onClick={() => onClose(false)} size={80} />
        </div>
        <div className="fullscreen-video__header-btns next">
          <ActionButton type="Forward" onClick={() => navigateToPostRecording()} />
        </div>
      </div>
      <video src={currentDraft?.audio} className="fullscreen-video__video" autoPlay loop playsInline></video>
    </div>,
    root
  )
}
