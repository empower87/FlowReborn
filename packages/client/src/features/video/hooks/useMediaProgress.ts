import { useEffect, useState } from "react"

const INITIAL_VALUE: State = {
  isScrubbing: false,
  seekValue: null,
  progress: 0,
  currentProgressPercent: "0%",
}

type State = {
  isScrubbing: boolean
  seekValue: number | null
  progress: number
  currentProgressPercent: string
}

type Action = {
  type: string
  payload: any
}

const mediaSliderReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SCRUBBING":

    default:
      return state
  }
}

export const useMediaProgress = (
  videoRef: React.RefObject<HTMLVideoElement>,
  duration: number,
  isPlaying: boolean,
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [progress, setProgress] = useState<number>(0)
  const [isScrubbing, setIsScrubbing] = useState<boolean>(false)
  const [seekValue, setSeekValue] = useState<number | null>(null)
  const [currentPercentage, setCurrentPercentage] = useState<string>("0%")

  const roundedDuration = Math.round(duration / 1000)

  useEffect(() => {
    setCurrentPercentage(`${(progress / roundedDuration) * 100 + 0.02}%`)
  }, [progress])

  // useEffect(() => {
  //   if (isScrubbing && isPlaying) {
  //     setIsPlaying(false)
  //   } else {
  //     setIsPlaying(true)
  //   }
  // }, [isScrubbing])

  useEffect(() => {
    if (isScrubbing) {
    } else {
    }
  }, [isScrubbing])

  const handleTimeUpdate = () => {
    // pause this function on scrub
    if (!videoRef.current || isScrubbing) return
    const currentTime = videoRef.current.currentTime
    console.log(currentTime, "is this updating every second?")
    setProgress(currentTime)
  }

  useEffect(() => {
    if (!videoRef.current) return
    videoRef.current.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      if (!videoRef.current) return
      videoRef.current.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [videoRef.current])

  // useEffect(() => {
  //   if (!isScrubbing && seekValue && videoRef.current) {
  //     videoRef.current.currentTime = progress
  //     setSeekValue(null)
  //   }
  // }, [isScrubbing, seekValue])

  useEffect(() => {
    if (isScrubbing) {
    }
  }, [])

  const onScrub = (value: string) => {
    if (!videoRef.current) return

    const newTime = parseInt(value)
    // videoRef.current.currentTime = newTime
    // setProgress(newTime)
    setIsScrubbing(true)

    setSeekValue(newTime)
  }

  const onScrubEnd = () => {
    if (!videoRef.current || !seekValue) return
    setIsScrubbing(false)
    videoRef.current.currentTime = seekValue
    setProgress(seekValue)
    setSeekValue(null)
  }

  return {
    progress,
    seekValue,
    isScrubbing,
    currentPercentage,
    onScrub,
    onScrubEnd,
  }
}
