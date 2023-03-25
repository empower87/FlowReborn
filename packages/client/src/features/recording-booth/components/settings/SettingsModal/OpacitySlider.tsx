import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import { SettingsModalLayout, SettingsSlider } from "./ModalUI"

export default function OpacitySlider() {
  const { UIOpacity, sliderValueHandler } = useSuggestionSettingsContext()
  return (
    <SettingsModalLayout type="Opacity" title="Set UI Opacity">
      <SettingsSlider
        type="Opacity"
        minMaxTuple={[0, 1]}
        step={0.1}
        initialValue={UIOpacity}
        onBlurHandler={sliderValueHandler}
      />
    </SettingsModalLayout>
  )
}
