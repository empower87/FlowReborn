import { ReactNode, useState } from "react"
import { PlayButton } from "src/components/buttons/PlayButton"
import { Container } from "src/components/layouts/LayoutWrappers"
import { Beat } from "src/constants"
import { useSuggestionSettingsContext } from "src/features/recording-booth/hooks/useSuggestionSettings"
import { ModalHeader, ModalHeaderButton } from "./SettingsModal"

type BeatItemProps = {
  beat: Beat
  isSelected: boolean
  beatItemButton: ReactNode
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

const BeatItem = ({ beat, isSelected, beatItemButton }: BeatItemProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <Container
      specs="outset row round"
      classes={[
        "settings-modal__select-beat-item",
        `settings-modal__select-beat-item--bs-outset ${isSelected ? "Selected" : ""}`,
      ]}
      dim={["40px", "100%", "85%", "98%"]}
    >
      <Container
        specs="inset row round"
        classes={["settings-modal__select-beat-item-title", "settings-modal__select-beat-item-title--bs-inset"]}
        dim={["100%", "87%", "75%", "97%"]}
      >
        <div className="settings-modal__title-index">
          <div className="settings-modal__title-index--bs-outset">
            <p>{beat.index + 1}</p>
          </div>
        </div>
        {beatItemButton}
      </Container>
      <div className="settings-modal__select-beat-play-btn">
        <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={beat.beat} />
      </div>
    </Container>
  )
}

export default function SelectBeat() {
  const { selectedBeat, beats, selectBeatHandler, closeModalHandler } = useSuggestionSettingsContext()
  return (
    <Container
      specs="inset col square"
      classes={["settings-modal__select-beat", "settings-modal__select-beat--bs-inset"]}
      dim={["200px", "80%", "95%", "97%"]}
      background={"linear-gradient(314deg, #858585 0%, #a7a7a7 100%)"}
    >
      <ModalHeader title="Select a Beat">
        <ModalHeaderButton onClick={closeModalHandler} />
      </ModalHeader>

      {/* <div className="suggestion-settings__header">
        <TitleBar title="Select a Beat" leftButton={<TitleBarButton type="Close" onClick={closeModalHandler} />} />
      </div> */}

      <Container
        specs="inset col square"
        classes={["settings-modal__select-beat-body", "settings-modal__select-beat-body--bs-outset"]}
        dim={["85%", "100%", "95%", "96%"]}
      >
        <ul className="settings-modal__select-beat-list">
          {beats.map((each) => {
            let isSelected = false
            if (each.title === selectedBeat.title) isSelected = true
            return (
              <BeatItem
                key={`${each.title}_${each.index}`}
                beat={each}
                isSelected={isSelected}
                beatItemButton={<BeatItemButton beat={each} onClick={selectBeatHandler} />}
              />
            )
          })}
        </ul>
      </Container>
    </Container>
  )
}
