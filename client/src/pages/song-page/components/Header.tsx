import { useNavigate } from "react-router-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import MarqueeText from "src/components/text/MarqueeText"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import useFormatDate from "src/hooks/useFormatDate"
import { ISong } from "../../../../../server/src/models"

type HeaderProps = {
  song: ISong
  songs: ISong[]
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
          <Icon type={ButtonTypes.Back} options={{ color: "Primary" }} />
        </div>
      </button>
    </div>
  )
}

const Photo = ({ photoUrl, username }: { photoUrl: string | undefined; username: string }) => {
  return (
    <div className="songscreen__photo--container">
      <div className="songscreen__photo--shadow-inset">
        <div className="songscreen__photo--shadow-outset">
          <UserPhoto photoUrl={photoUrl} username={username} />
        </div>
      </div>
    </div>
  )
}

const SongTitle = ({ song, songs }: HeaderProps) => {
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
    <div className="songscreen__song-title--shadow-inset">
      <MarqueeText
        text={song?.title}
        wrapperStyles={["75%", "77%", "0.2em 0.2em 0.2em 2em"]}
        textStyles={["0.95rem", "white", "12%"]}
      />
      <p className="songscreen__song-index">
        <span>{getSongIndex(songs, song._id)}</span>
        of {songs?.length}
      </p>
    </div>
  )
}

const SongInfo = ({ song }: Pick<HeaderProps, "song">) => {
  const { formatDate } = useFormatDate()
  return (
    <div className="songscreen__song-data">
      <p>{song?.caption ? song?.caption : "No caption for this song"}</p>
      <p>
        by: <span> {song?.user?.username}</span>
      </p>
      <p>on: {formatDate(song?.createdOn, "MMMM_Dth_YYYY")}</p>
    </div>
  )
}

export default function Header({ song, songs }: HeaderProps) {
  return (
    <div className="songscreen__header--container">
      <div className="songscreen__header--shadow-outset">
        <div className="songscreen__header--shadow-inset">
          <ExitButton />
          <div className="songscreen__title--container">
            <div className="songscreen__title--shadow-inset">
              <Photo photoUrl={song.user?.picture} username={song.user?.username} />

              <div className="songscreen__song-data--container">
                <div className="songscreen__song-title--container">
                  <SongTitle song={song} songs={songs} />
                </div>

                <SongInfo song={song} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
