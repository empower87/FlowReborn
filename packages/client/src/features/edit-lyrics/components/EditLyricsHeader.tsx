import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "src/components/buttons/Icon/Icon"
import { SelectMenu } from "src/components/modals/SelectMenu/SelectMenu"
import MarqueeText from "src/components/text/MarqueeText"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { ISongTake } from "src/features/recording-booth/utils/types"
// import { ISong } from "../../../../../server/src/models"
import { ISongPopulatedUser as ISong } from "src/types/ServerModelTypes"

type EditLyricsHeaderProps = {
  currentSong: ISong | ISongTake
  setCurrentSong: Dispatch<SetStateAction<ISong | ISongTake>>
  allSongs: ISong[] | (ISong | ISongTake)[]
}

const Title = () => {
  const { user } = useAuth()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return
    const getWidth = wrapperRef.current.offsetHeight
    wrapperRef.current.style.width = `${getWidth}px`
  }, [wrapperRef.current])

  return (
    <div className="edit-lyrics__title--container">
      <div className="edit-lyrics__title--shadow-outset">
        <div className="edit-lyrics__profile-pic" ref={wrapperRef}>
          <div className="edit-lyrics__profile-pic--bs-inset">
            <div className="edit-lyrics__profile-pic--wrapper">
              <UserPhoto photoUrl={user?.picture} username={user ? user.username : "U"} />
            </div>
          </div>
        </div>
        <p className="edit-lyrics__title">Edit Your Lyrics</p>
      </div>
    </div>
  )
}

export default function EditLyricsHeader({ currentSong, setCurrentSong, allSongs }: EditLyricsHeaderProps) {
  const [showSelectSongMenu, setShowSelectSongMenu] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div className="edit-lyrics__header">
      <SelectMenu
        position={["top", 6]}
        maxHeight={96 - 6}
        list={allSongs}
        listKey={["_id", "title"]}
        currentItem={currentSong}
        setCurrentItem={setCurrentSong}
        isOpen={showSelectSongMenu}
        onClose={setShowSelectSongMenu}
      />
      <div className="edit-lyrics__header--shadow-inset">
        <div className="edit-lyrics__exit--container">
          <button className="edit-lyrics__exit-btn" onClick={() => navigate(-1)}>
            <Icon type="Back" options={{ color: "White" }} />
          </button>
        </div>
        <Title />

        <div className="edit-lyrics__select-song">
          <div className="edit-lyrics__select-song--shadow-outset">
            <div className="edit-lyrics__select-song--shadow-inset">
              <button className="edit-lyrics__select-song-btn" onClick={() => setShowSelectSongMenu(true)}>
                <MarqueeText
                  text={currentSong.title}
                  wrapperStyles={["70%", "94%", "2em"]}
                  textStyles={["0.75rem", "white", "5%"]}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
