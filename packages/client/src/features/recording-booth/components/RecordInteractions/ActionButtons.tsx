import { ButtonHTMLAttributes, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "src/components/buttons/Icon/Icon"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { useSongDraftsContext } from "../../hooks/useSongDrafts"

interface RecordButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isRecording: boolean
  isDisabled: boolean
  startRecording: () => void
  stopRecording: () => void
}

export const ActionButton = ({
  type,
  onClick,
  size,
}: {
  type: "Undo" | "Check" | "Forward" | "Back"
  onClick: () => void
  size?: number
}) => {
  return (
    <div className="suggestions__side-btn--bs-inset">
      <button className={`suggestions__side-btn ${type}`} onClick={onClick}>
        {type !== "Forward" ? <Icon type={type} options={{ color: "Primary", size: size }} /> : "Next"}
      </button>
    </div>
  )
}

export const RecordButton = ({
  isRecording,
  isDisabled,
  startRecording,
  stopRecording,
  ...props
}: RecordButtonProps) => {
  return (
    <div className={`record-btn`}>
      <div className="record-btn_shadow-div-inset">
        <div className="record-btn_shadow-div-inset-2">
          {isRecording ? (
            <button
              {...props}
              disabled={isDisabled}
              className="record-btn_shadow-div-outset"
              onClick={() => stopRecording()}
            >
              <RoundButton
                type="Stop"
                btnOptions={{ offset: 3, bgColor: BtnColorsEnum.Secondary }}
                iconOptions={{ color: "Primary" }}
              />
            </button>
          ) : (
            <button
              {...props}
              disabled={isDisabled}
              className="record-btn_shadow-div-outset"
              onClick={() => startRecording()}
            >
              <RoundButton
                type="Record"
                btnOptions={{ offset: 3, bgColor: BtnColorsEnum.Secondary }}
                iconOptions={{ color: "Primary", size: 70 }}
              />
            </button>
          )}
          <div className={`record-2_record-btn--animation-div ${isRecording ? "record-btn-animation" : ""}`}></div>
        </div>
      </div>
    </div>
  )
}

export const ConfirmButtonWithModal = () => {
  const renderRef = useRef<number>(0)
  const { allDrafts } = useSongDraftsContext()
  const navigate = useNavigate()

  const navigateToConfirmRecording = () => {
    // going to have to add a isVideo boolean to SongModel which will take a lot of refactoring,
    // so I've hardcoded recordingType that needs to be passed to PostRecording
    navigate("confirm-recording", {
      replace: true,
    })
  }
  console.log(renderRef.current++, "<ConfirmButtonWithModal /> -- Render test")
  return (
    <>
      {allDrafts.length > 0 ? (
        <ActionButton type="Check" size={110} onClick={() => navigateToConfirmRecording()} />
      ) : (
        <></>
      )}
    </>
  )
}

export const ActionButtons = ({
  recordButton,
  postButton,
}: {
  recordButton: JSX.Element
  postButton: JSX.Element | null
}) => {
  // const renderRef = useRef<number>(0)
  // console.log(renderRef.current++, "<ActionButtons /> -- Render test -- Layout 2")
  return (
    <div className="suggestions__action-btns">
      <div className="suggestions__action-btns--container">
        <div className="suggestions__side-btn--container">
          {/* -- used to clear rhyme suggestions, video, and currentTake -- */}
          {/* <BottomButton type="Undo" size={80} onClick={onClick} /> */}
        </div>
        {recordButton}
        <div className="suggestions__side-btn--container">{postButton}</div>
      </div>
    </div>
  )
}
