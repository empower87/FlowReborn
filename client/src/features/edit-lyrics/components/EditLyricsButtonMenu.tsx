import { ReactNode } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"

type EditLyricsButtonMenuProps = {
  onUndo: () => void
  onRedo: () => void
  onReset: () => void
  onSave: () => void
  canUndo: boolean
  canRedo: boolean
}

const Button = ({
  type,
  onClick,
  canUndo,
  canRedo,
  children,
}: {
  type: string
  onClick: () => void
  canUndo?: boolean
  canRedo?: boolean
  children: ReactNode
}) => {
  const addClass = canUndo || canRedo ? `can-undo-redo` : type
  return (
    <div className="edit-lyrics__actions-btn--container">
      <button className={`edit-lyrics__actions-btn ${addClass}`} onClick={() => onClick()}>
        {children}
      </button>
    </div>
  )
}

export default function EditLyricsButtonMenu({
  onUndo,
  onRedo,
  onReset,
  onSave,
  canUndo,
  canRedo,
}: EditLyricsButtonMenuProps) {
  return (
    <div className="controls-1_options">
      <div className="options_shadow-div-outset">
        <div className="options-2_toggle-lyrics">
          <Button type="reset" onClick={onReset}>
            Reset
          </Button>
          <Button type="undo" onClick={onUndo} canUndo={canUndo}>
            <Icon type={ButtonTypes.Undo} options={{ color: "Gray", size: 70 }} />
          </Button>
          <Button type="redo" onClick={onRedo} canRedo={canRedo}>
            <Icon type={ButtonTypes.Redo} options={{ color: "Gray", size: 70 }} />
          </Button>
          <Button type="save" onClick={onSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
