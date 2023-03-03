import { Icon } from "src/components/buttons/Icon/Icon"
import { SettingsProps } from "../SideSettingsMenu"
import { ModalHeader } from "./SelectBeat"

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

const Header = ({ text }: { text: string }) => {
  return (
    <div className="suggestion-settings__rhyme-suggestions-header">
      <div className="suggestion-settings__rhyme-suggestions-header--bs-outset">
        <p>{text}</p>
      </div>
    </div>
  )
}

const ToggleSuggestionPanels = ({ state, dispatch }: SettingsProps) => {
  const { rhymeSuggestionPanels } = state
  return (
    <div className="suggestion-settings__rhyme-panels">
      <div className="suggestion-settings__rhyme-panels--bs-inset">
        <Header text="Toggle Rhyme Panels" />

        <div className="suggestion-settings__list--container">
          <ul className="suggestion-settings__list">
            <SuggestionToggleButton
              type="LastWord"
              isSelected={rhymeSuggestionPanels.includes("LastWord")}
              onClick={() => dispatch({ type: "UPDATE_PANELS", payload: { rhymeSuggestionPanel: "LastWord" } })}
            />
            <SuggestionToggleButton
              type="Nouns"
              isSelected={rhymeSuggestionPanels.includes("Nouns")}
              onClick={() => dispatch({ type: "UPDATE_PANELS", payload: { rhymeSuggestionPanel: "Nouns" } })}
            />
            <SuggestionToggleButton
              type="Verbs"
              isSelected={rhymeSuggestionPanels.includes("Verbs")}
              onClick={() => dispatch({ type: "UPDATE_PANELS", payload: { rhymeSuggestionPanel: "Verbs" } })}
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

const SuggestionCountSlider = ({ state, dispatch }: SettingsProps) => {
  return (
    <div className="suggestion-settings__rhyme-number">
      <div className="suggestion-settings__rhyme-number--bs-inset">
        <Header text="Rhyme Suggestion Count" />

        <div className="suggestion-settings__rhyme-number-slider">
          <div className="suggestion-settings__rhyme-number Min">1</div>
          <div className="suggestion-settings__slider-input--container">
            <input
              type="range"
              step="1"
              min="1"
              max="8"
              value={state.numOfRhymeSuggestions}
              className="suggestion-settings__slider-input"
              onChange={(e) => dispatch({ type: "SET_NUM_OF_RHYMES", payload: { numOfRhymes: e.target.value } })}
            />
          </div>
          <div className="suggestion-settings__rhyme-number Max">{state.numOfRhymeSuggestions}</div>
        </div>
      </div>
    </div>
  )
}

export default function RhymeSuggestions({ dispatch, state }: SettingsProps) {
  return (
    <div className="settings-modal__rhyme-suggestions">
      <div className="settings-modal__rhyme-suggestions--bs-inset">
        <ModalHeader title={"Rhyme Suggestion Settings"} dispatch={dispatch} />

        <div className="suggestion-settings__body">
          <ToggleSuggestionPanels state={state} dispatch={dispatch} />
          <SuggestionCountSlider state={state} dispatch={dispatch} />
        </div>
      </div>
    </div>
  )
}
