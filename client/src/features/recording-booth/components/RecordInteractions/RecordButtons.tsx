import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"

type RecordButtonProps = {
  isRecording: boolean
  startRecording: () => void
  stopRecording: () => void
}

export const BottomButton = ({
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
        {type !== "Forward" ? <Icon type={ButtonTypes[type]} options={{ color: "Primary", size: size }} /> : "Next"}
      </button>
    </div>
  )
}

export const ActionButtons = ({ recordButton, postButton }: { recordButton: JSX.Element; postButton: JSX.Element }) => {
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

export const RecordButton = ({ isRecording, startRecording, stopRecording }: RecordButtonProps) => {
  return (
    <div className={`record-btn`}>
      <div className="record-btn_shadow-div-inset">
        <div className="record-btn_shadow-div-inset-2">
          {isRecording ? (
            <div className="record-btn_shadow-div-outset" onClick={() => stopRecording()}>
              <RoundButton
                type={ButtonTypes.Stop}
                btnOptions={{ offset: 3, bgColor: BtnColorsEnum.Secondary }}
                iconOptions={{ color: "Primary" }}
              />
            </div>
          ) : (
            <div className="record-btn_shadow-div-outset" onClick={() => startRecording()}>
              <RoundButton
                type={ButtonTypes.Record}
                btnOptions={{ offset: 3, bgColor: BtnColorsEnum.Secondary }}
                iconOptions={{ color: "Primary", size: 70 }}
              />
            </div>
          )}
          <div className={`record-2_record-btn--animation-div ${isRecording ? "record-btn-animation" : ""}`}></div>
        </div>
      </div>
    </div>
  )
}
