import { ReactNode, RefObject, createContext, useCallback, useContext, useState } from "react"
import { useAuth } from "src/context/AuthContext"
import { createThumbnailUrl } from "../utils/generateThumbnail"
import { ISongTake } from "../utils/types"
import { useGetTranscriptLyrics } from "./useTranscript"

type SongDraftsContextType = ReturnType<typeof useSongDrafts>

const SongDraftsContext = createContext<SongDraftsContextType | null>(null)

const useSongDrafts = () => {
  const { user } = useAuth()
  const { totalLyrics } = useGetTranscriptLyrics()
  const [currentDraftId, setCurrentDraftId] = useState<string | undefined>()
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
      const id = allDrafts.length + 1
      const filteredLyrics = totalLyrics.length ? [...totalLyrics]?.filter((lyric) => lyric.length !== 0) : []
      const duration = recordingTime[0] * 60000 + recordingTime[1] * 1000
      const isVideo = recordingType === "video" ? true : false
      const video = videoRef.current
      video.currentTime = 0
      const thumbnail = createThumbnailUrl(video)

      var newTake = {
        _id: `${id}`,
        title: "",
        blob: blob,
        src: url,
        user: user,
        lyrics: [...filteredLyrics],
        duration: duration,
        thumbnail: isVideo ? thumbnail : undefined,
        caption: "",
        isVideo: isVideo,
      }
      console.log(newTake, allDrafts, id, "created a new take")

      setCurrentDraftId(newTake._id)
      setAllDrafts((prev) => [...prev, newTake])
    },
    [allDrafts]
  )

  const updateThumbnail = (_id: string, thumbnail: string) => {
    setAllDrafts((prevDrafts) => {
      const updatedDrafts = prevDrafts.map((draft) => {
        if (draft._id === _id) {
          return { ...draft, thumbnail }
        }
        return draft
      })
      return updatedDrafts
    })
  }

  const setCurrentDraft = (draft: ISongTake) => {
    setCurrentDraftId(draft._id)
  }

  const deleteDraftHandler = useCallback((_id: string) => {
    let filteredDrafts = allDrafts.filter((draft, index) => {
      if (draft._id !== _id) {
        if (filteredDrafts[index + 1]) {
          setCurrentDraftId(filteredDrafts[index + 1]._id)
        } else {
          setCurrentDraftId(filteredDrafts[index - 1]._id)
        }
        return draft
      }
    })
    setAllDrafts(filteredDrafts)
  }, [])

  const currentDraft = allDrafts.find((draft) => draft._id === currentDraftId)

  return {
    currentDraft,
    setCurrentDraft,
    allDrafts,
    setSongDraftHandler,
    deleteDraftHandler,
    updateThumbnail,
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
