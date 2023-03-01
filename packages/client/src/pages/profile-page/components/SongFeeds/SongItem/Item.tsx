import { useCallback, useEffect, useRef, useState } from "react"
import { ISongPopulatedUser as ISong, IUser } from "src/types/ServerModelTypes"
import ItemBody, { LyricsBox } from "./ItemBody"

type SongItemProps = {
  song: ISong
  profileUser: IUser | undefined
}

export default function SongItem({ song, profileUser }: SongItemProps) {
  const [deleteCheck, setDeleteCheck] = useState(false)
  const [isMe, setIsMe] = useState<boolean>(false)
  const [lyricsExpanded, setLyricsExpanded] = useState<boolean>(false)

  const songListRef = useRef()

  useEffect(() => {
    if (profileUser?._id === song.user?._id) {
      setIsMe(true)
    }
  }, [profileUser, song])

  const setFocus = (e: React.MouseEvent<HTMLElement>) => {
    if (document.activeElement === e.currentTarget) {
      e.currentTarget.blur()
    } else {
      e.currentTarget.focus()
    }
  }

  const setSongRefs = useCallback((node: any) => {
    songListRef.current = node
  }, [])

  return (
    <li
      className={`profile-songs__item ${lyricsExpanded ? "Expanded" : ""}`}
      ref={setSongRefs}
      onClick={(e) => setFocus(e)}
    >
      {lyricsExpanded ? (
        <LyricsBox buttonType={"Close"} lyrics={song.lyrics} isMe={isMe} onClick={() => setLyricsExpanded(false)} />
      ) : (
        <ItemBody song={song} isMe={isMe}>
          <LyricsBox buttonType={"Expand"} lyrics={song.lyrics} isMe={isMe} onClick={() => setLyricsExpanded(true)} />
        </ItemBody>
      )}
    </li>
  )
}
