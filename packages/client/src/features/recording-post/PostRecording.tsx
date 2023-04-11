import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import InputError from "src/components/errors/InputError"
import LoadingSpinner from "src/components/loading/LoadingSpinner"
import TitleBar, { TitleBarButton } from "src/components/ui/TitleBar"
import { useSongDraftsContext } from "../recording-booth/hooks/useSongDrafts"
import LyricsMenu from "./components/LyricsMenu"
import LyricsPanel from "./components/LyricsPanel"
import MediaPlayback from "./components/MediaPlayback"
import Recordings from "./components/Recordings/Recordings"
import { ThumbnailSelector } from "./components/Thumbnail"
import { INITIAL_ERROR_STATE, useSongForm } from "./hooks/useSongForm"

const Header = () => {
  const navigate = useNavigate()
  const onClose = () => navigate(-1)

  return (
    <div className="recording__header--container">
      <TitleBar
        title={<p className="recording__title">Post</p>}
        leftButton={<TitleBarButton type="Back" onClick={() => onClose()} />}
      />
    </div>
  )
}

export default function PostRecording() {
  const { allDrafts, currentDraft, setCurrentDraft, deleteDraftHandler } = useSongDraftsContext()
  const recordingType = currentDraft?.isVideo ? "video" : "audio"

  const { handleSaveSong, methods, isSaving, error, setError } = useSongForm(recordingType)

  const [showLyrics, setShowLyrics] = useState<boolean>(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="post-recording">
      {error.showError && (
        <InputError
          isOpen={error.showError}
          onClose={() => setError(INITIAL_ERROR_STATE)}
          message={error.message}
          options={{ position: [6, 27], size: [40, 72] }}
        />
      )}

      <Header />

      <div className="post-recording__video-frame">
        <div className="post-recording__video-menu">
          {recordingType === "video" && <ThumbnailSelector />}
          <LyricsMenu setShowLyrics={setShowLyrics} songTakes={allDrafts} currentTake={currentDraft} />
        </div>

        <div className="post-recording__video">
          <LyricsPanel isOpen={showLyrics} />
          <video id={currentDraft?.src} className="record__video" src={currentDraft?.src} ref={videoRef} />
          <div className="post-recording__playback">
            {currentDraft && <MediaPlayback take={currentDraft} videoRef={videoRef} />}
          </div>
        </div>
      </div>

      <div className="post-recording__bottom-menu">
        <div className="record__recordings--container">
          {currentDraft && (
            <Recordings
              take={currentDraft}
              setTake={setCurrentDraft}
              takes={allDrafts}
              deleteTake={deleteDraftHandler}
              methods={methods}
              onSubmit={handleSaveSong}
            />
          )}
        </div>

        <div className="post-recording__bottom-menu-btns">
          <div className="post-recording__bottom-menu-btns--bs-inset">
            {/* TODO: add loading spinner and save functionality */}
            {/* <div className="post-recording__action-btn Draft">
              <button className="post-recording__action-btn--bs-outset Draft">
                <p>Save As Draft</p>
              </button>
            </div>

            <div className="post-recording__action-btn Post">
              <button
                className="post-recording__action-btn--bs-outset Post"
                type="submit"
                form="post-song-form"
                onClick={() => console.log("Saved")}
              >
                {isSaving ? (
                  <div className="post-recording__action-btn-saving">
                    <LoadingSpinner />
                    <p>Saving...</p>
                  </div>
                ) : (
                  <p>Save</p>
                )}
              </button>
            </div> */}
            <SaveButton type="Draft" isSaving={isSaving} />
            <SaveButton type="Post" isSaving={isSaving} />
          </div>
        </div>
      </div>
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
