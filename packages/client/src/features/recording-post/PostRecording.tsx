import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
// import InputError from "src/components/errors/InputError"
import LoadingSpinner from "src/components/loading/LoadingSpinner"
import TitleBar, { TitleBarButton } from "src/components/ui/TitleBar"
import Video from "src/components/ui/Video"
import { useSongDraftsContext } from "../recording-booth/hooks/useSongDrafts"
import LyricsMenu from "./components/LyricsMenu"
import Recordings, { Form } from "./components/Recordings/Recordings"
import { ThumbnailSelector } from "./components/Thumbnail"
// import { INITIAL_ERROR_STATE, useSongForm } from "./hooks/useSongForm"

const Header = () => {
  const navigate = useNavigate()
  const onClose = () => navigate("/recording-booth/confirm-recording")

  return (
    <div className="recording__header--container">
      <TitleBar
        title={<p className="recording__title">Post</p>}
        leftButton={<TitleBarButton type="Back" onClick={() => onClose()} />}
      />
    </div>
  )
}

type SaveButtonProps = {
  type: "Post" | "Draft"
  isSaving: boolean
}

const SaveButton = ({ type, isSaving }: SaveButtonProps) => {
  return (
    <div className={`post-recording__action-btn ${type}`}>
      <button
        className={`post-recording__action-btn--bs-outset ${type}`}
        type="submit"
        form="post-song-form"
        onClick={() => console.log(`Saving as ${type}`)}
      >
        {isSaving ? (
          <div className="post-recording__action-btn-saving">
            <LoadingSpinner />
            <p>Saving...</p>
          </div>
        ) : (
          <p>{type}</p>
        )}
      </button>
    </div>
  )
}

const RecordingForm = ({ recordingType }: { recordingType: "audio" | "video" }) => {
  const [saving, setSaving] = useState<boolean>(false)
  // const { handleSaveSong, methods, isSaving, error, setError } = useSongForm(recordingType)

  return (
    <div className="post-recording__bottom-menu">
      <div className="record__recordings--container">
        <Recordings>
          <Form recordingType={recordingType} setSaving={setSaving} />
        </Recordings>
      </div>

      <div className="post-recording__bottom-menu-btns">
        <div className="post-recording__bottom-menu-btns--bs-inset">
          <SaveButton type="Draft" isSaving={saving} />
          <SaveButton type="Post" isSaving={saving} />
        </div>
      </div>
    </div>
  )
}

export default function PostRecording() {
  const { currentDraft } = useSongDraftsContext()
  const recordingType = currentDraft?.isVideo ? "video" : "audio"

  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="post-recording">
      <Header />

      <div className="post-recording__video-frame">
        <div className="post-recording__video-menu">
          {recordingType === "video" && <ThumbnailSelector />}
          <LyricsMenu />
        </div>

        <div id="lyrics-panel-root" className="post-recording__video">
          <Video src={currentDraft?.src} />
          {/* <video id={currentDraft?.src} className="record__video" src={currentDraft?.src} ref={videoRef} />
          <div className="post-recording__playback">
            {currentDraft && <MediaPlayback take={currentDraft} videoRef={videoRef} />}
          </div> */}
        </div>
      </div>

      <RecordingForm recordingType={recordingType} />
    </div>
  )
}
