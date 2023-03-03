import { ReactNode } from "react"
import { ButtonTypes, Icon } from "../buttons/Icon/Icon"

type SlidingButtonMenuProps = {
  children: ReactNode
}

type SlidingButtonProps = {
  icon: ButtonTypes
  text: string
  size?: number
  index?: "First" | "Last"
}

export const SlidingButton = ({ icon, text, size, index }: SlidingButtonProps) => {
  return (
    <li className="sliding-btn-menu__item">
      <button className={`sliding-btn-menu__button ${index}`}>
        <div className="sliding-btn-menu__icon">
          <div className="sliding-btn-menu__icon--wrapper">
            <Icon type={icon} options={{ color: "Primary", size: size }} />
          </div>
        </div>
        <p className="sliding-btn-menu__title">{text}</p>
      </button>
    </li>
  )
}

export const SlidingButtonMenu = ({ children }: SlidingButtonMenuProps) => {
  return (
    <div className="sliding-btn-menu">
      <div className="sliding-btn-menu--bs-inset">
        <ul className="sliding-btn-menu__list">{children}</ul>
      </div>
    </div>
  )
}
