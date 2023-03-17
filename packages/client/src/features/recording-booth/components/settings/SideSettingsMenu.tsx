import { useRef } from "react"
import { Icon } from "src/components/buttons/Icon/Icon"
import { SettingsDispatcher, SettingsState, useSuggestionSettingsContext } from "../../hooks/useSuggestionSettings"
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

// export default function SideSettingsMenu({ state, dispatch }: SettingsProps) {
export default function SideSettingsMenu() {
  const { toggleModal, recordingType, toggleMediaTypeHandler, toggleSuggestionModalHandler } =
    useSuggestionSettingsContext()

  const renderRef = useRef<number>(0)
  console.log(renderRef.current++, "<SideSettingsMenu /> -- Render test -- Layout 1")
  return (
    <>
      <SettingsModal />

      <div className="recording-booth__side-menu">
        <div className="recording-booth__side-menu--bs-inset">
          <ul className="recording-booth__side-menu-list">
            <SideButton
              type="Opacity"
              onClick={() => toggleSuggestionModalHandler("UIOpacity")}
              isPressed={toggleModal === "UIOpacity"}
              size={75}
            />
            <SideButton
              type="Songs"
              onClick={() => toggleSuggestionModalHandler("Beat")}
              isPressed={toggleModal === "Beat"}
              size={80}
            />
            <SideButton
              type={recordingType === "video" ? "NoVideo" : "AddVideo"}
              onClick={() => toggleMediaTypeHandler()}
              isPressed={recordingType === "video"}
              size={65}
            />
            <SideButton
              type="Settings"
              onClick={() => toggleSuggestionModalHandler("Rhymes")}
              isPressed={toggleModal === "Rhymes"}
              size={70}
            />
          </ul>
        </div>
      </div>
    </>
  )
}
