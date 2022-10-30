import { PropsWithChildren } from "react"
import AudioSlider from "src/components/audio/AudioSlider"
import { PlayButton } from "src/components/buttons/PlayButton"
import { LayoutThree, LayoutTwo } from "src/components/layouts/LayoutWrappers"
import useAudioPlayer from "src/hooks/useAudioPlayer"

type AudioPlayerProps = {
  audio: string
  duration: number
}

type AudioSliderLayoutProps = PropsWithChildren<{
  current: string
  end: string
}>

const AudioSliderLayout = ({ current, end, children }: AudioSliderLayoutProps) => {
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
  const { slider, time, isPlaying, setIsPlaying } = useAudioPlayer({ audio, duration, bgColor: "#6d6d6d" })

  return (
    <div className="flow-controls-1_playback-display">
      <LayoutThree
        classes={["play-btn-container", "play-btn-container_shadow-div-outset", "play-btn-container_shadow-div-inset"]}
      >
        <PlayButton
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          options={{
            offset: 8,
            margin: "0em 0em 0em 0.35em",
            flexJC: "flex-start",
          }}
        />
      </LayoutThree>

      <LayoutTwo classes={["play-slider-container", "play-slider-container_shadow-div-outset"]}>
        <LayoutTwo classes={["play-slider-container_shadow-div-inset", "play-slider_shadow-div-outset"]}>
          <AudioSliderLayout {...time}>
            <AudioSlider addClass="dur-onset progress" {...slider} />
          </AudioSliderLayout>
        </LayoutTwo>
      </LayoutTwo>
    </div>
  )
}
