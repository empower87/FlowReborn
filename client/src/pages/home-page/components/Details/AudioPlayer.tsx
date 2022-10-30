import { PropsWithChildren } from "react"
import AudioSlider from "src/components/audio/AudioSlider"
import { PlayButton } from "src/components/buttons/PlayButton"
import { LayoutThree, LayoutTwo } from "src/components/layouts/LayoutWrappers"
import useAudioPlayer from "src/hooks/useAudioPlayer"

type AudioPlayerProps = {
  audio: string
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

export default function AudioPlayer({ audio, duration }: AudioPlayerProps) {
  const { slider, time, isPlaying, setIsPlaying } = useAudioPlayer({
    audio,
    duration,
    bgColor: "#6d6d6d",
  })

  return (
    <div className="song-play-section">
      <LayoutThree classes={["play-song-container", "play-btn-container", "play-btn-container-2"]}>
        <LayoutTwo classes={["play-btn_inset-container", "play-btn_shadow-div-inset"]}>
          <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} options={{ offset: 9 }} />
        </LayoutTwo>
      </LayoutThree>

      <LayoutTwo classes={["play-bar-container", "play-bar_shadow-div-inset"]}>
        <PlaybackSlider {...time}>
          <AudioSlider addClass="" {...slider} />
        </PlaybackSlider>
      </LayoutTwo>
    </div>
  )
}
