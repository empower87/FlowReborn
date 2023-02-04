import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { closeIcon } from "../../assets/images/_icons"
import { ButtonTypes, Icon } from "./Icon/Icon"

type Props = {
  inset: boolean
  shadowColors: Array<string>
  buttonSize?: number
  value: string
  setValue: Dispatch<SetStateAction<string>>
}

export default function ButtonClearText({ inset, shadowColors, buttonSize = 68, value, setValue }: Props) {
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!buttonContainerRef.current || !buttonRef.current) return
    if (value) {
      buttonContainerRef.current.style.width = `${buttonContainerRef.current.getBoundingClientRect().height + 10}px`
      buttonRef.current.style.opacity = "1"
    } else {
      buttonContainerRef.current.style.width = "0%"
      buttonRef.current.style.opacity = "0"
    }
  }, [value])

  const clearInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonContainerRef.current || !buttonRef.current) return
    e.preventDefault()
    setValue("")
    buttonContainerRef.current.style.width = "0%"
    buttonRef.current.style.opacity = "0"
  }

  const insetStyles = {
    height: `${buttonSize}%`,
    width: `${buttonSize}%`,
    boxShadow: `2px 2px 3px ${shadowColors[2]}, -1px -1px 2px 0px ${shadowColors[3]}`,
  }

  return (
    <div className="ButtonClearText" ref={buttonContainerRef}>
      <div
        className="btn-clear--shadow-inset"
        ref={buttonRef}
        style={
          !inset
            ? { boxShadow: "none" }
            : {
                boxShadow: `inset 2px 2px 3px ${shadowColors[0]}, inset -2px -2px 2px ${shadowColors[1]}`,
              }
        }
      >
        <button
          className="btn-clear--shadow-outset"
          style={insetStyles}
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => clearInput(e)}
          tabIndex={-1}
        >
          <img className="button-icons" src={closeIcon} alt="clear text button" />
        </button>
      </div>
    </div>
  )
}

export const ClearTextButton = ({
  isTouched,
  onClick,
  boxShadows,
  height,
  position,
}: {
  isTouched: boolean
  onClick: () => void
  boxShadows: { outset: string; inset?: string }
  height?: string
  position?: [number, number]
}) => {
  const buttonContainerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!buttonContainerRef.current || !buttonRef.current) return
    if (isTouched) {
      buttonContainerRef.current.style.width = `${buttonContainerRef.current.getBoundingClientRect().height + 5}px`
      buttonRef.current.style.opacity = "1"
    } else {
      buttonContainerRef.current.style.width = "0%"
      buttonRef.current.style.opacity = "0"
    }
  }, [isTouched])

  return (
    <div className="ButtonClearText" ref={buttonContainerRef} style={{ height: height ? height : "100%" }}>
      <div
        className="btn-clear--shadow-inset"
        ref={buttonRef}
        style={
          position
            ? {
                position: "absolute",
                top: `${position[0]}%`,
                left: `${position[1]}%`,
                boxShadow: boxShadows.inset ? boxShadows.inset : "",
              }
            : {}
        }
      >
        <button
          type="button"
          className="btn-clear--shadow-outset"
          style={{ boxShadow: boxShadows.outset }}
          onMouseDown={(e) => e.preventDefault()}
          onClick={onClick}
          tabIndex={-1}
        >
          <Icon type={ButtonTypes.Close} options={{ color: "Primary" }} />
          {/* <img className="button-icons" src={closeIcon} alt="clear text button" /> */}
        </button>
      </div>
    </div>
  )
}
