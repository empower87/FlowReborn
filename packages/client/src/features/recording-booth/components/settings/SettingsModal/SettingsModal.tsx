import ReactDOM from "react-dom"
import { SettingsProps } from "../SideSettingsMenu"
import OpacitySlider from "./OpacitySlider"
import RhymeSuggestions from "./RhymeSuggestions"
import SelectBeat from "./SelectBeat"

export default function SettingsModal({ state, dispatch }: SettingsProps) {
  const root = document.getElementById("root")!
  const { toggleModal } = state

  const onCloseHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      dispatch({ type: "SHOW_MENU", payload: { menu: "Hide" } })
    }
  }

  if (toggleModal === "Hide") return null
  return ReactDOM.createPortal(
    <div className="settings-modal__background" onClick={(e) => onCloseHandler(e)}>
      {toggleModal === "Rhymes" && <RhymeSuggestions state={state} dispatch={dispatch} />}
      {toggleModal === "Beat" && <SelectBeat state={state} dispatch={dispatch} />}
      {toggleModal === "UIOpacity" && <OpacitySlider UIOpacity={state.UIOpacity} dispatch={dispatch} />}
    </div>,
    root
  )
}
