import { ReactNode, useState } from "react"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"

type SettingsModalLayoutProps = {
  type: "Beat" | "RhymeSuggestions" | "Opacity"
  title: string
  children: ReactNode
}

type MinRange = number
type MaxRange = number

type SettingsSliderProps = {
  type: "Opacity" | "NumOfRhymes"
  minMaxTuple: [MinRange, MaxRange]
  step: number
  initialValue: number
  onBlurHandler: (value: number | undefined, type: "Opacity" | "NumOfRhymes") => void
}

export const SettingsSlider = ({ type, minMaxTuple, step, initialValue, onBlurHandler }: SettingsSliderProps) => {
  const [value, setValue] = useState<number | undefined>()

  return (
    <div className="settings-modal__slider">
      <div className="settings-modal__slider-value Min">{value ? value : initialValue}</div>
      <div className="settings-modal__slider-input--container">
        <input
          type="range"
          step={step}
          min={minMaxTuple[0]}
          max={minMaxTuple[1]}
          value={value ? value : initialValue}
          className="settings-modal__slider-input"
          onChange={(e) => setValue(e.target.valueAsNumber)}
          onBlur={() => onBlurHandler(value, type)}
        />
      </div>
      <div className="settings-modal__slider-value Max">{minMaxTuple[1]}</div>
    </div>
  )
}

const CloseModalButton = () => {
  const { toggleSettingsModalHandler } = useSuggestionSettingsContext()
  return (
    <div className="settings-modal__close-btn">
      <RoundButton
        type="Close"
        btnOptions={{ bgColor: BtnColorsEnum.Initial, offset: 8 }}
        iconOptions={{ color: "Primary" }}
        onClick={() => toggleSettingsModalHandler("Hide")}
      />
    </div>
  )
}

export const SettingsModalLayout = ({ type, title, children }: SettingsModalLayoutProps) => {
  return (
    <div className={`settings-modal__modal ${type}`}>
      <div className="settings-modal__modal--bs-inset">
        <div className="settings-modal__header">
          <div className="settings-modal__title--container">
            <div className="settings-modal__title--bs-outset">
              <p className="settings-modal__title">{title}</p>
            </div>
          </div>
          <CloseModalButton />
        </div>

        <div className="settings-modal__content">{children}</div>
      </div>
    </div>
  )
}
