import { useState } from "react"
import { PlayButton } from "src/components/buttons/PlayButton"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { Container } from "src/components/layouts/LayoutWrappers"
import { Beat, beatList } from "src/constants"
import { SettingsDispatcher } from "src/features/recording-booth/hooks/useSuggestionSettings"
import { SettingsProps } from "../SideSettingsMenu"

interface BeatItemProps extends SettingsProps {
  beat: Beat
}

export const ModalHeader = ({ title, dispatch }: { title: string; dispatch: SettingsDispatcher }) => {
  return (
    <div className="suggestion-settings__header">
      <div className="suggestion-settings__header-title">
        <div className="suggestion-settings__header-title--bs-outset">
          <p>{title}</p>
        </div>
      </div>
      <div className="suggestion-settings__close">
        <RoundButton
          type="Close"
          btnOptions={{ bgColor: BtnColorsEnum.Initial, offset: 8 }}
          iconOptions={{ color: "Primary" }}
          onClick={() => dispatch({ type: "SHOW_MENU", payload: { menu: "Hide" } })}
        />
      </div>
    </div>
  )
}

const BeatItem = ({ beat, state, dispatch }: BeatItemProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const setBeat = () => {
    dispatch({ type: "SET_BEAT", payload: { selectBeat: beat } })
    setTimeout(() => {
      dispatch({ type: "SHOW_MENU", payload: { menu: "Hide" } })
    }, 100)
  }

  return (
    <Container
      specs="outset row round"
      classes={[
        "settings-modal__select-beat-item",
        `settings-modal__select-beat-item--bs-outset ${state.selectedBeat.title === beat.title ? "Selected" : ""}`,
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
        <button className="settings-modal__title-text" onClick={() => setBeat()}>
          <div className="settings-modal__title-text--bs-outset">
            <p>{beat.title}</p>
          </div>
        </button>
      </Container>
      <div className="settings-modal__select-beat-play-btn">
        <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={beat.beat} />
      </div>
    </Container>
  )
}

export default function SelectBeat({ state, dispatch }: SettingsProps) {
  return (
    <Container
      specs="inset col square"
      classes={["settings-modal__select-beat", "settings-modal__select-beat--bs-inset"]}
      dim={["200px", "80%", "95%", "97%"]}
      background={"linear-gradient(314deg, #858585 0%, #a7a7a7 100%)"}
    >
      <ModalHeader title="Select a Beat" dispatch={dispatch} />

      <Container
        specs="inset col square"
        classes={["settings-modal__select-beat-body", "settings-modal__select-beat-body--bs-outset"]}
        dim={["85%", "100%", "95%", "96%"]}
      >
        <ul className="settings-modal__select-beat-list">
          {beatList.map((each) => {
            return <BeatItem key={`${each.title}_${each.index}`} beat={each} state={state} dispatch={dispatch} />
          })}
        </ul>
      </Container>
    </Container>
  )
}
