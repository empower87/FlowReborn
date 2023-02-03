import { Dispatch, SetStateAction, useState } from "react"
import { pauseIcon, playIcon } from "src/assets/images/_icons"
// import AudioTimeSlider from "src/components/audio/AudioTimeSlider"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
// import { ISong } from "../../../../../server/src/models"
import { ISongPopulatedUser as ISong } from "src/types/ServerModelTypes"

const AUDIO_SLIDER_COLOR = `#353535`

export const NavigationButton = ({ onClick, direction }: { onClick: any; direction: "Previous" | "Next" }) => {
  return (
    <div className={`songscreen__navigate ${direction}`}>
      <button className="songscreen__navigate-btn" onClick={() => onClick(direction)}>
        <div className="songscreen__navigate-btn-icon">
          <Icon type={ButtonTypes[direction]} options={{ color: "White", size: 65 }} />
        </div>
      </button>
    </div>
  )
}

export const PlayButton = ({
  isPlaying,
  onClick,
}: {
  isPlaying: boolean
  onClick: Dispatch<SetStateAction<boolean>>
}) => {
  let icon = isPlaying ? pauseIcon : playIcon
  return (
    <div className="songscreen__play-btn--container">
      <div className="songscreen__play-btn--shadow-inset">
        <div className="songscreen__play-btn">
          <div className="songscreen__play-btn--shadow-outset">
            <button className="songscreen__play-btn--shadow-outset2" onClick={() => onClick((prev) => !prev)}>
              <div className="songscreen__play-btn--shadow-inset">
                <img src={icon} alt="pause/pause icon" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AudioPlayer({
  song,
  findCurrentSong,
}: {
  song: ISong
  findCurrentSong: (direction: "Previous" | "Next") => void
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <div className="songscreen__play--container">
      <div className="songscreen__play--shadow-inset">
        <div className="songscreen__play--shadow-outset">
          <div className="songscreen__play">
            <NavigationButton onClick={findCurrentSong} direction="Previous" />

            <PlayButton isPlaying={isPlaying} onClick={setIsPlaying} />

            <NavigationButton onClick={findCurrentSong} direction="Next" />
          </div>

          <div className="songscreen__audioslider--container">
            <div className="songscreen__audioslider--shadow-inset">
              <div className="songscreen__audioslider--shadow-outset">
                {/* <AudioTimeSlider
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  currentSong={song}
                  bgColor={AUDIO_SLIDER_COLOR}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
