import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { ButtonTypes } from "./Icon/Icon"
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
          type={ButtonTypes.Pause}
          btnOptions={{ bgColor: BtnColorsEnum.Primary }}
          iconOptions={{ color: "White" }}
          onClick={() => setIsPlaying((prev) => !prev)}
        />
      ) : (
        <RoundButton
          type={ButtonTypes.Play}
          btnOptions={{ bgColor: BtnColorsEnum.Primary }}
          iconOptions={{ color: "White", margin: "0% 0% 0% 12%" }}
          onClick={() => setIsPlaying((prev) => !prev)}
        />
      )}
      {/* <button
        className={`PlayButton ${isPlaying ? 'pause' : 'play'}`}
        style={{
          height: `${sizeRef.current[0]}px`,
          width: `${sizeRef.current[1]}px`,
          margin: margin,
        }}
        aria-label={isPlaying ? 'Play' : 'Pause'}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <img
          className={`button-icons bi-${isPlaying ? 'pause' : 'play'}`}
          id="play-stop-img"
          src={isPlaying ? pauseIcon : playIcon}
          alt="icon"
        />
      </button> */}
    </div>
  )
}
// import React, {
//   useEffect,
//   useLayoutEffect,
//   useState,
//   useRef,
//   Dispatch,
//   SetStateAction,
// } from 'react'
// import { pauseIcon, playIcon } from '../../assets/images/_icons'
// import { calculateButtonSize } from '../../utils/styleCalculators'

// type PlayButtonProps = {
//   isPlaying: boolean
//   setIsPlaying: Dispatch<SetStateAction<boolean>>
//   options?: ButtonStyleOptions
//   audio?: any
// }

// type ButtonStyleOptions = {
//   offset?: number
//   margin?: string
//   flexJC?: string
// }

// export const PlayButton = ({ isPlaying, setIsPlaying, options, audio }: PlayButtonProps) => {
//   const [justifyContent, setJustifyContent] = useState<string>('')
//   const [margin, setMargin] = useState<string>('')

//   const audioRef = useRef<HTMLAudioElement>(new Audio(audio))
//   const wrapperRef = useRef<HTMLDivElement>(null)
//   const sizeRef = useRef<number[]>([])

//   useEffect(() => {
//     let pauseRef = audioRef.current
//     return () => {
//       pauseRef.pause()
//       setIsPlaying(false)
//     }
//   }, [])

//   useEffect(() => {
//     if (!audio) return
//     if (isPlaying) {
//       audioRef.current.play()
//     } else {
//       audioRef.current.pause()
//     }
//   }, [isPlaying])

//   useLayoutEffect(() => {
//     if (!wrapperRef.current) return
//     const width = wrapperRef.current.offsetWidth
//     const height = wrapperRef.current.offsetHeight
//     const offset = options?.offset ? options.offset : 6

//     sizeRef.current = calculateButtonSize(height, width, offset)
//   }, [wrapperRef.current, sizeRef.current])

//   useEffect(() => {
//     if (options?.flexJC) {
//       setJustifyContent(options.flexJC)
//     }
//     if (options?.margin) {
//       setMargin(options.margin)
//     }
//   }, [options])

//   return (
//     <div
//       className="PlayButton__wrapper"
//       ref={wrapperRef}
//       style={{ justifyContent: justifyContent }}
//     >
//       <button
//         className={`PlayButton ${isPlaying ? 'pause' : 'play'}`}
//         style={{
//           height: `${sizeRef.current[0]}px`,
//           width: `${sizeRef.current[1]}px`,
//           margin: margin,
//         }}
//         aria-label={isPlaying ? 'Play' : 'Pause'}
//         onClick={() => setIsPlaying(!isPlaying)}
//       >
//         <img
//           className={`button-icons bi-${isPlaying ? 'pause' : 'play'}`}
//           id="play-stop-img"
//           src={isPlaying ? pauseIcon : playIcon}
//           alt="icon"
//         />
//       </button>
//     </div>
//   )
// }
