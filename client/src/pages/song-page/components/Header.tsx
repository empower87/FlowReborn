import { useLayoutEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
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

export const SongTitle = ({ song, songs }: HeaderProps) => {
  const [isMarquee, setIsMarquee] = useState<boolean>(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const getSongIndex = (array: ISong[], current: ISong): number => {
    let getIndex: number = 0
    array.forEach((each, index) => {
      if (each?._id === current?._id) {
        getIndex = index + 1
      }
    })
    return getIndex
  }

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
    <>
      <div className={`marquee-wrapper ${isMarquee ? "marquee--animation" : ""}`} ref={wrapperRef}>
        <p
          className="songscreen__song-title"
          id="marquee-one"
          ref={titleRef}
          style={isMarquee ? {} : { paddingLeft: "6%" }}
        >
          {song?.title}
        </p>
        {isMarquee && (
          <p className="songscreen__song-title" id="marquee-two">
            {song?.title}
          </p>
        )}
      </div>
      <p className="songscreen__song-index">
        <span>{getSongIndex(songs, song)}</span>
        of {songs?.length}
      </p>
    </>
  )
}

export const SongInfo = ({ song }: Pick<HeaderProps, "song">) => {
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
                  <div className="songscreen__song-title--shadow-inset">
                    <SongTitle song={song} songs={songs} />
                  </div>
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
