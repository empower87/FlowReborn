import { Icon } from "src/components/buttons/Icon/Icon"
import { SettingsDispatcher, SettingsState } from "../../hooks/useSuggestionSettings"
import SettingsModal from "./SettingsModal/SettingsModal"

export type SettingsProps = {
  state: SettingsState
  dispatch: SettingsDispatcher
}

type SideButtonProps = {
  type: "Opacity" | "Songs" | "AddVideo" | "NoVideo" | "Settings"
  isPressed: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
  size?: number
}

const SideButton = ({ type, isPressed, onClick, size }: SideButtonProps) => {
  return (
    <li className="recording-booth__side-menu-item">
      <button className={`recording-booth__side-menu-btn ${isPressed ? "Pressed" : ""}`} onClick={onClick}>
        <Icon type={type} options={{ color: "Primary", size: size }} />
      </button>
    </li>
  )
}

export default function SideSettingsMenu({ state, dispatch }: SettingsProps) {
  const { toggleModal } = state

  return (
    <>
      <SettingsModal state={state} dispatch={dispatch} />
      <div className="recording-booth__side-menu">
        <div className="recording-booth__side-menu--bs-inset">
          <ul className="recording-booth__side-menu-list">
            <SideButton
              type="Opacity"
              onClick={() => dispatch({ type: "SHOW_MENU", payload: { menu: "UIOpacity" } })}
              isPressed={toggleModal === "UIOpacity"}
              size={75}
            />
            <SideButton
              type="Songs"
              onClick={() => dispatch({ type: "SHOW_MENU", payload: { menu: "Beat" } })}
              isPressed={toggleModal === "Beat"}
              size={80}
            />
            <SideButton
              type={state.recordingType === "video" ? "NoVideo" : "AddVideo"}
              onClick={() => dispatch({ type: "TOGGLE_VIDEO", payload: {} })}
              isPressed={state.recordingType === "video"}
              size={65}
            />
            <SideButton
              type="Settings"
              onClick={() => dispatch({ type: "SHOW_MENU", payload: { menu: "Rhymes" } })}
              isPressed={toggleModal === "Rhymes"}
              size={70}
            />
          </ul>
        </div>
      </div>
    </>
  )
}
