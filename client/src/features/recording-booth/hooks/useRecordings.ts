import { useEffect, useState } from "react"
import { Beat } from "src/constants/index"
import { useAuth } from "src/context/AuthContext"
import useMediaRecorder from "../hooks/useMediaRecorder"
import useTranscript from "../hooks/useTranscript"
import { generateCanvas } from "../utils/generateThumbnail"
import { ISongTake } from "../utils/types"

export default function useRecordings(selectedBeat: Beat, recordingType: "audio" | "video") {
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

      videoRef.current.currentTime = 0
      let canvas = generateCanvas(videoRef.current, videoRef.current?.videoHeight, videoRef.current?.videoWidth)

      if (!canvas) return

      canvas.toBlob(
        (blob) => {
          if (blob) {
            let url = URL.createObjectURL(blob)

            const newTake = {
              _id: `${id}`,
              title: "",
              blob: recorder.blob,
              audio: recorder.src,
              user: user,
              lyrics: [...filteredLyrics],
              duration: duration,
              caption: "",
              thumbnail: url,
            }
            setCurrentTake(newTake)
            setTakes((prev) => [...prev, newTake])
            resetRecording()
          }
        },
        "image/jpeg",
        95
      )
    }
  }, [recorder.isActive, recorder.blob])

  const deleteTake = (_id: string) => {
    let filteredTakes = takes.filter((take, index) => take._id !== currentTake?._id)
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
