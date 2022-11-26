import { ReactNode } from "react"

type SideButtonMenuProps = {
  children: ReactNode
}

// const SideButton = ({ type, isPressed, onClick, size }: SideButtonProps) => {
//   return (
//     <li className="recording-booth__side-menu-item">
//       <button className={`recording-booth__side-menu-btn ${isPressed ? "Pressed" : ""}`} onClick={onClick}>
//         <Icon type={ButtonTypes[type]} options={{ color: "Primary", size: size }} />
//       </button>
//     </li>
//   )
// }

export const SideButtonMenu = ({ children }: SideButtonMenuProps) => {
  return (
    <div className="side-btn-menu__menu">
      <div className="side-btn-menu__menu--bs-inset">
        <ul className="side-btn-menu__menu-list">{children}</ul>
      </div>
    </div>
  )
}
