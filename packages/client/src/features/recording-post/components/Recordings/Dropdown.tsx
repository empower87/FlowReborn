import { Dispatch, ReactNode, SetStateAction, useState } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { SelectMenu } from "src/components/modals/SelectMenu/SelectMenu"
import { ISongTake } from "src/features/recording-booth/utils/types"

type DropdownProps = {
  takes: ISongTake[]
  take: ISongTake
  setTake: Dispatch<SetStateAction<ISongTake | undefined>>
  children?: ReactNode
}

const Dropdown = ({ takes, take, setTake, children }: DropdownProps) => {
  const [showSelectSongMenu, setShowSelectSongMenu] = useState<boolean>(false)

  const handleShowMenu = () => {
    if (takes.length <= 1) return
    setShowSelectSongMenu(true)
  }

  return (
    <div className="record__recordings-title">
      <SelectMenu
        position={["bottom", 45]}
        maxHeight={96 - 25}
        list={takes}
        listKey={["_id", "_id"]}
        currentItem={take}
        setCurrentItem={setTake}
        isOpen={showSelectSongMenu}
        onClose={setShowSelectSongMenu}
      />
      <div className="record__recordings-select--bs-outset">
        {takes.length === 0 ? (
          <p className="record__no-takes-text">No Recorded Takes</p>
        ) : (
          <>
            <div className="record__select-title">{children}</div>
            {takes.length > 1 && (
              <div className="record__select-dropdown">
                <button className="record__select-dropdown-btn" type="button" onClick={handleShowMenu}>
                  <div className="record__select-take-number">{take._id}</div>
                  <Icon type={showSelectSongMenu ? ButtonTypes.Up : ButtonTypes.Down} options={{ color: "Primary" }} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
export default Dropdown
