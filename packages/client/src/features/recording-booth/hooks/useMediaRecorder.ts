import { RefObject, useEffect, useRef, useState } from "react"
import SpeechRecognition from "react-speech-recognition"
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc"
import { GetUserMediaConstraints, useMediaStreamConstraints } from "./useMediaStream"
import { useSongDraftsContext } from "./useSongDrafts"

type MediaRecorderProps = {
  minutes: number
  seconds: number
  isRecording: boolean
  mediaStream: MediaStream | null
  mediaRecorder: RecordRTC.RecordRTCPromisesHandler | null
  src: string
  blob: Blob | null
}

type Interval = null | number | ReturnType<typeof setInterval>

const INITIAL_STATE: MediaRecorderProps = {
  minutes: 0,
  seconds: 0,
  isRecording: false,
  mediaStream: null,
  mediaRecorder: null,
  src: "",
  blob: null,
}

type RecorderPermissionProps = {
  constraints: GetUserMediaConstraints
}

type UseMediaRecorderProps = {
  beat: string
  videoRef: RefObject<HTMLVideoElement>
}

const useRecorderPermission = ({ constraints }: RecorderPermissionProps) => {
  const [recorder, setRecorder] = useState<MediaRecorderProps>(INITIAL_STATE)

  useEffect(() => {
    setRecorder(INITIAL_STATE)
  }, [constraints])

  useEffect(() => {
    const getPermissionInitializeRecorder = async () => {
      try {
        let stream = await navigator.mediaDevices.getUserMedia(constraints)
        let recorder = new RecordRTCPromisesHandler(stream, { type: constraints.video ? "video" : "audio" })

        console.log(constraints, stream, recorder, "are these changing or valid??")
        setRecorder((prev) => ({
          ...prev,
          mediaStream: stream,
          mediaRecorder: recorder,
        }))
      } catch (err) {
        console.log(err)
      }
    }

    if (!recorder.mediaStream) {
      getPermissionInitializeRecorder()
    } else {
      return function cleanup() {
        recorder.mediaStream?.getTracks().forEach((track) => track.stop())
      }
    }
  }, [recorder.mediaStream, constraints])

  return { recorder, setRecorder }
}

export default function useMediaRecorder({ beat, videoRef }: UseMediaRecorderProps) {
  const { setSongDraftHandler } = useSongDraftsContext()
  const { constraints, mediaStreamConstraintsHandler } = useMediaStreamConstraints()
  const { recorder, setRecorder } = useRecorderPermission({ constraints })
  const { isRecording, mediaStream, mediaRecorder } = recorder
  const audioRef = useRef<any>(new Audio(beat))

  const type = constraints.video ? "video" : "audio"

  useEffect(() => {
    if (!videoRef.current) return
    if (type === "video" && mediaStream) {
      videoRef.current.srcObject = mediaStream
      videoRef.current.muted = true
      videoRef.current.play()
    } else {
      videoRef.current.srcObject = null
    }
  }, [videoRef.current, mediaStream, type])

  useEffect(() => {
    const MAX_RECORDER_TIME = 5
    let recordingInterval: Interval = null

    if (isRecording) {
      recordingInterval = setInterval(() => {
        setRecorder((prevState) => {
          if (prevState.minutes === MAX_RECORDER_TIME && prevState.seconds === 0) {
            typeof recordingInterval === "number" && clearInterval(recordingInterval)
            return prevState
          }

          if (prevState.seconds >= 0 && prevState.seconds < 59)
            return {
              ...prevState,
              seconds: prevState.seconds + 1,
            }
          else if (prevState.seconds === 59)
            return {
              ...prevState,
              minutes: prevState.minutes + 1,
              seconds: 0,
            }
          else return prevState
        })
      }, 1000)
    } else {
      typeof recordingInterval === "number" && clearInterval(recordingInterval)
    }

    return () => {
      typeof recordingInterval === "number" && clearInterval(recordingInterval)
    }
  }, [isRecording])

  useEffect(() => {
    setRecorder((prevState) => {
      if (prevState.mediaStream)
        return {
          ...prevState,
          mediaRecorder: new RecordRTCPromisesHandler(prevState.mediaStream),
        }
      else return prevState
    })
  }, [mediaStream])

  useEffect(() => {
    if (mediaRecorder) {
      const getState = async () => {
        const state = await mediaRecorder?.getState()

        if (state === "inactive") {
          mediaRecorder.startRecording()
        }
      }
      getState()
    }
  }, [mediaRecorder])

  const startRecording = async () => {
    if (!mediaStream || !mediaRecorder) return
    console.log(recorder, "startRecording function")

    try {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: type === "video" ? true : false,
        audio: true,
      })
      await mediaRecorder.startRecording()
      SpeechRecognition.startListening({ continuous: true })

      var audio = audioRef.current?.captureStream()
      audioRef.current.play()
      audioRef.current.loop = true

      const audioContext = new AudioContext()
      let audioIn_01 = audioContext.createMediaStreamSource(stream)
      let audioIn_02 = audioContext.createMediaStreamSource(audio)
      let destination = audioContext.createMediaStreamDestination()

      audioIn_01.connect(destination)
      audioIn_02.connect(destination)

      var newStream: MediaStream

      if (type === "video") {
        newStream = new MediaStream([stream.getVideoTracks()[0], destination.stream.getAudioTracks()[0]])
      } else {
        newStream = destination.stream
      }

      setRecorder((prev) => ({
        ...prev,
        isRecording: true,
        mediaStream: newStream,
      }))
    } catch (err) {
      console.log(err)
    }
  }

  const stopRecording = async () => {
    if (!mediaRecorder) return

    await mediaRecorder.stopRecording()

    SpeechRecognition.stopListening()

    audioRef.current.pause()
    audioRef.current.currentTime = 0

    let blob = await mediaRecorder.getBlob()

    let url = URL.createObjectURL(blob)

    setRecorder((prev) => ({
      ...prev,
      src: url,
      blob: blob,
      isRecording: false,
    }))

    setSongDraftHandler(url, blob, [recorder.minutes, recorder.seconds], type, videoRef)
  }

  const resetRecording = () => {
    setRecorder(INITIAL_STATE)
  }

  return {
    isRecording: recorder.isRecording,
    startRecording,
    stopRecording,
    resetRecording,
    videoRef,
    mediaStreamConstraintsHandler,
  }
}
