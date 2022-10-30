import { Dispatch, SetStateAction, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { SelectMenu } from "src/components/modals/SelectMenu/SelectMenu"
import { useAuth } from "src/context/AuthContext"
import { ISongTake } from "src/features/recording-booth/utils/types"
import { ISong } from "../../../../../server/src/models"

type EditLyricsHeaderProps = {
  currentSong: ISong | ISongTake
  setCurrentSong: Dispatch<SetStateAction<ISong | ISongTake>>
  allSongs: ISong[] | (ISong | ISongTake)[]
}

export default function EditLyricsHeader({ currentSong, setCurrentSong, allSongs }: EditLyricsHeaderProps) {
  const { user } = useAuth()
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
            <Icon type={ButtonTypes.Back} options={{ color: "White" }} />
          </button>
        </div>
        <div className="edit-lyrics__title--container">
          <div className="edit-lyrics__title--shadow-outset">
            <p className="edit-lyrics__title">Edit Your Lyrics</p>
            <p className="edit-lyrics__title name">{user?.username}</p>
          </div>
        </div>

        <div className="edit-lyrics__select-song">
          <div className="edit-lyrics__select-song--shadow-outset">
            <div className="edit-lyrics__select-song--shadow-inset">
              <button className="edit-lyrics__select-song-btn" onClick={() => setShowSelectSongMenu(true)}>
                <p className="edit-lyrics__select-song-text">{currentSong?.title}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
