import { ReactNode } from "react"
import { ButtonTypes, Icon } from "../buttons/Icon/Icon"

type SideButtonMenuProps = {
  children: ReactNode
}
type SideButtonProps = {
  type: "Opacity" | "Songs" | "AddVideo" | "NoVideo" | "Settings" | "Like" | "Comment" | "Follow"
  text: string
  isPressed: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  size?: number
}

export const SideButton = ({ type, text, isPressed, onClick, size }: SideButtonProps) => {
  return (
    <li className="side-btn-menu__menu-item">
      <button className={`side-btn-menu__menu-item-btn ${isPressed ? "Pressed" : ""}`} onClick={onClick}>
        <Icon type={ButtonTypes[type]} options={{ color: "Primary", size: size }} />
      </button>
      <p className="side-btn-menu__menu-item-text">{text}</p>
    </li>
  )
}

export const SideButtonMenu = ({ children }: SideButtonMenuProps) => {
  return (
    <div className="side-btn-menu__menu--container">
      <div className="side-btn-menu__menu--bs-inset">
        <ul className="side-btn-menu__menu-list">{children}</ul>
      </div>
    </div>
  )
}
