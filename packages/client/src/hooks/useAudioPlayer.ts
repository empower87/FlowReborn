import { MutableRefObject, useEffect, useRef, useState } from "react"

type UseAudioPlayerProps = {
  ref: MutableRefObject<HTMLVideoElement | null>
  duration: number
  bgColor: string
  video?: string
}

export default function useAudioPlayer({ ref, duration, bgColor, video }: UseAudioPlayerProps) {
  // const videoElement = document.getElementById(`${video}`)
  // console.log(video, src, "WHAT ARE THESE DOING HHAHAHHA????")
  const audio = new Audio(video)

  const [trackProgress, setTrackProgress] = useState(0)
  const [songDuration, setSongDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>("0:00")
  const [endTime, setEndTime] = useState<string>("0:00")

  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const secondsRef = useRef<ReturnType<typeof setInterval>>()
  const currentProgressRef = useRef(0)

  const [src, setSrc] = useState<HTMLVideoElement | null>(null)

  useEffect(() => {
    setSrc(ref.current)
    // console.log(ref, src, "checking the ref prop and the src state created from it")
  }, [ref])

  const stopMediaHandler = () => {
    setIsPlaying(false)
  }
  // const srcRef = useRef<any>(null)

  // useEffect(() => {
  //   setIsPlaying(false)
  //   src.current = null
  // }, [src])

  // useEffect(() => {
  //   if (video) {
  //     src = src
  //   } else {
  //     src.current = audio
  //   }
  // }, [src, video])

  useEffect(() => {
    if (!src) return
    if (isPlaying) {
      src.play()
      startTimer()
    } else {
      if (intervalRef.current && secondsRef.current) {
        clearInterval(intervalRef.current)
        clearInterval(secondsRef.current)
      }
      src.pause()
    }
  }, [isPlaying, src])

  useEffect(() => {
    if (!currentProgressRef.current) return

    // TODO: fix so that it resets upon loop
    if (src && Math.floor(src.currentTime) === 0) {
      const getCurrentTime = formatTime(1)
      currentProgressRef.current = 1
      setCurrentTime(getCurrentTime)
    } else {
      const getCurrentTime = formatTime(currentProgressRef.current)
      setCurrentTime(getCurrentTime)
    }
  }, [currentProgressRef.current, src])

  useEffect(() => {
    let filteredDuration = Math.round(duration / 1000)
    setSongDuration(filteredDuration)

    const getEndTime = formatTime(filteredDuration)
    setEndTime(getEndTime)
    setCurrentTime("0:00")
  }, [src])

  useEffect(() => {
    if (!src || !video) return
    src.pause()
    src.src = video
    setTrackProgress(src.currentTime)
    currentProgressRef.current = 0
  }, [src])

  const currentPercentage = songDuration ? `${(trackProgress / songDuration) * 100 + 0.02}%` : "0%"
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #63DEBC), color-stop(${currentPercentage}, ${bgColor}))
  `

  const startTimer = () => {
    if (src !== null) {
      if (intervalRef.current && secondsRef.current) {
        clearInterval(intervalRef.current)
        clearInterval(secondsRef.current)
      }

      intervalRef.current = setInterval(() => {
        if (!src) return
        if (src.ended) {
          setIsPlaying(false)
          currentProgressRef.current = 0
          setTrackProgress(0)
        } else {
          setTrackProgress(src?.currentTime)
        }
      }, 100)

      secondsRef.current = setInterval(() => {
        if (src?.ended) {
        } else {
          currentProgressRef.current++
        }
      }, 1000)
    }
  }

  const onScrub = (value: string) => {
    if (!src) return
    if (intervalRef.current && secondsRef.current) {
      clearInterval(intervalRef.current)
      clearInterval(secondsRef.current)
    }
    const numberValue: number = parseInt(value)

    src.currentTime = numberValue
    currentProgressRef.current = Math.round(numberValue)
    setTrackProgress(src.currentTime)
  }

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }

  const formatTime = (seconds: number) => {
    const getMinutes = Math.floor(seconds / 60)
    const getSeconds = seconds % 60
    const getFormattedSeconds = getSeconds < 10 ? `0${getSeconds}` : `${getSeconds}`
    const getFormattedMinutes = getMinutes >= 1 ? getMinutes : 0

    return `${getFormattedMinutes}:${getFormattedSeconds}`
  }

  const setPlayHandler = () => {
    setIsPlaying((prev) => !prev)
  }

  return {
    slider: {
      progress: trackProgress,
      duration: songDuration,
      onScrub: onScrub,
      onScrubEnd: onScrubEnd,
      style: trackStyling,
    },
    time: {
      current: currentTime,
      end: endTime,
    },
    isPlaying,
    setIsPlaying,
    setPlayHandler,
    stopMediaHandler,
  }
}

// type UseAudioPlayerProps = {
//   src: string
//   duration: number
//   bgColor: string
//   video?: string
// }

// export default function useAudioPlayer({ src, duration, bgColor, video }: UseAudioPlayerProps) {
//   const videoElement = document.getElementById(`${video}`)
//   console.log(videoElement, video, src, "WHAT ARE THESE DOING HHAHAHHA????")
//   const audio = new Audio(src)

//   const [trackProgress, setTrackProgress] = useState(0)
//   const [songDuration, setSongDuration] = useState(0)
//   const [isPlaying, setIsPlaying] = useState<boolean>(false)
//   const [currentTime, setCurrentTime] = useState<string>("0:00")
//   const [endTime, setEndTime] = useState<string>("0:00")

//   const intervalRef = useRef<ReturnType<typeof setInterval>>()
//   const secondsRef = useRef<ReturnType<typeof setInterval>>()
//   const currentProgressRef = useRef(0)
//   const srcRef = useRef<any>(null)

//   useEffect(() => {
//     setIsPlaying(false)
//     srcRef.current = null
//   }, [src])

//   useEffect(() => {
//     if (video) {
//       srcRef.current = videoElement
//     } else {
//       srcRef.current = audio
//     }
//   }, [src, video])

//   useEffect(() => {
//     if (!srcRef.current) return
//     if (isPlaying) {
//       srcRef?.current?.play()
//       startTimer()
//     } else {
//       if (intervalRef.current && secondsRef.current) {
//         clearInterval(intervalRef.current)
//         clearInterval(secondsRef.current)
//       }
//       srcRef?.current?.pause()
//     }
//     return () => {
//       setIsPlaying(false)
//       srcRef?.current?.pause()
//     }
//   }, [isPlaying, srcRef.current])

//   useEffect(() => {
//     if (currentProgressRef.current) {
//       const getCurrentTime = formatTime(currentProgressRef.current)
//       setCurrentTime(getCurrentTime)
//     }
//   }, [currentProgressRef.current])

//   useEffect(() => {
//     let filteredDuration = Math.round(duration / 1000)
//     setSongDuration(filteredDuration)

//     const getEndTime = formatTime(filteredDuration)
//     setEndTime(getEndTime)
//     setCurrentTime("0:00")
//   }, [src])

//   useEffect(() => {
//     if (!srcRef.current) return
//     srcRef.current.pause()
//     srcRef.current.src = src
//     setTrackProgress(srcRef.current.currentTime)
//     currentProgressRef.current = 0
//   }, [src])

//   const currentPercentage = songDuration ? `${(trackProgress / songDuration) * 100 + 0.02}%` : "0%"
//   const trackStyling = `
//     -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #63DEBC), color-stop(${currentPercentage}, ${bgColor}))
//   `

//   const startTimer = () => {
//     if (srcRef.current !== null) {
//       if (intervalRef.current && secondsRef.current) {
//         clearInterval(intervalRef.current)
//         clearInterval(secondsRef.current)
//       }

//       intervalRef.current = setInterval(() => {
//         if (srcRef.current?.ended) {
//           setIsPlaying(false)
//           currentProgressRef.current = 0
//         } else {
//           setTrackProgress(srcRef.current?.currentTime)
//         }
//       }, 100)

//       secondsRef.current = setInterval(() => {
//         if (srcRef.current?.ended) {
//         } else {
//           currentProgressRef.current++
//         }
//       }, 1000)
//     }
//   }

//   const onScrub = (value: string) => {
//     if (intervalRef.current && secondsRef.current) {
//       clearInterval(intervalRef.current)
//       clearInterval(secondsRef.current)
//     }
//     const numberValue: number = parseInt(value)

//     srcRef.current.currentTime = numberValue
//     currentProgressRef.current = Math.round(numberValue)
//     setTrackProgress(srcRef.current.currentTime)
//   }

//   const onScrubEnd = () => {
//     if (!isPlaying) {
//       setIsPlaying(true)
//     }
//     startTimer()
//   }

//   const formatTime = (seconds: number) => {
//     const getMinutes = Math.floor(seconds / 60)
//     const getSeconds = seconds % 60
//     const getFormattedSeconds = getSeconds < 10 ? `0${getSeconds}` : `${getSeconds}`
//     const getFormattedMinutes = getMinutes >= 1 ? getMinutes : 0

//     return `${getFormattedMinutes}:${getFormattedSeconds}`
//   }

//   return {
//     slider: {
//       progress: trackProgress,
//       duration: songDuration,
//       onScrub: onScrub,
//       onScrubEnd: onScrubEnd,
//       style: trackStyling,
//     },
//     time: {
//       current: currentTime,
//       end: endTime,
//     },
//     isPlaying,
//     setIsPlaying,
//   }
// }
