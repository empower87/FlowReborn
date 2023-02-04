import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import useHover from "../../../hooks/useHover"
import { LayoutThree, LayoutTwo } from "../../layouts/LayoutWrappers"

type Props = {
  item: any
  listKey: [string, string]
  list: any
  setCurrentItem: any
  onClose: Dispatch<SetStateAction<boolean>>
  isSelected: boolean
}

export default function SelectMenuItem({ item, listKey, list, setCurrentItem, onClose, isSelected }: Props) {
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
      <LayoutThree
        classes={[
          "select-menu__item--shadow-outset selected_2",
          "select-menu__item--shadow-inset selected_3",
          "select-menu__item-content-container selected_4",
        ]}
      >
        <LayoutTwo
          classes={["select-menu__item-bullet selected_5", "select-menu__item-bullet--shadow-inset selected_6"]}
        >
          <div className="select-menu__item-bullet selected_7"></div>
        </LayoutTwo>
        <div className="select-menu__item-text">
          <p>{item[listKey[1]]}</p>
        </div>
      </LayoutThree>
    </li>
  )
}
