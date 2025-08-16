import { useState } from "react"
// import InputError from "src/components/errors/InputError"
import LoadingSpinner from "src/components/loading/LoadingSpinner"
import { Video } from "src/features/video/Video"
import Header from "../recording-booth/components/Header"
import { useSongDraftsContext } from "../recording-booth/hooks/useSongDrafts"
import LyricsMenu from "./components/LyricsMenu"
import Recordings, { Form } from "./components/Recordings/Recordings"
import { ThumbnailSelector } from "./components/Thumbnail"

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

  const isVideo = typeof currentDraft?.isVideo !== "undefined" && currentDraft.isVideo === true ? true : false
  return (
    <div className="post-recording">
      <Header title={"Post"} />

      <div className="post-recording__video-frame">
        <div className="post-recording__video-menu">
          {recordingType === "video" ? <ThumbnailSelector /> : null}
          <LyricsMenu />
        </div>

        <div id="lyrics-panel-root" className="post-recording__video">
          <Video
            src={currentDraft?.src}
            isVideo={isVideo}
            duration={currentDraft ? currentDraft.duration : 0}
            thumbnail={currentDraft?.thumbnail}
            inView={true}
          />
        </div>
      </div>

      <RecordingForm recordingType={recordingType} />
    </div>
  )
}
