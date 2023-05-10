import { Link } from "react-router-dom"
import MarqueeText from "src/components/text/MarqueeText"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import useFormatDate from "src/hooks/useFormatDate"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"

const PRIMARY_COLOR_400 = "#e24f8c"
const BASE_COLOR = "#ffffff"

export const UserPhotoContainer = ({
  userId,
  picture,
  username,
}: {
  userId: string
  picture: string | undefined
  username: string
}) => {
  return (
    <div className="user-pic-container">
      <div className="user-pic_shadow-div-outset">
        <Link to={`/profile/${userId}`} className="user-pic_shadow-div-inset">
          <div
            className="user-pic_wrapper"
            style={{
              border: `2px solid ${picture ? PRIMARY_COLOR_400 : BASE_COLOR}`,
            }}
          >
            <UserPhoto photoUrl={picture} username={username} />
          </div>
        </Link>
      </div>
    </div>
  )
}

const SongTitle = ({ title, username }: { title: string; username: string }) => {
  return (
    <div className="song-title_shadow-div-inset">
      <div className="song-title_title--container">
        <MarqueeText
          text={
            <>
              {title} {String.fromCodePoint(8226)} <span>{username}</span>
            </>
          }
        />
      </div>
    </div>
  )
}

const SongCaption = ({ createdOn, caption }: { createdOn: string; caption: string | undefined }) => {
  const { formatDate } = useFormatDate()
  return (
    <div className="song-caption--container">
      <p className="song-caption__text date">{formatDate(new Date(createdOn), "m")}</p>
      <p className="song-caption__text bullet">{String.fromCodePoint(8226)}</p>
      <p className="song-caption__text caption">{caption ? `${caption}` : "no caption for this song"}</p>
    </div>
  )
}

export default function SongPostDetails({ song }: { song: ISong }) {
  return (
    <div className="song-user-section">
      <div className="song-user-container">
        <UserPhotoContainer userId={song.user._id} picture={song.user.picture} username={song.user.username} />

        <div className="song-title-container">
          <div className="song-title_shadow-div-outset">
            <SongTitle title={song.title} username={song.user.username} />
            <SongCaption createdOn={song.createdOn} caption={song.caption} />
          </div>
        </div>
      </div>
    </div>
  )
}
