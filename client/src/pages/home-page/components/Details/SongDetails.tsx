import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { LayoutTwo } from "src/components/layouts/LayoutWrappers"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import useFormatDate from "src/hooks/useFormatDate"
import { ISong } from "../../../../../../server/src/models/Song"

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
  const [isMarquee, setIsMarquee] = useState<boolean>(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!titleRef.current || !wrapperRef.current) throw Error("divRef is not assigned")
    let computedTitleWidth = window.getComputedStyle(titleRef?.current)
    let computedWrapperWidth = window.getComputedStyle(wrapperRef?.current)
    let titleWidth = parseInt(computedTitleWidth.getPropertyValue("width"))
    let wrapperWidth = parseInt(computedWrapperWidth.getPropertyValue("width"))

    if (titleWidth >= wrapperWidth) setIsMarquee(true)
    else setIsMarquee(false)
  }, [song])

  return (
    <div className="song-title_shadow-div-inset">
      <div className="song-title_title--container">
        <div className={`marquee-wrapper ${isMarquee ? "marquee--animation" : ""}`} ref={wrapperRef}>
          <p className="song-title-marquee" id="marquee-one" ref={titleRef}>
            {song?.title} {String.fromCodePoint(8226)} <span>{song?.user?.username}</span>
          </p>
          {isMarquee && (
            <p className="song-title-marquee" id="marquee-two">
              {song?.title} {String.fromCodePoint(8226)} <span>{song?.user?.username}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

const SongCaption = ({ song }: { song: ISong }) => {
  const { formatDate } = useFormatDate()
  return (
    <div className="song-caption--container">
      <p className="song-caption__text date">{formatDate(song.createdOn, "m")}</p>
      <p className="song-caption__text bullet">{String.fromCodePoint(8226)}</p>
      <p className="song-caption__text caption">{song?.caption ? `${song.caption}` : "no caption for this song"}</p>
    </div>
  )
}

export default function SongDetails({ song }: { song: ISong }) {
  return (
    <LayoutTwo classes={["song-user-section", "song-user-container"]}>
      <UserPhotoContainer song={song} />

      <LayoutTwo classes={["song-title-container", "song-title_shadow-div-outset"]}>
        <SongTitle song={song} />
        <SongCaption song={song} />
      </LayoutTwo>
    </LayoutTwo>
  )
}
