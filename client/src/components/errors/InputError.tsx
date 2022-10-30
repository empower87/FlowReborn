import { Dispatch, PropsWithChildren, SetStateAction } from "react"
import ReactDOM from "react-dom"
import { errorIcon } from "../../assets/images/_icons"

type StyleOptionsType = {
  position: number[]
  size: number[]
}

type InputErrorType = PropsWithChildren<{
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  message: string
  options: StyleOptionsType
}>

export default function InputError({ isOpen, onClose, message, options, children }: InputErrorType) {
  const root = document.getElementById("root")!

  const modalSpecs = {
    top: `${options.position[0]}%`,
    left: `${options.position[1]}%`,
    height: `${options.size[0]}px`,
    width: `${options.size[1]}%`,
    zIndex: 6,
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="error-container--input-err" style={modalSpecs}>
      <div className="error--shadow-inset">
        <div className="icon-container">
          <button className="icon--shadow-outset">
            <div className="icon--shadow-inset">
              <img className="button-icons" src={errorIcon} alt="exit x button" />
            </div>
          </button>
        </div>

        <div className="text-container">
          <div className="text--shadow-outset">
            <div className="text-err-container">
              <p className="error-text">{message}</p>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>,
    root
  )
}
