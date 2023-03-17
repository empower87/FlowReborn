import { ReactNode } from "react"
import { Icon } from "../buttons/Icon/Icon"

type TitleBarProps = {
  title: ReactNode
  leftButton?: ReactNode
  rightButton?: ReactNode
}

type TitleButtonProps = {
  type: "Back" | "Close"
  onClick: any
  size?: number
}

export const TitleBarButton = ({ type, onClick, size }: TitleButtonProps) => {
  return (
    <button className="recording__header-go-back-btn" type="button" onClick={onClick}>
      <Icon type={type} options={{ color: "White", size: size }} />
    </button>
  )
}

export default function TitleBar({ title, leftButton, rightButton }: TitleBarProps) {
  return (
    <div className="title-bar">
      <div className="title-bar--bs-inset">
        <div className="title-bar__button Left" style={{ width: leftButton ? "8%" : "auto" }}>
          {leftButton}
        </div>

        <div className="title-bar__title">{title}</div>

        <div className="title-bar__button Right" style={{ width: rightButton ? "8%" : "1%" }}>
          {rightButton}
        </div>
      </div>
    </div>
  )
}
