import { MutableRefObject, PropsWithChildren, useRef } from "react"
import AudioSlider from "src/components/audio/AudioSlider"
import { PlayButton } from "src/components/buttons/PlayButton"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { ISongTake } from "src/features/recording-booth/utils/types"
import useAudioPlayer from "src/hooks/useAudioPlayer"

type SliderProps = PropsWithChildren<{
  current: string
  end: string
}>

const Slider = ({ current, end, children }: SliderProps) => {
  return (
    <div className="record__take-slider">
      <div className="record__take-slider--bs-outset">
        <div className="record__take-slider--wrapper">{children}</div>
        <div className="record__take-duration--container">
          <div className="record__take-duration current">
            <p className="record__take-duration-text">{current}</p>
          </div>
          <div className="record__take-duration end">
            <p className="record__take-duration-text">{end}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const ControlButton = ({ type, onClick }: { type: "Fullscreen" | "Volume"; onClick?: any }) => {
  const size = type === "Fullscreen" ? 60 : undefined
  const btnType = type === "Fullscreen" ? "Fullscreen" : "VolumeUp"
  return (
    <div className="record__other-controls-btn">
      <div className={`record__other-controls-btn--bs-outset ${type}`}>
        <RoundButton
          type={btnType}
          btnOptions={{ bgColor: BtnColorsEnum.Initial, offset: 7 }}
          iconOptions={{ color: "Primary", size: size }}
        />
      </div>
    </div>
  )
}

export default function MediaPlayback({
  take,
  videoRef,
}: {
  take: ISongTake
  videoRef: MutableRefObject<HTMLVideoElement | null>
}) {
  const playContainerRef = useRef<HTMLDivElement>(null)
  const { slider, time, isPlaying, setIsPlaying } = useAudioPlayer({
    ref: videoRef,
    duration: take?.duration,
    bgColor: "#f5afcc",
    video: take?.audio,
  })

  return (
    <div className="record__take-audio">
      <div className="record__take-audio--bs-inset">
        <div className="record__take-play" ref={playContainerRef}>
          <div className="record__take-play--bs-outset">
            <div className="record__take-play--bs-inset">
              <div className="record__take-play-btn--wrapper">
                <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={take} />
              </div>
            </div>
          </div>
        </div>
        <Slider {...time}>
          <AudioSlider addClass="record__slider" {...slider} />
        </Slider>
        <div className="record__other-controls">
          <ControlButton type="Volume" />
          <ControlButton type="Fullscreen" />
        </div>
      </div>
    </div>
  )
}
