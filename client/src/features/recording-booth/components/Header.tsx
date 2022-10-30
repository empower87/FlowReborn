import { MouseEventHandler, ReactNode } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"

type TitleProps = {
  isRecording: boolean
  minutes: number
  seconds: number
}

type HeaderProps = {
  type: "Back" | "Close"
  opacity: string
  onClose: MouseEventHandler<HTMLButtonElement>
  title: ReactNode
}

interface HeaderButtonProps extends Pick<HeaderProps, "type" | "onClose"> {
  size?: number
}

const HeaderButton = ({ type, size, onClose }: HeaderButtonProps) => {
  return (
    <button className="recording__header-go-back-btn" type="button" onClick={onClose}>
      <Icon type={ButtonTypes[type]} options={{ color: "White", size: size }} />
    </button>
  )
}

export const Title = ({ isRecording, minutes, seconds }: TitleProps) => {
  const handleRecordingTime = (minutes: number, seconds: number) => {
    let formattedSeconds = `${seconds}`
    if (seconds <= 9) {
      formattedSeconds = `0${seconds}`
    }
    let formattedTime = `${minutes}:${formattedSeconds}`
    return formattedTime
  }

  return (
    <p className={`recording__title ${isRecording ? "isRecording" : ""}`}>
      {isRecording ? `Recording in Progress: ${handleRecordingTime(minutes, seconds)}` : `Recording Booth`}
    </p>
  )
}

export default function Header({ type, opacity, title, onClose }: HeaderProps) {
  return (
    <div className="recording__header" style={{ opacity: opacity }}>
      <div className="recording__header--bs-inset">
        <div className={`recording__header-left ${type === "Back" ? "Back" : "Close"}`}>
          <HeaderButton type={type} onClose={onClose} size={type === "Back" ? 100 : undefined} />
        </div>

        <div className="recording__header-right">{title}</div>
      </div>
    </div>
  )
}
