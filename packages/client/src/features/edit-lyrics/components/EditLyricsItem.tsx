import { Dispatch, ReactNode, SetStateAction } from "react"
import { moveIcon } from "src/assets/images/_icons"
import { Icon } from "src/components/buttons/Icon/Icon"

type ButtonProps = {
  type: "Edit" | "Save" | "Delete"
  onClick: () => void
  size?: number
}

const Button = ({ type, onClick, size }: ButtonProps) => {
  return (
    <button className={`buttons_shadow-div-outset ${type}`} onClick={() => onClick()}>
      <Icon type={type} options={{ color: type === "Delete" ? "Primary" : "White", size: size }} />
    </button>
  )
}

export const EditDeleteSaveButtonWrapper = ({ type, onClick, size }: ButtonProps) => {
  if (type === "Delete")
    return (
      <div className="close-btn-container">
        <div className="close-btn_shadow-div-inset">
          <Button type="Delete" onClick={onClick} size={size} />
        </div>
      </div>
    )
  return (
    <div className="buttons_shadow-div-inset">
      <Button type={type} onClick={onClick} size={size} />
    </div>
  )
}

export const EditLyricInput = ({
  lyricLine,
  setLyricLine,
}: {
  lyricLine: string[]
  setLyricLine: Dispatch<SetStateAction<string[]>>
}) => (
  <form className="edit-lyrics__form">
    <textarea
      className="edit-lyrics__edit-field"
      placeholder={lyricLine[0]}
      value={lyricLine[0]}
      onChange={(e) => setLyricLine([e.target.value])}
    />
  </form>
)

export const EditLyricText = ({ isEdited, lyricLine }: { isEdited: boolean; lyricLine: string }) => (
  <p className={`edit-lyrics__text ${isEdited ? "edited" : ""}`}>{lyricLine}</p>
)

export const LyricLineWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="each-lyric-container">
      <div className="each-word-container">{children}</div>
    </div>
  )
}

export const LyricIndexWrapper = ({ itemIndex, children }: { itemIndex: () => string; children: ReactNode }) => {
  return (
    <div className="buttons-container">
      <div className="buttons-container_shadow-div-inset">
        <div className="bar-number-container">
          <div className="bar-num_shadow-div-inset">
            <div className="bar-num_shadow-div-outset">{itemIndex()}</div>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function EditLyricsItem({ children }: { children: ReactNode }) {
  return (
    <li className="lyrics-list-item">
      <div className="list-item-1_edit-lyrics">
        <div className="edit-lyrics-container">
          <div className="edit-lyrics_shadow-div-outset">{children}</div>
        </div>

        <div className="list-item-2_lyric-suggestions">
          <div className="move-handle--container">
            <button className="move-handle__btn">
              <img className="button-icons" src={moveIcon} alt="move" />
            </button>
          </div>
          <div className="get-lyrics--container"></div>
          <div className="undo-redo--container"></div>
        </div>
      </div>
    </li>
  )
}
