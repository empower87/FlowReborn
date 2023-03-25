import ReactDOM from "react-dom"
import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import OpacitySlider from "./OpacitySlider"
import RhymeSuggestionsModal from "./RhymeSuggestionsModal"
import SelectBeatModal from "./SelectBeat"

export default function SettingsModal() {
  const { toggleModal, toggleSettingsModalHandler } = useSuggestionSettingsContext()
  const root = document.getElementById("root")!

  const closeModalOnOutsideClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      toggleSettingsModalHandler("Hide")
    }
  }

  if (toggleModal === "Hide") return null
  return ReactDOM.createPortal(
    <div className="settings-modal__background" onClick={(e) => closeModalOnOutsideClickHandler(e)}>
      {toggleModal === "Rhymes" && <RhymeSuggestionsModal />}
      {toggleModal === "Beat" && <SelectBeatModal />}
      {toggleModal === "UIOpacity" && <OpacitySlider />}
    </div>,
    root
  )
}
