import { useEffect, useState } from "react"
import { ReactSortable } from "react-sortablejs"
import EditLyricsItemWrapper from "../EditLyricsItemWrapper"
import { LyricLine, LyricsState } from "../hooks/useEditLyrics"

export default function EditLyricsList({
  currentLyrics,
  setLyricsHistory,
  checkForEditedLyrics,
  onDeleteLyric,
  onSaveLyric,
}: {
  currentLyrics: LyricsState
  setLyricsHistory: (_songId: string, _lyrics: LyricLine[]) => void
  checkForEditedLyrics: (_songId: string, _id: string, _lyric: string) => boolean
  onDeleteLyric: (_songId: string, _lyric: LyricLine) => void
  onSaveLyric: (_songId: string, _lyric: LyricLine) => void
}) {
  const [lyricsState, setLyricsState] = useState<LyricLine[]>([])
  const [onEnd, setOnEnd] = useState<boolean>(false)

  useEffect(() => {
    setLyricsState(currentLyrics.lyrics)
  }, [currentLyrics])

  useEffect(() => {
    if (onEnd) {
      setLyricsHistory(currentLyrics.songId, lyricsState)
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
            <EditLyricsItemWrapper
              key={`${each.id}lyric${index}`}
              songId={currentLyrics.songId}
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
