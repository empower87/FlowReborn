import { useEffect, useState } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import EditLyricsItem from "./components/EditLyricsItem"
import { LyricLine } from "./hooks/useEditLyrics"

type Props = {
  songId: string
  checkForEditedLyrics: (_songId: string, _id: string, _lyric: string) => boolean
  line: LyricLine
  onDeleteLyric: (_songId: string, _line: LyricLine) => void
  onSaveLyric: (_songId: string, _line: LyricLine) => void
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

export default function EditLyricsItemWrapper({
  songId,
  checkForEditedLyrics,
  line,
  onDeleteLyric,
  onSaveLyric,
}: Props) {
  const [lyricLine, setLyricLine] = useState<string[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [isEdited, setIsEdited] = useState<boolean>(false)
  const regexNo = /^(?:\d*)/g

  useEffect(() => {
    const lyricLine = [...line.array].map((each) => each).join(" ")
    setLyricLine([lyricLine])
  }, [line])

  useEffect(() => {
    const isEdit = checkForEditedLyrics(songId, line.id, lyricLine[0])
    setIsEdited(isEdit)
  }, [isEditing, lyricLine])

  const editLyricLine = () => {
    setIsEditing(true)
  }

  const saveLyricLine = () => {
    setIsEditing(false)
    const hasEdited = checkForEditedLyrics(songId, line.id, lyricLine[0])
    if (!hasEdited) return
    const splitString = lyricLine[0].split(" ")
    onSaveLyric(songId, { id: line.id, array: splitString })
  }

  const deleteLyricLine = () => {
    onDeleteLyric(songId, line)
  }

  const getItemIndex = () => {
    const match = line.id.match(regexNo)
    if (match) {
      return match[0]
    } else {
      return "0"
    }
  }

  return (
    <EditLyricsItem
      getItemIndex={getItemIndex}
      lyricLine={lyricLine}
      setLyricLine={setLyricLine}
      isEdited={isEdited}
      isEditing={isEditing}
      saveLyricLine={saveLyricLine}
      editLyricLine={editLyricLine}
      deleteLyricLine={deleteLyricLine}
    />
  )
}
// import { useEffect, useState } from "react"
// import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
// import { moveIcon } from "../../assets/images/_icons"
// import { LyricLine } from "./hooks/useEditLyrics"

// type Props = {
//   songId: string
//   checkForEditedLyrics: (_songId: string, _id: string, _lyric: string) => boolean
//   line: LyricLine
//   onDeleteLyric: (_songId: string, _line: LyricLine) => void
//   onSaveLyric: (_songId: string, _line: LyricLine) => void
// }

// type ButtonProps = {
//   type: "Edit" | "Save" | "Delete"
//   onClick: () => void
//   size?: number
// }

// const Button = ({ type, onClick, size }: ButtonProps) => {
//   return (
//     <button className={`buttons_shadow-div-outset ${type}`} onClick={() => onClick()}>
//       <Icon type={ButtonTypes[type]} options={{ color: type === "Delete" ? "Primary" : "White", size: size }} />
//     </button>
//   )
// }

// export default function EditLyricsItem({ songId, checkForEditedLyrics, line, onDeleteLyric, onSaveLyric }: Props) {
//   const [lyricLine, setLyricLine] = useState<string[]>([])
//   const [isEditing, setIsEditing] = useState(false)
//   const [isEdited, setIsEdited] = useState<boolean>(false)
//   const regexNo = /^(?:\d*)/g

//   useEffect(() => {
//     const lyricLine = [...line.array].map((each) => each).join(" ")
//     setLyricLine([lyricLine])
//   }, [line])

//   useEffect(() => {
//     const isEdit = checkForEditedLyrics(songId, line.id, lyricLine[0])
//     setIsEdited(isEdit)
//   }, [isEditing, lyricLine])

//   const editLyricLine = () => {
//     setIsEditing(true)
//   }

//   const saveLyricLine = () => {
//     setIsEditing(false)
//     const hasEdited = checkForEditedLyrics(songId, line.id, lyricLine[0])
//     if (!hasEdited) return
//     const splitString = lyricLine[0].split(" ")
//     onSaveLyric(songId, { id: line.id, array: splitString })
//   }

//   return (
//     <li className="lyrics-list-item">
//       <div className="list-item-1_edit-lyrics">
//         <div className="edit-lyrics-container">
//           <div className="edit-lyrics_shadow-div-outset">
//             <div className="buttons-container">
//               <div className="buttons-container_shadow-div-inset">
//                 <div className="bar-number-container">
//                   <div className="bar-num_shadow-div-inset">
//                     <div className="bar-num_shadow-div-outset">{line.id.match(regexNo)}</div>
//                   </div>
//                 </div>
//                 <div className="buttons_shadow-div-inset">
//                   <Button
//                     type={isEditing ? "Save" : "Edit"}
//                     onClick={isEditing ? saveLyricLine : editLyricLine}
//                     size={75}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="each-lyric-container">
//               <div className="each-word-container">
//                 {isEditing ? (
//                   <form className="edit-lyrics__form">
//                     <textarea
//                       className="edit-lyrics__edit-field"
//                       placeholder={lyricLine[0]}
//                       value={lyricLine[0]}
//                       onChange={(e) => setLyricLine([e.target.value])}
//                     />
//                   </form>
//                 ) : (
//                   <>
//                     {lyricLine?.map((each, index: number) => (
//                       <p
//                         className={`edit-lyrics__text ${isEdited ? "edited" : ""}`}
//                         key={`${each}+${index}`}
//                         id={`${each}`}
//                       >
//                         {each}
//                       </p>
//                     ))}
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="close-btn-container">
//               <div className="close-btn_shadow-div-inset">
//                 <Button type="Delete" onClick={() => onDeleteLyric(songId, line)} size={75} />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="list-item-2_lyric-suggestions">
//           <div className="move-handle--container">
//             <button className="move-handle__btn">
//               <img className="button-icons" src={moveIcon} alt="move" />
//             </button>
//           </div>
//           <div className="get-lyrics--container"></div>
//           <div className="undo-redo--container">
//             {/* <div className="undo-redo__btn--container">
//               <button className="undo-redo__btn undo" onClick={back}>
//                 <img src={undoIcon} alt="undo" className="button-icons" />
//               </button>
//             </div>
//             <div className="undo-redo__btn--container">
//               <button className="undo-redo__btn redo" onClick={forward}>
//                 <img src={redoIcon} alt="redo" className="button-icons" />
//               </button>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </li>
//   )
// }
