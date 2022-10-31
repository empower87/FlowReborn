import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import EditLyricsItem from "../EditLyricsItem"
import { LyricLine } from "../hooks/useEditLyrics"

export default function EditLyricsList({
  songId,
  lyrics,
  setLyricsHistory,
  checkForEditedLyrics,
  onDeleteLyric,
  onSaveLyric,
}: {
  songId: string
  lyrics: LyricLine[]
  setLyricsHistory: (_songId: string, _lyrics: LyricLine[]) => void
  checkForEditedLyrics: (_songId: string, _id: string, _lyric: string) => boolean
  onDeleteLyric: (_songId: string, _lyric: LyricLine) => void
  onSaveLyric: (_songId: string, _lyric: LyricLine) => void
}) {
  const [lyricsState, setLyricsState] = useState<LyricLine[]>([])
  const [onEnd, setOnEnd] = useState<boolean>(false)
  const [editList, setEditList] = useState<string[]>([])

  useEffect(() => {
    setLyricsState(lyrics)
  }, [lyrics])

  useEffect(() => {
    if (onEnd) {
      setLyricsHistory(songId, lyricsState)
      setOnEnd(false)
    }
  }, [onEnd])

  return (
    <div className="edit-lyrics__lyrics--container">
      <ReactSortable
        tag="ul"
        className="edit-lyrics__lyrics-list"
        list={lyricsState}
        setList={(newState) => setLyricsState(newState)}
        group="groupName"
        ghostClass="ghost"
        animation={200}
        handle=".move-handle__btn"
        onEnd={() => setOnEnd(true)}
        // delayOnTouchStart={true}
        delay={2}
      >
        {lyricsState?.map((each, index: number) => {
          return (
            <EditLyricsItem
              key={`${each.id}lyric${index}`}
              songId={songId}
              editList={editList}
              setEditList={setEditList}
              checkForEditedLyrics={checkForEditedLyrics}
              line={each}
              onDeleteLyric={onDeleteLyric}
              onSaveLyric={onSaveLyric}
            />
          )
        })}
      </ReactSortable>
    </div>
  )
}
