import { createContext, ReactNode, RefObject, useCallback, useContext, useState } from "react"
import { useAuth } from "src/context/AuthContext"
import { generateCanvas } from "../utils/generateThumbnail"
import { ISongTake } from "../utils/types"
import { useGetTranscriptLyrics } from "./useTranscript"

type SongDraftsContextType = ReturnType<typeof useSongDrafts>

const SongDraftsContext = createContext<SongDraftsContextType | null>(null)

export const useSongDrafts = () => {
  const { user } = useAuth()
  const { totalLyrics } = useGetTranscriptLyrics()
  const [currentDraft, setCurrentDraft] = useState<ISongTake>()
  const [allDrafts, setAllDrafts] = useState<ISongTake[]>([])

  const setSongDraftHandler = useCallback(
    (
      url: string,
      blob: Blob,
      recordingTime: [number, number],
      recordingType: "audio" | "video",
      videoRef: RefObject<HTMLVideoElement>
    ) => {
      if (!videoRef.current || !user) return
      const id = parseInt(allDrafts.length?.toString()) + 1
      const filteredLyrics = totalLyrics.length ? [...totalLyrics]?.filter((lyric) => lyric.length !== 0) : []
      const duration = recordingTime[0] * 60000 + recordingTime[1] * 1000

      var newTake = {
        _id: `${id}`,
        title: "",
        blob: blob,
        audio: url,
        user: user,
        lyrics: [...filteredLyrics],
        duration: duration,
        caption: "",
      }

      const video = videoRef.current
      video.currentTime = 0

      console.log(newTake, "created a new take")

      if (recordingType === "video") {
        let canvas = generateCanvas(video, videoRef.current?.videoHeight, videoRef.current?.videoWidth)
        if (!canvas) return
        canvas.toBlob(
          (blob) => {
            if (blob) {
              let url = URL.createObjectURL(blob)

              let newTakeWithThumbnail = { ...newTake, thumbnail: url, thumbnailBlob: blob }

              setCurrentDraft(newTakeWithThumbnail)
              setAllDrafts((prev) => [...prev, newTakeWithThumbnail])
            }
          },
          "image/jpeg",
          95
        )
      } else {
        setCurrentDraft(newTake)
        setAllDrafts((prev) => [...prev, newTake])
      }
    },
    []
  )

  const deleteDraftHandler = useCallback((_id: string) => {
    let filteredDrafts = allDrafts.filter((draft, index) => {
      if (draft._id !== _id) {
        if (filteredDrafts[index + 1]) {
          setCurrentDraft(filteredDrafts[index + 1])
        } else {
          setCurrentDraft(filteredDrafts[index - 1])
        }
        return draft
      }
    })
    setAllDrafts(filteredDrafts)
  }, [])

  return {
    currentDraft,
    allDrafts,
    setSongDraftHandler,
    deleteDraftHandler,
  }
}

export const SongDraftsProvider = ({ children }: { children: ReactNode }) => {
  const values = useSongDrafts()
  return <SongDraftsContext.Provider value={values}>{children}</SongDraftsContext.Provider>
}

export const useSongDraftsContext = () => {
  const context = useContext(SongDraftsContext)
  if (!context) throw new Error("useSongDraftsContext has to be used within <SongDraftsContext.Provider>")
  return context
}
