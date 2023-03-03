import { useNavigate } from "react-router-dom"
import { Icon } from "src/components/buttons/Icon/Icon"
import MarqueeText from "src/components/text/MarqueeText"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"

type Props = {
  song: ISong
  songs: ISong[]
}

interface HeaderProps extends Props {
  isVideoFullscreen: boolean
}

const ExitButton = () => {
  const navigate = useNavigate()
  const onClose = () => {
    navigate(-1)
  }
  return (
    <div className="songscreen__exit--container">
      <button className="songscreen__exit-btn" onClick={() => onClose()}>
        <div className="songscreen__exit-btn--shadow-inset">
          <Icon type="Back" options={{ color: "Primary", size: 70 }} />
        </div>
      </button>
    </div>
  )
}

const SongTitle = ({ song, songs }: Props) => {
  const getSongIndex = (array: ISong[], current: string): number => {
    let getIndex: number = 0
    array.forEach((each, index) => {
      if (each?._id === current) {
        getIndex = index + 1
      }
    })
    return getIndex
  }

  return (
    <div className="songscreen__title--container">
      <div className="songscreen__title">
        <MarqueeText
          text={`${song.user.username}'s Songs`}
          wrapperStyles={["75%", "77%", "0.2em 0.2em 0.2em 2em"]}
          textStyles={["0.85rem", "white", "0.5em"]}
        />
        <p className="songscreen__song-index">
          <span>{getSongIndex(songs, song._id)}</span>
          of {songs?.length}
        </p>
      </div>
    </div>
  )
}

export default function Header({ song, songs, isVideoFullscreen }: HeaderProps) {
  return (
    <div className="songscreen__header--container" style={{ visibility: isVideoFullscreen ? "hidden" : "visible" }}>
      <ExitButton />
      <SongTitle song={song} songs={songs} />
    </div>
  )
}
