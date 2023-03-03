import { Dispatch, MouseEvent, ReactNode, SetStateAction, useState } from "react"
import ReactDOM from "react-dom"
import { Icon } from "src/components/buttons/Icon/Icon"
import { ResizeBar } from "src/components/ui/ResizeBar"

type DotMenuModalProps = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

type DotMenuModalItemProps = {
  icon: "Edit" | "Reply" | "Delete"
  title: string
  size: number
  onClick?: () => void
}

export default function DotMenu({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="dot-menu">
      <button className="dot-menu__container" onClick={() => setIsOpen(true)}>
        <div className="dot-menu__dot"></div>
        <div className="dot-menu__dot"></div>
        <div className="dot-menu__dot"></div>
      </button>

      <DotMenuModal isOpen={isOpen} onClose={setIsOpen}>
        {children}
      </DotMenuModal>
    </div>
  )
}

export const DotMenuModalItem = ({ icon, title, size, onClick }: DotMenuModalItemProps) => {
  return (
    <li className="dot-menu__modal-item" onClick={onClick}>
      <div className="dot-menu__modal-item--bs-inset">
        <div className="dot-menu__modal-item-icon">
          <div className="dot-menu__modal-item-icon--bs-inset">
            <Icon type={icon} options={{ color: "Primary", size: size }} />
          </div>
        </div>
        <div className="dot-menu__modal-item-title">
          <p>{title}</p>
        </div>
      </div>
    </li>
  )
}

const DotMenuModal = ({ isOpen, onClose, children }: DotMenuModalProps) => {
  const root = document.getElementById("root")!

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    onClose(false)
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="dot-menu__modal-background" onClick={(e) => onCloseHandler(e)}>
      <div className="dot-menu__modal">
        <div className="dot-menu__modal--bs-inset">
          <div className="dot-menu__modal-header">
            <ResizeBar onClick={() => onClose(false)} />
          </div>
          <div className="dot-menu__modal-body">
            <ul className="dot-menu__modal-list">{children}</ul>
          </div>
        </div>
      </div>
    </div>,
    root
  )
}
