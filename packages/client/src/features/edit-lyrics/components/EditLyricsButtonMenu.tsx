import { ReactNode } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"

const Button = ({
  type,
  onClick,
  isClickable,
  children,
}: {
  type: string
  onClick: () => void
  isClickable?: boolean
  children: ReactNode
}) => {
  const addClass = isClickable ? `can-undo-redo` : type
  return (
    <div className="edit-lyrics__actions-btn--container">
      <button className={`edit-lyrics__actions-btn ${addClass}`} onClick={() => onClick()}>
        {children}
      </button>
    </div>
  )
}

export const ActionButton = ({
  type,
  onClick,
  isClickable,
  color,
  size,
}: {
  type: "Undo" | "Redo" | "Plus" | "Reset" | "Save"
  onClick: () => void
  isClickable?: boolean
  color?: "Gray" | "Primary" | "White"
  size?: number
}) => {
  if (type === "Reset" || type === "Save") {
    return (
      <Button type={type} onClick={onClick}>
        {type}
      </Button>
    )
  }
  return (
    <Button type={type} onClick={onClick} isClickable={isClickable}>
      <Icon type={ButtonTypes[type]} options={{ color: color ? color : "White", size: size }} />
    </Button>
  )
}

export default function EditLyricsButtonMenu({ children }: { children: ReactNode }) {
  return (
    <div className="controls-1_options">
      <div className="options_shadow-div-outset">
        <div className="options-2_toggle-lyrics">{children}</div>
      </div>
    </div>
  )
}
