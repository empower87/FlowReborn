import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"

export default function OpacitySlider() {
  const { UIOpacity, dispatch } = useSuggestionSettingsContext()
  return (
    <div className="settings-modal__opacity-slider">
      <div className="opacity-slider--bs-inset">
        <div className="opacity-slider__number">0</div>
        <div className="opacity-slider__input--wrapper">
          <input
            type="range"
            className="opacity-slider__input"
            step=".1"
            min=".2"
            max="1"
            value={UIOpacity}
            onChange={(e) => dispatch({ type: "SET_UIOPACITY", payload: { UIOpacity: e.target.value } })}
            // onKeyUp={() => onClose(false)}
            // onMouseUp={() => onClose(false)}
            // onTouchEnd={() => onClose(false)}
          />
        </div>
        <div className="opacity-slider__number">{UIOpacity}</div>
      </div>
    </div>
  )
}
