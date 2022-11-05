import { ReactNode, useCallback, useLayoutEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { PlayButton } from "src/components/buttons/PlayButton"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import useFormatDate from "src/hooks/useFormatDate"
import { fourDigitNumberHandler } from "src/utils/styleCalculators"
import { ISong } from "../../../../../../../server/src/models/Song"

type Props = {
  song: ISong
  lyrics: string[][]
  audio: string
  count: number
  isMe: boolean
  onClick: () => void
  buttonType: "Expand" | "Close"
  children?: ReactNode | undefined
}

const Photo = ({ onClick, children }: Pick<Props, "onClick" | "children">) => (
  <div className="profile-songs__user-photo">
    <div className="profile-songs__user-photo--bs-inset">
      <div className="profile-songs__user-photo--bs-inset-2">
        <button type="button" className="profile-songs__user-photo--wrapper" onClick={() => onClick()}>
          {children}
        </button>
      </div>
    </div>
  </div>
)

const DetailsTitle = ({ song, onClick }: Pick<Props, "song" | "onClick">) => {
  const { formatDate } = useFormatDate()
  return (
    <button className="profile-songs__title" type="button" onClick={() => onClick()}>
      <p className="profile-songs__text title">{song.title}</p>
      <p className="profile-songs__text user">
        {song.user.username} {String.fromCodePoint(8226)}{" "}
        <span className="profile-songs__text date">{formatDate(song?.createdOn, "m")}</span>
      </p>
    </button>
  )
}

const DetailsIcon = ({ count, children }: Pick<Props, "count" | "children">) => (
  <div className="profile-songs__social-data--container">
    <div className="profile-songs__social-data--bs-inset">
      <div className="profile-songs__social-data-number">
        <p className="profile-songs__number-text">{fourDigitNumberHandler(count)}</p>
      </div>
      {children}
    </div>
  </div>
)

const Details = ({ song, children }: Pick<Props, "song" | "children">) => (
  <div className="profile-songs__details">
    {children}
    <div className="profile-songs__song-info">
      <div className="profile-songs__caption--container">
        <p className="profile-songs__caption">{song.caption ? song.caption : "no caption for this flow"}</p>
      </div>
      <div className="profile-songs__social-data">
        <DetailsIcon count={song.likes.length}>
          <div className="profile-songs__social-data-icon Like">
            <Icon type={ButtonTypes.Like} options={{ color: "Primary" }} />
          </div>
        </DetailsIcon>

        <DetailsIcon count={song.comments.length}>
          <div className="profile-songs__social-data-icon Comment">
            <Icon type={ButtonTypes.Comment} options={{ color: "Primary", size: 70 }} />
          </div>
        </DetailsIcon>
      </div>
    </div>
  </div>
)

const PlayButtonWrapper = ({ audio, isMe }: Pick<Props, "audio" | "isMe">) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const deleteRef = useRef<HTMLDivElement>(null)
  const playRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!deleteRef.current || !playRef.current) return
    const deleteHeight = deleteRef.current.offsetHeight
    const playHeight = playRef.current.offsetHeight
    deleteRef.current.style.width = `${deleteHeight}px`
    playRef.current.style.width = `${playHeight}px`
  }, [])

  return (
    <div className="profile-songs__action-btns">
      <div className="profile-songs__action-btns--bs-inset">
        {isMe && (
          <div className="profile-songs__action-btn--container Delete" ref={deleteRef}>
            <div className="profile-songs__action-btn Delete">
              <RoundButton
                type={ButtonTypes.Delete}
                btnOptions={{ bgColor: BtnColorsEnum.Initial }}
                iconOptions={{ color: "White" }}
              />
            </div>
          </div>
        )}
        <div className="profile-songs__action-btn--container Play" ref={playRef}>
          <div className="profile-songs__action-btn Play">
            <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={audio} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Header = ({ children }: Pick<Props, "children">) => (
  <div className="profile-songs__header">
    <div className="profile-songs__header--shadow-outset">{children}</div>
  </div>
)

const LyricItem = ({ line, index }: { line: string[]; index: number }) => (
  <li className="profile-songs__lyrics-line" key={`${line}lyrics${index}`}>
    <p className="profile-songs__lyrics-line-text no">{index + 1}</p>
    {line.map((lyric, i) => {
      return (
        <p key={`${i}_${lyric}`} className="profile-songs__lyrics-line-text line">
          {lyric}
        </p>
      )
    })}
  </li>
)

export const LyricsBox = ({
  buttonType,
  lyrics,
  isMe,
  onClick,
}: Pick<Props, "buttonType" | "lyrics" | "isMe" | "onClick">) => {
  return (
    <div
      className={`profile-songs__lyrics ${buttonType !== "Expand" ? "Expanded" : ""}`}
      style={buttonType !== "Expand" ? { width: "97%" } : { width: isMe ? "85%" : "stretch" }}
    >
      <div className="profile-songs__lyrics--bs-outset">
        <div className="profile-songs__lyrics--wrapper">
          <div className="profile-songs__lyrics-title">
            <p className="profile-songs__title-text">Lyrics</p>
          </div>

          <div className="profile-songs__lyrics-text">
            <ul className="profile-songs__lyrics-list">
              {lyrics.map((lyric, index) => (
                <LyricItem key={`${lyric}_${index}`} line={lyric} index={index} />
              ))}
            </ul>
          </div>
        </div>

        <div className="profile-songs__lyrics-expand">
          <div className="profile-songs__lyrics-expand-btn">
            <RoundButton
              type={ButtonTypes[buttonType]}
              btnOptions={{
                inset: [true, "4px"],
                offset: 8,
                bgColor: BtnColorsEnum.Initial,
                alignment: ["flex-end", 0],
              }}
              iconOptions={{ color: "Primary", size: 80 }}
              onClick={() => onClick()}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ItemBody({ song, isMe, children }: Pick<Props, "song" | "isMe" | "children">) {
  const navigate = useNavigate()

  const navigateCallback = useCallback((location: "Profile" | "SongPage" | "EditLyrics") => {
    switch (location) {
      case "Profile":
        navigate(`/profile/${song.user._id}`)
        break
      case "SongPage":
        navigate(`/songScreen/${song._id}`)
        break
      case "EditLyrics":
        navigate(`/editLyrics`, { state: { currentSong: song } })
        break
      default:
        return
    }
  }, [])

  return (
    <div className="profile-songs__body">
      <Header>
        <Photo onClick={() => navigateCallback("Profile")}>
          <UserPhoto photoUrl={song.user.picture} username={song.user.username} />
        </Photo>
        <Details song={song}>
          <DetailsTitle song={song} onClick={() => navigateCallback("SongPage")} />
        </Details>
        <PlayButtonWrapper audio={song.audio} isMe={isMe} />
      </Header>

      <div className="profile-songs__lyrics--container">
        {children}
        {isMe && (
          <div className="profile-songs__lyrics-edit">
            <RoundButton
              type={ButtonTypes.Edit}
              btnOptions={{ offset: 11, bgColor: BtnColorsEnum.Primary, alignment: ["flex-end", 0.4] }}
              iconOptions={{ color: "White", size: 75 }}
              onClick={() => navigateCallback("EditLyrics")}
            />
          </div>
        )}
      </div>
    </div>
  )
}
