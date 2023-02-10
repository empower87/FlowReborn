import { Dispatch, SetStateAction, useState } from "react"
import { LayoutThree, LayoutTwo } from "src/components/layouts/LayoutWrappers"
import { SelectMenu } from "src/components/modals/SelectMenu/SelectMenu"
import { ISongTake } from "src/features/recording-booth/utils/types"

type SelectProps = {
  take: ISongTake
  setTake: Dispatch<SetStateAction<ISongTake | undefined>>
  takes: ISongTake[]
}
export default function SelectSong({ take, setTake, takes }: SelectProps) {
  const [showMenu, setShowMenu] = useState<boolean>(false)

  return (
    <LayoutThree
      classes={["actions-1_flow-takes", "flow-takes-1_select-takes", "select-takes-container_shadow-div-outset"]}
    >
      <LayoutTwo classes={["select-takes-container", "select-takes_shadow-div-inset"]}>
        <button className="select-takes_shadow-div-outset" onClick={() => setShowMenu(true)}>
          <p>{take?.title ? take?.title : "No Recorded Flows"}</p>
        </button>

        <SelectMenu
          position={["top", 21.5]}
          maxHeight={96 - 41.5}
          list={takes}
          listKey={["_id", "title"]}
          currentItem={take}
          setCurrentItem={setTake}
          isOpen={showMenu}
          onClose={setShowMenu}
        />
      </LayoutTwo>
    </LayoutThree>
  )
}
