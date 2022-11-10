import { Dispatch, SetStateAction, useState } from "react"
import ReactDOM from "react-dom"
import { useNavigate } from "react-router-dom"
import Header from "src/features/recording-booth/components/Header"
import { ISongTake } from "src/features/recording-booth/utils/types"
import Recordings from "../../features/recording-post/components/Recordings/Recordings"
import LyricsPanel from "./components/LyricsPanel"
import MediaPlayback from "./components/MediaPlayback"
import { ThumbnailSelector } from "./components/Thumbnail"
import { useSongForm } from "./hooks/useSongForm"

type PostRecordingProps = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  currentTake: ISongTake | undefined
  setCurrentTake: Dispatch<SetStateAction<ISongTake | undefined>>
  onDelete: (_id: string) => void
  songTakes: ISongTake[]
  recordingType: "audio" | "video"
}

export default function PostRecording({
  isOpen,
  onClose,
  currentTake,
  setCurrentTake,
  onDelete,
  songTakes,
  recordingType,
}: PostRecordingProps) {
  const root = document.getElementById("root")!
  const navigate = useNavigate()
  const { handleSaveSong, methods, setThumbnailBlob } = useSongForm(recordingType)
  const [showLyrics, setShowLyrics] = useState<boolean>(false)

  const navigateToEditLyrics = () => {
    navigate("/editLyrics", {
      state: {
        allSongs: songTakes,
        currentSong: currentTake,
      },
    })
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="post-recording">
      <Header
        type="Back"
        opacity="1"
        onClose={() => onClose(false)}
        title={<p className={`recording__title`}>Post</p>}
      />
      <div className="post-recording__video-frame">
        <div className="post-recording__video-menu">
          <ThumbnailSelector currentTake={currentTake} setCurrentTake={setCurrentTake} setThumbnailBlob={setThumbnailBlob} />
          <div className="post-recording__menu-lyrics">
            <div className="post-recording__menu-lyrics-header">
              <div className="post-recording__menu-lyrics-header--bs-outset">Lyrics</div>
            </div>
            <div className="post-recording__menu-add-btn">
              <div className="post-recording__menu-add-btn--bs-inset Show-Lyrics">
                <button
                  className="post-recording__menu-add-btn--bs-outset"
                  onClick={() => setShowLyrics((prev) => !prev)}
                >
                  Show Lyrics
                </button>
              </div>
            </div>
            <div className="post-recording__menu-add-btn">
              <div className="post-recording__menu-add-btn--bs-inset Edit-Lyrics">
                <button className="post-recording__menu-add-btn--bs-outset" onClick={navigateToEditLyrics}>
                  Edit Lyrics
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="post-recording__video">
          <LyricsPanel isOpen={showLyrics} />
          <video id="video-recorded" className="record__video" src={currentTake?.audio} />
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
              deleteTake={onDelete}
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
              <button className="post-recording__save-btn--bs-outset Post" type="submit" form="post-song-form">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    root
  )
}
