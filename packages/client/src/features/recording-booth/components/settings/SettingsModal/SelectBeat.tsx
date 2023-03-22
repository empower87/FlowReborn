import { useState } from "react"
import { PlayButton } from "src/components/buttons/PlayButton"
import { Beat } from "src/constants"
import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import { SettingsModalLayout } from "./SettingsModal"

type BeatItemProps = {
  beat: Beat
  isSelected: boolean
  selectBeatHandler: (beat: Beat) => void
}

const BeatItemButton = ({ beat, onClick }: { beat: Beat; onClick: (beat: Beat) => void }) => {
  return (
    <button className="settings-modal__title-text" onClick={() => onClick(beat)}>
      <div className="settings-modal__title-text--bs-outset">
        <p>{beat.title}</p>
      </div>
    </button>
  )
}

const BeatItem = ({ beat, isSelected, selectBeatHandler }: BeatItemProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <div className="settings-modal__select-beat-item">
      <div className={`settings-modal__select-beat-item--bs-outset ${isSelected ? "Selected" : ""}`}>
        <div className="settings-modal__select-beat-item-title">
          <div className="settings-modal__select-beat-item-title--bs-inset">
            <div className="settings-modal__title-index">
              <div className="settings-modal__title-index--bs-outset">
                <p>{beat.index + 1}</p>
              </div>
            </div>
            <BeatItemButton beat={beat} onClick={selectBeatHandler} />
          </div>
        </div>

        <div className="settings-modal__select-beat-play-btn">
          <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={beat.beat} />
        </div>
      </div>
    </div>
  )
}

const SelectBeatList = () => {
  const { selectedBeat, beats, selectBeatHandler } = useSuggestionSettingsContext()
  return (
    <div className="settings-modal__select-beat-body--bs-outset">
      <ul className="settings-modal__select-beat-list">
        {beats.map((each) => {
          let isSelected = false
          if (each.title === selectedBeat.title) isSelected = true
          return (
            <BeatItem
              key={`${each.title}_${each.index}`}
              beat={each}
              isSelected={isSelected}
              selectBeatHandler={selectBeatHandler}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default function SelectBeatModal() {
  return (
    <SettingsModalLayout type="Beat" title="Select A Beat">
      <SelectBeatList />
    </SettingsModalLayout>
  )
}
