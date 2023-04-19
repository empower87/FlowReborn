import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import useHover from "../../../hooks/useHover"

type ItemProps = {
  item: any
  listKey: [string, string]
  list: any
  setCurrentItem: any
  onClose: Dispatch<SetStateAction<boolean>>
  isSelected: boolean
}

function SelectMenuItem({ item, listKey, list, setCurrentItem, onClose, isSelected }: ItemProps) {
  const hoverRef = useRef<HTMLLIElement>(null)
  const isHovered = useHover(hoverRef)
  const [selected, setSelected] = useState<boolean>(false)

  useEffect(() => {
    if (isSelected) {
      setSelected(true)
    } else {
      setSelected(false)
    }
  }, [isSelected])

  const handleOptionChange = (e: React.SyntheticEvent) => {
    let getOption = list.filter((each: any) => each[listKey[0]]?.toString() === e.currentTarget.id)
    setCurrentItem(getOption[0])
    onClose(false)
  }

  return (
    <li
      id={`${item[listKey[0]]}`}
      ref={hoverRef}
      className={`select-menu__item-container ${selected ? "selected" : isHovered ? "selected" : ""}`}
      onClick={(e) => handleOptionChange(e)}
    >
      <div className="select-menu__item--shadow-outset selected_2">
        <div className="select-menu__item--shadow-inset selected_3">
          <div className="select-menu__item-content-container selected_4">
            <div className="select-menu__item-bullet selected_5">
              <div className="select-menu__item-bullet--shadow-inset selected_6">
                <div className="select-menu__item-bullet selected_7"></div>
              </div>
            </div>

            <div className="select-menu__item-text">
              <p>{item[listKey[1]]}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

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
