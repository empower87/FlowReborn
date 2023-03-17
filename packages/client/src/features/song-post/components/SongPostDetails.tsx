import { Link } from "react-router-dom"
import MarqueeText from "src/components/text/MarqueeText"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import useFormatDate from "src/hooks/useFormatDate"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"

const PRIMARY_COLOR_400 = "#e24f8c"
const BASE_COLOR = "#ffffff"

export const UserPhotoContainer = ({ song }: { song: ISong }) => {
  const user = song?.user
  return (
    <div className="user-pic-container">
      <div className="user-pic_shadow-div-outset">
        <Link to={`/profile/${user?._id}`} state={{ propSongUser: user }} className="user-pic_shadow-div-inset">
          <div
            className="user-pic_wrapper"
            style={{
              border: `2px solid ${user?.picture ? PRIMARY_COLOR_400 : BASE_COLOR}`,
            }}
          >
            <UserPhoto photoUrl={user?.picture} username={user?.username} />
          </div>
        </Link>
      </div>
    </div>
  )
}

const SongTitle = ({ song }: { song: ISong }) => {
  return (
    <div className="song-title_shadow-div-inset">
      <div className="song-title_title--container">
        <MarqueeText
          text={
            <>
              {song?.title} {String.fromCodePoint(8226)} <span>{song?.user?.username}</span>
            </>
          }
        />
      </div>
    </div>
  )
}

const SongCaption = ({ song }: { song: ISong }) => {
  const { formatDate } = useFormatDate()
  return (
    <div className="song-caption--container">
      <p className="song-caption__text date">{formatDate(new Date(song.createdOn), "m")}</p>
      <p className="song-caption__text bullet">{String.fromCodePoint(8226)}</p>
      <p className="song-caption__text caption">{song?.caption ? `${song.caption}` : "no caption for this song"}</p>
    </div>
  )
}

export default function SongPostDetails({ song }: { song: ISong }) {
  return (
    <div className="song-user-section">
      <div className="song-user-container">
        <UserPhotoContainer song={song} />

        <div className="song-title-container">
          <div className="song-title_shadow-div-outset">
            <SongTitle song={song} />
            <SongCaption song={song} />
          </div>
        </div>
      </div>
    </div>
  )
}
