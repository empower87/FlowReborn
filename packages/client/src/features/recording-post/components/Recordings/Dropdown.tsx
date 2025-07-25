import { ReactNode, useState } from "react"
import { Icon } from "src/components/buttons/Icon/Icon"
import { SelectMenu } from "src/components/modals/SelectMenu/SelectMenu"
import { useSongDraftsContext } from "src/features/recording-booth/hooks/useSongDrafts"

type DropdownProps = {
  children?: ReactNode
}

const Dropdown = ({ children }: DropdownProps) => {
  const [showSelectSongMenu, setShowSelectSongMenu] = useState<boolean>(false)
  const { allDrafts, currentDraft, setCurrentDraft } = useSongDraftsContext()

  const handleShowMenu = () => {
    if (allDrafts.length <= 1) return
    setShowSelectSongMenu(true)
  }

  return (
    <div className="record__recordings-title">
      <SelectMenu
        position={["bottom", 45]}
        maxHeight={96 - 25}
        list={allDrafts}
        listKey={["_id", "_id"]}
        currentItem={currentDraft}
        setCurrentItem={setCurrentDraft}
        isOpen={showSelectSongMenu}
        onClose={setShowSelectSongMenu}
      />
      <div className="record__recordings-select--bs-outset">
        {allDrafts.length === 0 ? (
          <p className="record__no-takes-text">No Recorded Takes</p>
        ) : (
          <>
            <div className="record__select-title">{children}</div>
            {allDrafts.length > 1 && (
              <div className="record__select-dropdown">
                <button className="record__select-dropdown-btn" type="button" onClick={handleShowMenu}>
                  <div className="record__select-take-number">{currentDraft?._id}</div>
                  <Icon type={showSelectSongMenu ? "Up" : "Down"} options={{ color: "Primary" }} />
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
