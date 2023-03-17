import { ReactNode, useEffect, useRef, useState } from "react"
import { Icon } from "src/components/buttons/Icon/Icon"
import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import { ModalHeader, ModalHeaderButton } from "./SettingsModal"

const OPTION_STYLE_1 = {
  borderRadius: "1.2em 0.2em 1.2em 0.2em",
  justifyContent: "flex-end",
}
const OPTION_STYLE_2 = {
  borderRadius: "0.2em 1.2em 0.2em 1.2em",
  justifyContent: "flex-start",
}

const SuggestionSettingOptionLayout = ({
  styleOption,
  headerText,
  children,
}: {
  styleOption: 1 | 2
  headerText: string
  children: ReactNode
}) => {
  const STYLE = styleOption === 1 ? OPTION_STYLE_1 : OPTION_STYLE_2

  return (
    <div className="suggestion-settings__option">
      <div className="suggestion-settings__option--bs-inset" style={{ borderRadius: STYLE.borderRadius }}>
        <div className="suggestion-settings__rhyme-suggestions-header" style={{ justifyContent: STYLE.justifyContent }}>
          <div className="suggestion-settings__rhyme-suggestions-header--bs-outset">
            <p>{headerText}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
const SuggestionToggleButton = ({
  type,
  isSelected,
  onClick,
}: {
  type: string
  isSelected: boolean
  onClick: () => void
}) => {
  return (
    <li className="suggestions__settings-item">
      <button className={`suggestions__settings-item-btn ${isSelected ? "Selected" : ""}`} onClick={onClick}>
        <div className="suggestions__settings-item-btn-text--wrapper">
          <p className="suggestions__settings-item-btn-text">{type}</p>
        </div>
        <div className="suggestions__settings-item-btn-icon">
          <Icon type={isSelected ? "Close" : "Plus"} options={{ color: "White", size: 70, margin: "0% 10% 0% 0%" }} />
        </div>
      </button>
    </li>
  )
}

const ToggleSuggestionPanels = () => {
  const { rhymeSuggestionPanels, updatePanelsHandler } = useSuggestionSettingsContext()

  return (
    <SuggestionSettingOptionLayout styleOption={2} headerText="Toggle Suggestion panels">
      <div className="suggestion-settings__list--container">
        <ul className="suggestion-settings__list">
          <SuggestionToggleButton
            type="LastWord"
            isSelected={rhymeSuggestionPanels.includes("LastWord")}
            onClick={() => updatePanelsHandler("LastWord")}
          />
          <SuggestionToggleButton
            type="Nouns"
            isSelected={rhymeSuggestionPanels.includes("Nouns")}
            onClick={() => updatePanelsHandler("Nouns")}
          />
          <SuggestionToggleButton
            type="Verbs"
            isSelected={rhymeSuggestionPanels.includes("Verbs")}
            onClick={() => updatePanelsHandler("Verbs")}
          />
        </ul>
      </div>
    </SuggestionSettingOptionLayout>
  )
}

const SuggestionCountSlider = () => {
  const { toggleModal, numOfRhymeSuggestions, dispatch } = useSuggestionSettingsContext()
  const [value, setValue] = useState<string>(numOfRhymeSuggestions)

  useEffect(() => {
    if (toggleModal === "Hide") {
      dispatch({ type: "SET_NUM_OF_RHYMES", payload: { numOfRhymes: value } })
    }
  }, [toggleModal])

  return (
    <SuggestionSettingOptionLayout styleOption={1} headerText="Max Rhyme Suggestions">
      <div className="suggestion-settings__rhyme-number-slider">
        <div className="suggestion-settings__rhyme-number Min">1</div>
        <div className="suggestion-settings__slider-input--container">
          <input
            type="range"
            step="1"
            min="1"
            max="8"
            value={value}
            className="suggestion-settings__slider-input"
            onChange={(e) => setValue(e.target.value)}
            // onChange={(e) => dispatch({ type: "SET_NUM_OF_RHYMES", payload: { numOfRhymes: e.target.value } })}
          />
        </div>
        <div className="suggestion-settings__rhyme-number Max">8</div>
      </div>
    </SuggestionSettingOptionLayout>
  )
}

export default function RhymeSuggestions() {
  const { closeModalHandler } = useSuggestionSettingsContext()

  const renderRef = useRef<number>(0)
  console.log(renderRef.current++, "<RhymeSuggestions /> -- Render test -- Layout 1")
  return (
    <div className="settings-modal__rhyme-suggestions">
      <div className="settings-modal__rhyme-suggestions--bs-inset">
        <ModalHeader title="Rhyme Suggestion Settings">
          <ModalHeaderButton onClick={closeModalHandler} />
        </ModalHeader>

        <div className="suggestion-settings__body">
          <ToggleSuggestionPanels />
          <SuggestionCountSlider />
        </div>
      </div>
    </div>
  )
}
