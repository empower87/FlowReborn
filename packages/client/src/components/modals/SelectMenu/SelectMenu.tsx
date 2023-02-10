import { Dispatch, SetStateAction } from "react"
import ReactDOM from "react-dom"
import SelectMenuItem from "./SelectMenuItem"

type Props = {
  position: ["top" | "bottom", number]
  maxHeight: number
  list: Array<object>
  listKey: [string, string]
  currentItem: any
  setCurrentItem: Dispatch<SetStateAction<any>>
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}

export const SelectMenu = ({
  position,
  maxHeight,
  list,
  listKey,
  currentItem,
  setCurrentItem,
  isOpen,
  onClose,
}: Props) => {
  const root = document.getElementById("root")!

  if (!isOpen || list.length <= 1) return null
  return ReactDOM.createPortal(
    <div className="SelectMenuModal" onClick={() => onClose(false)}>
      <div
        className="select-menu__list--container"
        style={{ [position[0]]: `${position[1]}%`, maxHeight: `${maxHeight}%` }}
      >
        <div className="select-menu__list--shadow-inset">
          <ul className="select-menu__list">
            {list &&
              list?.map((element: any, index: number) => {
                let isSelected = false
                if (element[listKey[0]] === currentItem[listKey[0]]) isSelected = true
                return (
                  <SelectMenuItem
                    key={`${element[listKey[0]]}_${index}`}
                    item={element}
                    listKey={listKey}
                    list={list}
                    setCurrentItem={setCurrentItem}
                    onClose={onClose}
                    isSelected={isSelected}
                  />
                )
              })}
          </ul>
        </div>
      </div>
    </div>,
    root
  )
}
