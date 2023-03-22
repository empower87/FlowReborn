import { ReactNode, useRef } from "react"
import { Icon } from "src/components/buttons/Icon/Icon"
import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import { SettingsModalLayout, SettingsSlider } from "./SettingsModal"

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
    <li className="suggestion-settings__item">
      <div className="suggestion-settings__option--bs-inset" style={{ borderRadius: STYLE.borderRadius }}>
        <div className="suggestion-settings__rhyme-suggestions-header" style={{ justifyContent: STYLE.justifyContent }}>
          <div className="suggestion-settings__rhyme-suggestions-header--bs-outset">
            <p>{headerText}</p>
          </div>
        </div>
        <div className="suggestion-settings__item-children--wrapper">{children}</div>
      </div>
    </li>
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

const SuggestionToggleButtons = () => {
  const { rhymeSuggestionPanels, updatePanelsHandler } = useSuggestionSettingsContext()
  return (
    <>
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
    </>
  )
}

const ToggleSuggestionFramesItem = () => {
  return (
    <SuggestionSettingOptionLayout styleOption={2} headerText="Toggle Suggestion Frame">
      <ul className="suggestion-settings__toggle-list">
        <SuggestionToggleButtons />
      </ul>
    </SuggestionSettingOptionLayout>
  )
}

const NumOfRhymeSuggestionsSlider = () => {
  const { numOfRhymeSuggestions, setNumOfRhymeSuggestionsHandler } = useSuggestionSettingsContext()
  const MIN_NUM_OF_RHYMES = 1
  const MAX_NUM_OF_RHYMES = 8
  const INITIAL_VALUE = numOfRhymeSuggestions

  return (
    <SettingsSlider
      minMaxTuple={[MIN_NUM_OF_RHYMES, MAX_NUM_OF_RHYMES]}
      step={1}
      initialValue={INITIAL_VALUE}
      onBlurHandler={setNumOfRhymeSuggestionsHandler}
    />
  )
}

const NumOfRhymeSuggestionsItem = () => {
  return (
    <SuggestionSettingOptionLayout styleOption={1} headerText="Max Rhyme Suggestions">
      <NumOfRhymeSuggestionsSlider />
    </SuggestionSettingOptionLayout>
  )
}

export default function RhymeSuggestionsModal() {
  const renderRef = useRef<number>(0)
  console.log(renderRef.current++, "<RhymeSuggestions /> -- Render test -- Layout 1")
  return (
    <SettingsModalLayout type="RhymeSuggestions" title="Rhyme Suggestion Settings">
      <ul className="suggestion-settings__list">
        <ToggleSuggestionFramesItem />
        <NumOfRhymeSuggestionsItem />
      </ul>
    </SettingsModalLayout>
  )
}
