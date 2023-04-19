import { ReactNode, useState } from "react"
import ReactDOM from "react-dom"
import { useNavigate } from "react-router-dom"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { useSongDraftsContext } from "src/features/recording-booth/hooks/useSongDrafts"

const TEST_LYRICS = [
  ["And I'd take probation"],
  ["I don't want that T.I. and Vick vacation"],
  ["Private plane, pick location"],
  ["I'm goin' to the bank to make a big donation"],
  ["Yeah, I don't stunt, I stunt hard"],
  ["And if the food ain't on the stove I hunt for it"],
  ["But in the meantime"],
  ["You can call me young Roy Jones Jr. fightin' the drugs and gun charge"],
  ["Shit, don't leave me unguarded"],
  ["And I'm a cheesehead, word to Vince Lombardi"],
  ["Word to Marky Mark, leave a snitch departed"],
  ["All that blood like the Red Sea parted"],
  ["Red light on it like it's recording"],
  ["I ain't recordin',"],
  ["I'm just C-4in'"],
  ["My currency foreign;"],
  ["We are in a league they aren't"],
  ["Better dig in your pocket and pay homage"],
  ["Better cover your eyes,"],
  ["Your face fallin'"],
  ["Watch the game from the side,"],
  ["I'm play callin'"],
]

const LyricsHeaderButton = ({ type, onClick }: { type: "Expand" | "Down" | "Close"; onClick: () => void }) => {
  return (
    <div className="post-recording__lyrics-header-btn">
      <RoundButton
        type={type}
        btnOptions={{ bgColor: BtnColorsEnum.Primary }}
        iconOptions={{ color: "White", size: 70 }}
        onClick={() => onClick()}
      />
    </div>
  )
}

const LyricsModalHeader = ({ expand, close }: { expand: ReactNode; close: ReactNode }) => {
  return (
    <div className="post-recording__lyrics-header">
      {expand}
      <div className="post-recording__lyrics-header-title">
        <p className="post-recording__lyrics-header-title-text">Lyrics</p>
      </div>
      {close}
    </div>
  )
}

const LyricsModal = ({
  isOpen,
  onClose,
  lyrics,
}: {
  isOpen: boolean
  onClose: () => void
  lyrics: string[][] | undefined
}) => {
  const root = document.getElementById("lyrics-panel-root")!
  const hasLyrics = lyrics && lyrics.length ? true : false
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  const type = isExpanded ? "Down" : "Expand"
  const expandHandler = () => {
    setIsExpanded((prev) => !prev)
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className={`post-recording__lyrics ${isExpanded ? "LyricsExpanded" : ""}`}>
      <div className="post-recording__lyrics--bs-outset">
        <LyricsModalHeader
          expand={hasLyrics && <LyricsHeaderButton type={type} onClick={expandHandler} />}
          close={<LyricsHeaderButton type="Close" onClick={onClose} />}
        />

        <div className="post-recording__lyrics--wrapper">
          {lyrics?.length ? (
            lyrics.map((lyric) => {
              return <p>{lyric}</p>
            })
          ) : (
            <p>No lyrics available</p>
          )}
        </div>
      </div>
    </div>,
    root
  )
}

const LyricsMenuButton = ({ type, onClick }: { type: "Edit" | "Show"; onClick: () => void }) => {
  return (
    <div className="post-recording__menu-add-btn">
      <div className={`post-recording__menu-add-btn--bs-inset ${type}-Lyrics`}>
        <button className="post-recording__menu-add-btn--bs-outset" onClick={() => onClick()}>
          {type} Lyrics
        </button>
      </div>
    </div>
  )
}

export default function LyricsMenu() {
  const { allDrafts, currentDraft } = useSongDraftsContext()

  const navigate = useNavigate()
  const [showLyrics, setShowLyrics] = useState<boolean>(false)
  const navigateToEditLyrics = () => {
    navigate("/editLyrics", {
      state: {
        allSongs: allDrafts,
        currentSong: currentDraft,
      },
    })
  }

  return (
    <>
      <LyricsModal isOpen={showLyrics} lyrics={TEST_LYRICS} onClose={() => setShowLyrics(false)} />

      <div className="post-recording__menu-lyrics">
        <div className="post-recording__menu-lyrics-header">
          <div className="post-recording__menu-lyrics-header--bs-outset">Lyrics</div>
        </div>
        <LyricsMenuButton type="Show" onClick={() => setShowLyrics(true)} />
        <LyricsMenuButton type="Edit" onClick={() => navigateToEditLyrics()} />
      </div>
    </>
  )
}
