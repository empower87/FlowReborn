import { PropsWithChildren } from "react"
import AudioSlider from "src/components/audio/AudioSlider"
import { PlayButton } from "src/components/buttons/PlayButton"
import useAudioPlayer from "src/hooks/useAudioPlayer"

type AudioPlayerProps = {
  src: string
  duration: number
}

type PlaybackSliderProps = PropsWithChildren<{
  current: string
  end: string
}>

const PlaybackSlider = ({ current, end, children }: PlaybackSliderProps) => {
  return (
    <div className="play-slider_shadow-div-inset">
      {children}
      <div className="time-text-container">
        <div className="time-text-start">{current}</div>
        <div className="time-text-end">{end}</div>
      </div>
    </div>
  )
}

export default function AudioPlayer({ src, duration }: AudioPlayerProps) {
  const { slider, time, isPlaying, setIsPlaying } = useAudioPlayer({
    src,
    duration,
    bgColor: "#6d6d6d",
    video: src,
  })

  return (
    <div className="song-play-section">
      <div className="play-song-container">
        <div className="play-btn-container">
          <div className="play-btn-container-2">
            <div className="play-btn_inset-container">
              <div className="play-btn_shadow-div-inset">
                <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} options={{ offset: 9 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="play-bar-container">
        <div className="play-bar_shadow-div-inset">
          <PlaybackSlider {...time}>
            <AudioSlider addClass="" {...slider} />
          </PlaybackSlider>
        </div>
      </div>
    </div>
  )
}
