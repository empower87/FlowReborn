import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import { SettingsModalLayout, SettingsSlider } from "./SettingsModal"

export default function OpacitySlider() {
  const { UIOpacity, setUIOpacityHandler } = useSuggestionSettingsContext()
  return (
    <SettingsModalLayout type="Opacity" title="Set UI Opacity">
      {/* <div className="suggestion-settings__opacity--wrapper"> */}
      <SettingsSlider minMaxTuple={[0, 1]} step={0.1} initialValue={UIOpacity} onBlurHandler={setUIOpacityHandler} />
      {/* </div> */}
    </SettingsModalLayout>
  )
}
