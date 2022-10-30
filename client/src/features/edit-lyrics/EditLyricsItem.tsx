import { useEffect, useState } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { moveIcon } from "../../assets/images/_icons"
import { LyricLine } from "./hooks/useEditLyrics"

type Props = {
  songId: string
  line: LyricLine
  onDeleteLyric: (_songId: string, _line: LyricLine) => void
  onSaveLyric: (_songId: string, _line: LyricLine) => void
}

export default function EachLyricLine({ songId, line, onDeleteLyric, onSaveLyric }: Props) {
  const [lyricLine, setLyricLine] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const regexNo = /^(?:\d*)/g

  useEffect(() => {
    const lyricLine = line.array.map((each) => each).join(" ")
    setLyricLine([lyricLine])
  }, [line])

  useEffect(() => {
    if (isEditing) return
    const lyricOriginal = line.array.map((each) => each).join(" ")
    if (lyricOriginal === lyricLine[0]) {
      setIsEdited(false)
    } else {
      setIsEdited(true)
    }
  }, [isEditing])

  const editLyricLine = () => {
    setIsEditing(true)
  }

  const saveLyricLine = () => {
    onSaveLyric(songId, { id: line.id, array: lyricLine })
    setIsEditing(false)
  }

  return (
    <li className="lyrics-list-item">
      <div className="list-item-1_edit-lyrics">
        <div className="edit-lyrics-container">
          <div className="edit-lyrics_shadow-div-outset">
            <div className="buttons-container">
              <div className="buttons-container_shadow-div-inset">
                <div className="bar-number-container">
                  <div className="bar-num_shadow-div-inset">
                    <div className="bar-num_shadow-div-outset">{line.id.match(regexNo)}</div>
                  </div>
                </div>
                <div className="buttons_shadow-div-inset">
                  <Button
                    type={isEditing ? "Save" : "Edit"}
                    onClick={isEditing ? saveLyricLine : editLyricLine}
                    size={75}
                  />
                </div>
              </div>
            </div>

            <div className="each-lyric-container">
              <div className="each-word-container">
                {isEditing ? (
                  <form className="edit-lyrics__form">
                    <textarea
                      className="edit-lyrics__edit-field"
                      placeholder={lyricLine[0]}
                      value={lyricLine}
                      onChange={(e) => setLyricLine([e.target.value])}
                    />
                  </form>
                ) : (
                  <>
                    {lyricLine?.map((each, index: number) => (
                      <p
                        className={`edit-lyrics__text ${isEdited ? "edited" : ""}`}
                        key={`${each}+${index}`}
                        id={`${each}`}
                      >
                        {each}
                      </p>
                    ))}
                  </>
                )}
              </div>
            </div>

            <div className="close-btn-container">
              <div className="close-btn_shadow-div-inset">
                <Button type="Delete" onClick={() => onDeleteLyric(songId, line)} size={75} />
              </div>
            </div>
          </div>
        </div>

        <div className="list-item-2_lyric-suggestions">
          <div className="move-handle--container">
            <button className="move-handle__btn">
              <img className="button-icons" src={moveIcon} alt="move" />
            </button>
          </div>
          <div className="get-lyrics--container"></div>
          <div className="undo-redo--container">
            {/* <div className="undo-redo__btn--container">
              <button className="undo-redo__btn undo" onClick={back}>
                <img src={undoIcon} alt="undo" className="button-icons" />
              </button>
            </div>
            <div className="undo-redo__btn--container">
              <button className="undo-redo__btn redo" onClick={forward}>
                <img src={redoIcon} alt="redo" className="button-icons" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </li>
  )
}

type ButtonProps = {
  type: "Edit" | "Save" | "Delete"
  onClick: () => void
  size?: number
}

const Button = ({ type, onClick, size }: ButtonProps) => {
  return (
    <button className={`buttons_shadow-div-outset ${type}`} onClick={() => onClick()}>
      <Icon type={ButtonTypes[type]} options={{ color: type === "Delete" ? "Primary" : "White", size: size }} />
    </button>
  )
}
