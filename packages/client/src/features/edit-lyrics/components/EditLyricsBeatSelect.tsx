import { Dispatch, SetStateAction, useState } from "react"
import { PlayButton } from "src/components/buttons/PlayButton"
import { SelectMenu } from "src/components/modals/SelectMenu/SelectMenu"
import { Beat, beatList } from "src/constants"

export default function EditLyricsBeatSelect({
  currentBeat,
  setCurrentBeat,
}: {
  currentBeat: Beat
  setCurrentBeat: Dispatch<SetStateAction<Beat>>
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [showSelectBeatMenu, setShowSelectBeatMenu] = useState<boolean>(false)

  return (
    <div className="actions-2_record">
      <SelectMenu
        position={["bottom", 8]}
        maxHeight={96 - 8}
        list={beatList}
        listKey={["index", "title"]}
        currentItem={currentBeat}
        setCurrentItem={setCurrentBeat}
        isOpen={showSelectBeatMenu}
        onClose={setShowSelectBeatMenu}
      />
      <div className="record-container">
        <div className="record-1_select-beat">
          <div className="select-beat_shadow-div-inset">
            <div className="play-beat_shadow-div-outset">
              <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={currentBeat?.beat} />
            </div>

            <button className="select-beat_shadow-div-outset">
              <div className="select-beat-title">Beat:</div>
              <div id="selectBox" className="track-select" onClick={() => setShowSelectBeatMenu(true)}>
                {currentBeat?.title}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
