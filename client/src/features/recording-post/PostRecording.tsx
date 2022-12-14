import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import InputError from "src/components/errors/InputError"
import LoadingSpinner from "src/components/loading/LoadingSpinner"
import Header from "src/features/recording-booth/components/Header"
import { ISongTake } from "src/features/recording-booth/utils/types"
import Recordings from "../../features/recording-post/components/Recordings/Recordings"
import LyricsMenu from "./components/LyricsMenu"
import LyricsPanel from "./components/LyricsPanel"
import MediaPlayback from "./components/MediaPlayback"
import { ThumbnailSelector } from "./components/Thumbnail"
import { INITIAL_ERROR_STATE, useSongForm } from "./hooks/useSongForm"

type PostRecordingProps = {
  currentTake: ISongTake | undefined
  songTakes: ISongTake[]
  recordingType: "audio" | "video"
}

export default function PostRecording() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location.state as PostRecordingProps
  const { currentTake: take, songTakes: takes, recordingType } = data
  const { handleSaveSong, methods, isSaving, error, setError } = useSongForm(recordingType)
  const [showLyrics, setShowLyrics] = useState<boolean>(false)
  const [currentTake, setCurrentTake] = useState<ISongTake>()
  const [songTakes, setSongTakes] = useState<ISongTake[]>([])

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setCurrentTake(take)
    setSongTakes(takes)
  }, [take, takes])

  const onClose = () => {
    navigate(-1)
  }

  const deleteTake = (_id: string) => {
    let filteredTakes = takes.filter((take) => take._id !== currentTake?._id)
    setSongTakes(filteredTakes)
    setCurrentTake(filteredTakes[0])
  }

  return (
    <div className="post-recording">
      <InputError
        isOpen={error.showError}
        onClose={() => setError(INITIAL_ERROR_STATE)}
        message={error.message}
        options={{ position: [6, 27], size: [40, 72] }}
      />
      <Header type="Back" opacity="1" onClose={() => onClose()} title={<p className="recording__title">Post</p>} />
      <div className="post-recording__video-frame">
        <div className="post-recording__video-menu">
          {currentTake && currentTake.thumbnailBlob ? (
            <ThumbnailSelector currentTake={currentTake} setCurrentTake={setCurrentTake} />
          ) : (
            <></>
          )}
          <LyricsMenu setShowLyrics={setShowLyrics} songTakes={songTakes} currentTake={currentTake} />
        </div>

        <div className="post-recording__video">
          <LyricsPanel isOpen={showLyrics} />
          <video id={currentTake?.audio} className="record__video" src={currentTake?.audio} ref={videoRef} />
          <div className="post-recording__playback">{currentTake && <MediaPlayback take={currentTake} />}</div>
        </div>
      </div>

      <div className="post-recording__bottom-menu">
        <div className="record__recordings--container">
          {currentTake && (
            <Recordings
              take={currentTake}
              setTake={setCurrentTake}
              takes={songTakes}
              deleteTake={deleteTake}
              methods={methods}
              onSubmit={handleSaveSong}
            />
          )}
        </div>

        <div className="post-recording__bottom-menu-btns">
          <div className="post-recording__bottom-menu-btns--bs-inset">
            {/* <div className="post-recording__save-btn">
              <button className="post-recording__save-btn--bs-outset Draft">Save As Draft</button>
            </div> */}
            <div className="post-recording__save-btn">
              <button
                className="post-recording__save-btn--bs-outset Post"
                type="submit"
                form="post-song-form"
                onClick={() => console.log("clicked")}
              >
                {isSaving ? (
                  <div className="post-recording__save-btn-saving">
                    <LoadingSpinner />
                    <p>Saving...</p>
                  </div>
                ) : (
                  <p>Save</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
