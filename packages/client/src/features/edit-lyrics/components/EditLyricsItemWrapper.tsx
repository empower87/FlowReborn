import { useEffect, useState } from "react"
import { LyricLine } from "../hooks/useEditLyrics"
import EditLyricsItem, {
  EditDeleteSaveButtonWrapper,
  EditLyricInput,
  EditLyricText,
  LyricIndexWrapper,
  LyricLineWrapper,
} from "./EditLyricsItem"

type EditLyricsItemWrapperProps = {
  songId: string
  checkForEditedLyrics: (_songId: string, _id: string, _lyric: string) => boolean
  line: LyricLine
  onDeleteLyric: (_songId: string, _line: LyricLine) => void
  onSaveLyric: (_songId: string, _line: LyricLine) => void
}

export default function EditLyricsItemWrapper({
  songId,
  checkForEditedLyrics,
  line,
  onDeleteLyric,
  onSaveLyric,
}: EditLyricsItemWrapperProps) {
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
    <EditLyricsItem>
      <LyricIndexWrapper itemIndex={getItemIndex}>
        {isEditing ? (
          <EditDeleteSaveButtonWrapper type="Save" onClick={saveLyricLine} size={75} />
        ) : (
          <EditDeleteSaveButtonWrapper type="Edit" onClick={editLyricLine} size={75} />
        )}
      </LyricIndexWrapper>

      <LyricLineWrapper>
        {isEditing ? (
          <EditLyricInput lyricLine={lyricLine} setLyricLine={setLyricLine} />
        ) : (
          <EditLyricText isEdited={isEdited} lyricLine={lyricLine[0]} />
        )}
      </LyricLineWrapper>

      <EditDeleteSaveButtonWrapper type="Delete" onClick={deleteLyricLine} size={75} />
    </EditLyricsItem>
  )
}
