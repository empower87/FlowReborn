import { useState } from "react"
import AudioTimeSlider from "src/components/audio/AudioTimeSlider"
import { PlayButton } from "src/components/buttons/PlayButton"
import { ISongTake } from "src/features/recording-booth/utils/types"
import { ISong } from "../../../../../server/src/models"

export function EditLyricsAudioPlayer({ currentSong }: { currentSong: ISongTake | ISong }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <div className="edit-lyrics__audio">
      <div className="edit-lyrics__audio--bs-inset">
        <div className="play-btn-container">
          <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        </div>

        <div className="play-slider-container">
          <div className="play-slider-container_shadow-div-outset">
            <div className="play-slider-container_shadow-div-inset">
              <div className="play-slider_shadow-div-outset">
                {currentSong && (
                  <AudioTimeSlider
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    currentSong={currentSong}
                    bgColor={`#4d4d4d`}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
