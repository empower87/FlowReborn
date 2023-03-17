import { ReactNode } from "react"
import ReactDOM from "react-dom"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import OpacitySlider from "./OpacitySlider"
import RhymeSuggestions from "./RhymeSuggestions"
import SelectBeat from "./SelectBeat"

export const ModalHeaderButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="suggestion-settings__close">
      <RoundButton
        type="Close"
        btnOptions={{ bgColor: BtnColorsEnum.Initial, offset: 8 }}
        iconOptions={{ color: "Primary" }}
        onClick={() => onClick()}
      />
    </div>
  )
}

export const ModalHeader = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="suggestion-settings__header">
      <div className="suggestion-settings__header-title">
        <div className="suggestion-settings__header-title--bs-outset">
          <p>{title}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

export default function SettingsModal() {
  const { toggleModal, dispatch } = useSuggestionSettingsContext()
  const root = document.getElementById("root")!

  const onCloseHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      dispatch({ type: "SHOW_MENU", payload: { menu: "Hide" } })
    }
  }

  if (toggleModal === "Hide") return null
  return ReactDOM.createPortal(
    <div className="settings-modal__background" onClick={(e) => onCloseHandler(e)}>
      {toggleModal === "Rhymes" && <RhymeSuggestions />}
      {toggleModal === "Beat" && <SelectBeat />}
      {toggleModal === "UIOpacity" && <OpacitySlider />}
    </div>,
    root
  )
}
