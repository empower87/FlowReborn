import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { BtnColorsEnum, RoundButton } from "./RoundButton/RoundButton"

type PlayButtonProps = {
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
  options?: ButtonStyleOptions
  audio?: any
}

type ButtonStyleOptions = {
  offset?: number
  margin?: string
  flexJC?: string
}

export const PlayButton = ({ isPlaying, setIsPlaying, options, audio }: PlayButtonProps) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(audio))

  useEffect(() => {
    audioRef.current = new Audio(audio)
  }, [audio])

  useEffect(() => {
    let pauseRef = audioRef.current
    return () => {
      pauseRef.pause()
      setIsPlaying(false)
    }
  }, [audio, setIsPlaying])

  useEffect(() => {
    if (!audio) return
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, audio])

  return (
    <div className="PlayButton__wrapper">
      {isPlaying ? (
        <RoundButton
          type="Pause"
          btnOptions={{ bgColor: BtnColorsEnum.Primary }}
          iconOptions={{ color: "White" }}
          onClick={() => setIsPlaying((prev) => !prev)}
        />
      ) : (
        <RoundButton
          type="Play"
          btnOptions={{ bgColor: BtnColorsEnum.Primary }}
          iconOptions={{ color: "White", margin: "0% 0% 0% 12%" }}
          onClick={() => setIsPlaying((prev) => !prev)}
        />
      )}
    </div>
  )
}

type PlaybackButtonProps = {
  isPlaying: boolean
  setIsPlaying: () => void
  options?: ButtonStyleOptions
  audio?: any
}

export const PlaybackButton = ({ isPlaying, setIsPlaying, options, audio }: PlaybackButtonProps) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio(audio))

  useEffect(() => {
    audioRef.current = new Audio(audio)
  }, [audio])

  useEffect(() => {
    let pauseRef = audioRef.current
    return () => {
      pauseRef.pause()
    }
  }, [audio])

  useEffect(() => {
    if (!audio) return
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, audio])

  return (
    <div className="PlayButton__wrapper">
      {isPlaying ? (
        <RoundButton
          type="Pause"
          btnOptions={{ bgColor: BtnColorsEnum.Primary }}
          iconOptions={{ color: "White" }}
          onClick={() => setIsPlaying()}
        />
      ) : (
        <RoundButton
          type="Play"
          btnOptions={{ bgColor: BtnColorsEnum.Primary }}
          iconOptions={{ color: "White", margin: "0% 0% 0% 12%" }}
          onClick={() => setIsPlaying()}
        />
      )}
    </div>
  )
}

type PlayPauseButtonProps = {
  isPlaying: boolean
  onPlayPause: () => void
}

export const PlayPauseButton = ({ isPlaying, onPlayPause }: PlayPauseButtonProps) => {
  return (
    <div className="PlayButton__wrapper">
      {isPlaying ? (
        <RoundButton
          type="Pause"
          btnOptions={{ bgColor: BtnColorsEnum.Primary }}
          iconOptions={{ color: "White" }}
          onClick={() => onPlayPause()}
        />
      ) : (
        <RoundButton
          type="Play"
          btnOptions={{ bgColor: BtnColorsEnum.Primary }}
          iconOptions={{ color: "White", margin: "0% 0% 0% 12%" }}
          onClick={() => onPlayPause()}
        />
      )}
    </div>
  )
}
