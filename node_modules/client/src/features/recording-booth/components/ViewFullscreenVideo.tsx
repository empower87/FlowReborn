import { Dispatch, SetStateAction } from "react"
import ReactDOM from "react-dom"
import { ActionButton } from "./RecordInteractions/ActionButtons"

type ViewFullscreenVideoProps = {
  src: string | undefined
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  onNext: () => void
}

export default function ViewFullscreenVideo({ src, isOpen, onClose, onNext }: ViewFullscreenVideoProps) {
  const root = document.getElementById("root")!

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="fullscreen-video">
      <div className="fullscreen-video__header">
        <div className="fullscreen-video__header-btns back">
          <ActionButton type="Back" onClick={() => onClose(false)} size={80} />
        </div>
        <div className="fullscreen-video__header-btns next">
          <ActionButton type="Forward" onClick={() => onNext()} />
        </div>
      </div>
      <video src={src} className="fullscreen-video__video" autoPlay loop playsInline></video>
    </div>,
    root
  )
}
