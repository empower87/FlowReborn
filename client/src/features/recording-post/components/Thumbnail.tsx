import { Dispatch, SetStateAction, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { ButtonTypes } from "src/components/buttons/Icon/Icon"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { generateCanvas } from "src/features/recording-booth/utils/generateThumbnail"
import { ISongTake } from "src/features/recording-booth/utils/types"

const ThumbnailModal = ({
  video,
  duration,
  isOpen,
  onClose,
  setCurrentTake,
}: {
  video: string | undefined
  duration: number | undefined
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  setCurrentTake: Dispatch<SetStateAction<ISongTake | undefined>>
}) => {
  const root = document.getElementById("root")!
  const seconds = duration ? duration / 1000 : 0
  const videoRef = useRef<HTMLVideoElement>(null)
  const [value, setValue] = useState<string>("0")

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return
    const numValue = parseInt(event.target.value)
    setValue(event.target.value)
    videoRef.current.currentTime = numValue
  }

  const thumbnailHandler = () => {
    if (!videoRef.current) return

    const canvas = generateCanvas(videoRef.current, videoRef.current.videoHeight, videoRef.current.videoWidth)
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (!blob) return
      let url = URL.createObjectURL(blob)

      setCurrentTake((prev) => {
        if (prev) {
          return {
            ...prev,
            thumbnail: url,
            thumbnailBlob: blob,
          }
        }
      })
    })
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="post-recording__thumbnail">
      <div className="post-recording__thumbnail-header">
        <div className="post-recording__thumbnail-header--bs-inset">
          <div className="post-recording__thumbnail-header-close">
            <RoundButton
              type={ButtonTypes.Close}
              btnOptions={{ bgColor: BtnColorsEnum.Primary }}
              iconOptions={{ color: "White" }}
              onClick={() => onClose(false)}
            />
          </div>
          <div className="post-recording__thumbnail-header-title">
            <div className="post-recording__thumbnail-header-title--bs-outset">
              <p className="post-recording__thumbnail-header-title-text">Select a Thumbnail</p>
            </div>
          </div>
        </div>
      </div>

      <video ref={videoRef} className="post-recording__thumbnail-video" src={video} muted />

      <div className="post-recording__thumbnail-seek">
        <div className="post-recording__thumbnail-seek--bs-inset">
          <div className="post-recording__thumbnail-input--container">
            <div className="post-recording__thumbnail-input--bs-outset">
              <input
                type="range"
                min="0"
                max={`${seconds}`}
                step="1"
                value={value}
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
          </div>
          <div className="post-recording__thumbnail-select">
            <button
              className="post-recording__thumbnail-select-btn"
              onClick={() => {
                thumbnailHandler()
                onClose((prev) => !prev)
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>,
    root
  )
}

export const ThumbnailSelector = ({
  currentTake,
  setCurrentTake,
}: {
  currentTake: ISongTake | undefined
  setCurrentTake: Dispatch<SetStateAction<ISongTake | undefined>>
}) => {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="post-recording__choose-thumbnail">
      <ThumbnailModal
        video={currentTake?.audio}
        duration={currentTake?.duration}
        isOpen={showModal}
        onClose={setShowModal}
        setCurrentTake={setCurrentTake}
      />
      <div className="post-recording__choose-thumbnail--bs-inset">
        <div className="post-recording__choose-thumbnail-title">
          <button className="post-recording__choose-thumbnail-title--bs-outset" onClick={() => setShowModal(true)}>
            Pick Thumbnail
          </button>
        </div>
        <div className="post-recording__choose-thumbnail-btns">
          <div className="post-recording__choose-thumbnail-btn">
            <img className="post-recording__choose-thumbnail-img" src={currentTake?.thumbnail} />
          </div>
        </div>
      </div>
    </div>
  )
}
