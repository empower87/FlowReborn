import { ReactNode } from "react"
import { Icon } from "../buttons/Icon/Icon"

type SideButtonMenuProps = {
  children: ReactNode
}
type SideButtonProps = {
  type:
    | "Opacity"
    | "Songs"
    | "AddVideo"
    | "NoVideo"
    | "Settings"
    | "Like"
    | "Comment"
    | "Follow"
    | "Landscape"
    | "Portrait"
    | "Expand"
  text: string
  hasUser: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  isPressed?: boolean
  size?: number
}

export const SideButton = ({ type, text, hasUser, onClick, isPressed, size }: SideButtonProps) => {
  return (
    <li className="side-btn-menu__menu-item">
      <button
        className={`side-btn-menu__menu-item-btn ${hasUser ? "HasUser" : ""} ${isPressed ? "Pressed" : ""}`}
        onClick={onClick}
      >
        <Icon type={type} options={{ color: hasUser ? "White" : "Primary", size: size }} />
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
