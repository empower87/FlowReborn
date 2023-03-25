import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import TitleBar, { TitleBarButton } from "src/components/ui/TitleBar"
import { useSuggestionSettingsContext } from "../hooks/useSuggestionSettings"

type TitleProps = {
  isRecording: boolean
  minutes: number
  seconds: number
  // duration: number
}

// export const RecordingTitle = ({ isRecording, minutes, seconds }: TitleProps) => {
//   const count = useRenderCount()
//   const renderRef = useRef(0)
//   const handleRecordingTime = (minutes: number, seconds: number) => {
//     let formattedSeconds = `${seconds}`
//     if (seconds <= 9) {
//       formattedSeconds = `0${seconds}`
//     }
//     let formattedTime = `${minutes}:${formattedSeconds}`
//     return formattedTime
//   }

//   console.log(count, renderRef.current++, "<Title /> -- Render test")
//   return (
//     <p className={`recording__title ${isRecording ? "isRecording" : ""}`}>
//       {isRecording ? `Recording in Progress: ${handleRecordingTime(minutes, seconds)}` : `Recording Booth`}
//     </p>
//   )
// }

const Title = () => {
  const renderRef = useRef<number>(0)
  console.log(
    renderRef.current++,
    "<TITLE /> -- Render test -- SHOULD RERENDER BEING UNDER SETTINGS PROVIDER UNFORTUNATELY"
  )
  return <p className="recording__title">Recording Booth</p>
}

export default function Header() {
  const navigate = useNavigate()
  const { UIOpacity } = useSuggestionSettingsContext()
  return (
    <div className="recording__header--container" style={{ opacity: UIOpacity }}>
      <TitleBar title={<Title />} leftButton={<TitleBarButton type="Back" size={80} onClick={() => navigate(-1)} />} />
    </div>
  )
}
