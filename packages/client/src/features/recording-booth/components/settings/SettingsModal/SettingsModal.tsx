import { ReactNode, useState } from "react"
import ReactDOM from "react-dom"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import OpacitySlider from "./OpacitySlider"
import RhymeSuggestionsModal from "./RhymeSuggestionsModal"
import SelectBeatModal from "./SelectBeat"

type SettingsModalLayoutProps = {
  type: "Beat" | "RhymeSuggestions" | "Opacity"
  title: string
  children: ReactNode
}

const ModalHeaderButton = () => {
  const { closeModalHandler } = useSuggestionSettingsContext()
  return (
    <div className="suggestion-settings__close">
      <RoundButton
        type="Close"
        btnOptions={{ bgColor: BtnColorsEnum.Initial, offset: 8 }}
        iconOptions={{ color: "Primary" }}
        onClick={() => closeModalHandler()}
      />
    </div>
  )
}

const ModalHeader = ({ title, children }: { title: string; children: ReactNode }) => {
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

export const SettingsModalLayout = ({ type, title, children }: SettingsModalLayoutProps) => {
  return (
    <div className={`settings-modal__modal ${type}`}>
      <div className="settings-modal__modal--bs-inset">
        <ModalHeader title={title}>
          <ModalHeaderButton />
        </ModalHeader>
        <div className="settings-modal__children--wrapper">{children}</div>
      </div>
    </div>
  )
}

type MinRange = number
type MaxRange = number

type SettingsSliderProps = {
  minMaxTuple: [MinRange, MaxRange]
  step: number
  initialValue: number
  onBlurHandler: (value: number | undefined) => void
}

export const SettingsSlider = ({ minMaxTuple, step, initialValue, onBlurHandler }: SettingsSliderProps) => {
  const [value, setValue] = useState<number | undefined>()

  return (
    <div className="suggestion-settings__rhyme-number-slider">
      <div className="suggestion-settings__rhyme-number Min">{value ? value : initialValue}</div>
      <div className="suggestion-settings__slider-input--container">
        <input
          type="range"
          step={step}
          min={minMaxTuple[0]}
          max={minMaxTuple[1]}
          value={value ? value : initialValue}
          className="suggestion-settings__slider-input"
          onChange={(e) => setValue(e.target.valueAsNumber)}
          onBlur={() => onBlurHandler(value)}
        />
      </div>
      <div className="suggestion-settings__rhyme-number Max">{minMaxTuple[1]}</div>
    </div>
  )
}
export default function SettingsModal() {
  const { toggleModal, toggleSuggestionModalHandler } = useSuggestionSettingsContext()
  const root = document.getElementById("root")!

  const onCloseHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    if (e.target === e.currentTarget) {
      toggleSuggestionModalHandler("Hide")
    }
  }

  if (toggleModal === "Hide") return null
  return ReactDOM.createPortal(
    <div className="settings-modal__background" onClick={(e) => onCloseHandler(e)}>
      {toggleModal === "Rhymes" && <RhymeSuggestionsModal />}
      {toggleModal === "Beat" && <SelectBeatModal />}
      {toggleModal === "UIOpacity" && <OpacitySlider />}
    </div>,
    root
  )
}
