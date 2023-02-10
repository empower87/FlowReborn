import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import { ISongTake } from "src/features/recording-booth/utils/types"

type LyricsMenuProps = {
  setShowLyrics: Dispatch<SetStateAction<boolean>>
  songTakes: ISongTake[]
  currentTake: ISongTake | undefined
}

export default function LyricsMenu({ setShowLyrics, songTakes, currentTake }: LyricsMenuProps) {
  const navigate = useNavigate()

  const navigateToEditLyrics = () => {
    navigate("/editLyrics", {
      state: {
        allSongs: songTakes,
        currentSong: currentTake,
      },
    })
  }

  return (
    <div className="post-recording__menu-lyrics">
      <div className="post-recording__menu-lyrics-header">
        <div className="post-recording__menu-lyrics-header--bs-outset">Lyrics</div>
      </div>
      <div className="post-recording__menu-add-btn">
        <div className="post-recording__menu-add-btn--bs-inset Show-Lyrics">
          <button className="post-recording__menu-add-btn--bs-outset" onClick={() => setShowLyrics((prev) => !prev)}>
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
  )
}
