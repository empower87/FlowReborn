import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { closeIcon } from "src/assets/images/_icons"
import { LayoutThree, LayoutTwo } from "src/components/layouts/LayoutWrappers"
import { ISongTake } from "src/features/recording-booth/utils/types"
import AudioPlayer from "./components/AudioPlayer"
import Form from "./components/Form"
import SelectSong from "./components/SelectSong"

type Props = {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  currentSong: ISongTake
  setCurrentSong: Dispatch<SetStateAction<ISongTake | undefined>>
  songTakes: ISongTake[]
}

export default function SaveSongModal({ isOpen, onClose, currentSong, setCurrentSong, songTakes }: Props) {
  const root = document.getElementById("root")!
  const [transition, setTransition] = useState<string>("")

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setTransition("transition-in")
      }, 220)
    }
    return () => setTransition("")
  }, [isOpen])

  const handleOnClose = () => {
    setTransition("transition-out")
    setTimeout(() => {
      onClose(false)
    }, 400)
  }

  if (!isOpen) return null

  return createPortal(
    <LayoutTwo classes={[`SaveSongModal`, `save-song_modal-container ${transition}`]}>
      <LayoutTwo classes={["save-song_header", "save-song_header-shadow-inset"]}>
        <LayoutTwo classes={["save-song_header-container", "save-song_header-shadow-outset"]}>
          <h1>Save Your Flow</h1>
        </LayoutTwo>

        <LayoutTwo classes={["save-song_btn-container", "save-song_btn-shadow-div-inset"]}>
          <button className="save-song_btn--close" type="button" onClick={() => handleOnClose()}>
            <img className="button-icons" src={closeIcon} alt="exit" />
          </button>
        </LayoutTwo>
      </LayoutTwo>

      <div className="flow-controls-container">
        <AudioPlayer src={currentSong.audio} duration={currentSong.duration} />

        <LayoutThree
          classes={[
            "flow-controls-2_actions",
            "actions-container_shadow-div-outset",
            "actions-container_shadow-div-inset",
          ]}
        >
          <SelectSong take={currentSong} setTake={setCurrentSong} takes={songTakes} />
          <Form currentSong={currentSong} />
        </LayoutThree>
      </div>
    </LayoutTwo>,
    root
  )
}
