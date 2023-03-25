import { RefObject, useRef, useState } from "react"
import { useAuth } from "src/context/AuthContext"
import { ISongTake } from "../utils/types"
import useMediaRecorder from "./useMediaRecorder"
import { useSuggestionSettingsContext } from "./useSuggestionSettings"

export default function useRecordings(
  videoRef: RefObject<HTMLVideoElement>,
  setSongDraftHandler: (
    url: string,
    blob: Blob,
    recordingTime: [number, number],
    recordingType: "audio" | "video",
    videoRef: RefObject<HTMLVideoElement>
  ) => void
) {
  const { selectedBeat, recordingType } = useSuggestionSettingsContext()
  const { user } = useAuth()
  const { startRecording, stopRecording, resetRecording } = useMediaRecorder({
    beat: selectedBeat.beat,
    type: recordingType,
    videoRef: videoRef,
    // setSongDraftHandler: setSongDraftHandler,
  })

  const [currentTake, setCurrentTake] = useState<ISongTake>()
  const [takes, setTakes] = useState<ISongTake[]>([])

  const lyricsRef = useRef<string[][]>([])
  const minutesRef = useRef<number>(0)
  const secondsRef = useRef<number>(0)

  // useEffect(() => {
  //   if (!user || !videoRef.current) return
  //   if (recorder.isActive === "finished" && recorder.blob) {
  //     const id = parseInt(takes.length?.toString()) + 1
  //     const filteredLyrics = [...lyricsRef.current].filter((lyric) => lyric.length !== 0)
  //     const duration = recorder.minutes * 60000 + recorder.seconds * 1000

  //     var newTake = {
  //       _id: `${id}`,
  //       title: "",
  //       blob: recorder.blob,
  //       audio: recorder.src,
  //       user: user,
  //       lyrics: [...filteredLyrics],
  //       duration: duration,
  //       caption: "",
  //     }

  //     console.log(newTake, "creating a new take")

  //     const video = videoRef.current
  //     video.currentTime = 0

  //     if (recordingType === "video") {
  //       let canvas = generateCanvas(video, videoRef.current?.videoHeight, videoRef.current?.videoWidth)
  //       if (!canvas) return
  //       canvas.toBlob(
  //         (blob) => {
  //           if (blob) {
  //             let url = URL.createObjectURL(blob)

  //             let newTakeWithThumbnail = { ...newTake, thumbnail: url, thumbnailBlob: blob }

  //             setCurrentTake(newTakeWithThumbnail)
  //             setTakes((prev) => [...prev, newTakeWithThumbnail])
  //           }
  //         },
  //         "image/jpeg",
  //         95
  //       )
  //     } else {
  //       setCurrentTake(newTake)
  //       setTakes((prev) => [...prev, newTake])
  //     }
  //     resetRecording()
  //   }
  // }, [recorder.isActive, recorder.blob])

  // useEffect(() => {
  //   minutesRef.current = recorder.minutes
  //   secondsRef.current = recorder.seconds
  // }, [recorder.minutes, recorder.seconds])

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
    isRecording: true,
    minutes: minutesRef.current,
    seconds: secondsRef.current,
    stream: "",
    videoRef,
    lyricsRef,
    recordingType,
  }
}
