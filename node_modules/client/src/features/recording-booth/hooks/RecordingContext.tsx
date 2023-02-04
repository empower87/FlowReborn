import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { Beat } from "src/constants/index"
import { useAuth } from "src/context/AuthContext"
import { generateCanvas } from "../utils/generateThumbnail"
import { ISongTake } from "../utils/types"
import useMediaRecorder from "./useMediaRecorder"
import useTranscript from "./useTranscript"

export type RecordingsContextType = ReturnType<typeof useRecordingsProvider>

const RecordingsContext = createContext<RecordingsContextType | null>(null)

const useRecordingsProvider = (selectedBeat: Beat, recordingType: "audio" | "video") => {
  // const [selectedBeat, setSelectedBeat] = useState<Beat>(beatList[0])
  // const [recordingType, setRecordingType] = useState<"audio" | "video">("video")
  const { user } = useAuth()
  const { recorder, startRecording, stopRecording, resetRecording, videoRef } = useMediaRecorder(
    selectedBeat.beat,
    recordingType
  )
  const { lyrics } = useTranscript()
  const [currentTake, setCurrentTake] = useState<ISongTake>()
  const [takes, setTakes] = useState<ISongTake[]>([])

  useEffect(() => {
    if (!user || !videoRef.current) return
    if (recorder.isActive === "finished" && recorder.blob) {
      const id = parseInt(takes.length?.toString()) + 1
      const filteredLyrics = [...lyrics].filter((lyric) => lyric.length !== 0)
      const duration = recorder.minutes * 60000 + recorder.seconds * 1000
      var newTake: ISongTake = {
        _id: `${id}`,
        title: "",
        blob: recorder.blob,
        audio: recorder.src,
        user: user,
        lyrics: [...filteredLyrics],
        duration: duration,
        caption: "",
      }
      const video = videoRef.current
      video.currentTime = 0

      if (recordingType === "video") {
        let canvas = generateCanvas(video, videoRef.current?.videoHeight, videoRef.current?.videoWidth)
        if (!canvas) return
        canvas.toBlob(
          (blob) => {
            if (blob) {
              let url = URL.createObjectURL(blob)

              let newTakeWithThumbnail = { ...newTake, thumbnail: url, thumbnailBlob: blob }

              setCurrentTake(newTakeWithThumbnail)
              setTakes((prev) => [...prev, newTakeWithThumbnail])
            }
          },
          "image/jpeg",
          95
        )
      } else {
        setCurrentTake(newTake)
        setTakes((prev) => [...prev, newTake])
      }
      resetRecording()
    }
  }, [recorder.isActive, recorder.blob])

  const deleteTake = (_id: string) => {
    let filteredTakes = takes.filter((take) => take._id !== currentTake?._id)
    setTakes(filteredTakes)
    setCurrentTake(filteredTakes[0])
  }

  return {
    takes,
    currentTake,
    setCurrentTake,
    startRecording,
    stopRecording,
    deleteTake,
    isRecording: recorder.isRecording,
    minutes: recorder.minutes,
    seconds: recorder.seconds,
    stream: recorder.mediaStream,
    videoRef,
  }
}

const RecordingsProvider = ({
  selectedBeat,
  recordingType,
  children,
}: {
  selectedBeat: Beat
  recordingType: "audio" | "video"
  children: ReactNode
}) => {
  const values = useRecordingsProvider(selectedBeat, recordingType)
  return <RecordingsContext.Provider value={values}>{children}</RecordingsContext.Provider>
}

function useRecordings() {
  return useContext(RecordingsContext)
}

export { useRecordings, useRecordingsProvider, RecordingsProvider }
