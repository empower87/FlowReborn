import { useEffect, useRef, useState } from "react"
import SpeechRecognition from "react-speech-recognition"
import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc"

type ActiveState = "inactive" | "active" | "finished"

type MediaRecorderProps = {
  minutes: number
  seconds: number
  isRecording: boolean
  mediaStream: MediaStream | null
  mediaRecorder: RecordRTC.RecordRTCPromisesHandler | null
  src: string
  blob: Blob | null
  isActive: ActiveState
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
  isActive: "inactive",
}

const useRecorderPermission = (recordingType: RecordRTC.Options["type"]) => {
  const [recorder, setRecorder] = useState<MediaRecorderProps>(INITIAL_STATE)

  useEffect(() => {
    setRecorder(INITIAL_STATE)
  }, [recordingType])

  useEffect(() => {
    const getPermissionInitializeRecorder = async () => {
      try {
        let stream = await navigator.mediaDevices.getUserMedia({
          video:
            recordingType === "video"
              ? {
                  height: 648,
                  width: 365,
                  aspectRatio: 1.777777778,
                }
              : false,
          audio: true,
        })
        let recorder = new RecordRTCPromisesHandler(stream, { type: recordingType })

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
  }, [recorder.mediaStream, recordingType])

  return { recorder, setRecorder }
}

export default function useVideoRecorder(beat: string, type: "audio" | "video") {
  const { recorder, setRecorder } = useRecorderPermission(type)
  const { isRecording, mediaStream, mediaRecorder } = recorder
  const audioRef = useRef<any>(new Audio(beat))
  const videoRef = useRef<HTMLVideoElement>(null)

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
    console.log(recorder, "startRecording function")
    if (!mediaStream || !mediaRecorder) return

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
        isActive: "active",
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

    setRecorder((prev) => ({
      ...prev,
      src: URL.createObjectURL(blob),
      blob: blob,
      isRecording: false,
      isActive: "finished",
    }))
  }

  const resetRecording = () => {
    setRecorder(INITIAL_STATE)
  }

  return { recorder, startRecording, stopRecording, resetRecording, videoRef }
}

// import { useEffect, useRef, useState } from "react"
// import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc"

// const useRecorderPermission = (recordingType: RecordRTC.Options["type"]) => {
//   const [recorder, setRecorder] = useState<any>()
//   const [stream, setStream] = useState<MediaStream | null>(null)

//   useEffect(() => {
//     const getPermissionInitializeRecorder = async () => {
//       try {
//         let stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         })
//         let recorder = new RecordRTCPromisesHandler(stream, { type: recordingType })
//         setRecorder(recorder)
//         setStream(stream)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//     console.log(stream, recorder, "ARE THESE VALUES UNDEFINED??")

//     if (!stream) {
//       getPermissionInitializeRecorder()
//     } else {
//       return function cleanup() {
//         stream?.getTracks().forEach((track: MediaStreamTrack) => track.stop())
//       }
//     }
//   }, [stream, recordingType])

//   return { recorder, stream }
// }

// export default function useVideoRecorder(type: 'audio' | 'video') {
//   const { recorder, stream } = useRecorderPermission(type)
//   const [video, setVideo] = useState<string | undefined>()
//   const recordingRef = useRef<any>()
//   const [isRecording, setIsRecording] = useState(false)

//   useEffect(() => {
//     if (stream && recordingRef.current && !recordingRef.current.srcObject) {
//       recordingRef.current.srcObject = stream
//     }
//   }, [stream])

//   const startRecording = async () => {
//     console.log(recorder, "startRecording function")
//     setIsRecording(true)
//     await recorder.startRecording()
//     const video = document.getElementById("video-rec") as HTMLVideoElement
//     if (video) {
//       video.play()
//     }
//   }

//   const stopRecording = async () => {
//     console.log(recorder, "stopRecording function")

//     setIsRecording(false)
//     try {
//       await recorder.stopRecording()

//       let blob = await recorder.getBlob()
//       const url = URL.createObjectURL(blob)
//       console.log(recorder, blob, url, "HEY WTF IS GOING ON??")
//       setVideo(url)
//     } catch (err) {
//       console.log(err)
//     }
//     // const video = document.getElementById("video-rec") as HTMLVideoElement
//     // if (video) {
//     //   video.pause()
//     // }
//     // recorder.getTracks().forEach((track: any) => track.stop())
//     // if (stream) {
//     //   stream.getTracks().forEach((track) => track.stop())
//     // }
//   }

//   return { recorder, isRecording, startRecording, stopRecording, video, ref: recordingRef.current, stream }
// }
