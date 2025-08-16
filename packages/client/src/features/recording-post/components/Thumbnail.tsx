import { Dispatch, SetStateAction, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { useSongDraftsContext } from "src/features/recording-booth/hooks/useSongDrafts"
import useThumbnail from "../hooks/useThumbnail"

type ThumbnailModalProps = {
  video: string | undefined
  duration: number | undefined
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}
const ThumbnailModal = ({ video, duration, isOpen, onClose }: ThumbnailModalProps) => {
  const root = document.getElementById("root")!
  const { currentDraft, updateThumbnail } = useSongDraftsContext()

  const seconds = duration ? duration / 1000 : 0
  const videoRef = useRef<HTMLVideoElement>(null)
  const [value, setValue] = useState<number>(0)

  const _src = currentDraft && currentDraft.src ? currentDraft.src : null
  const { thumbnail, selectThumbnail } = useThumbnail({ _src })

  const onChangeHandler = (time: number) => {
    if (!videoRef.current) return
    setValue(time)
    selectThumbnail(time)
    videoRef.current.currentTime = time
  }
  // const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!videoRef.current) return
  //   const numValue = parseInt(event.target.value)
  //   setValue(event.target.value)
  //   videoRef.current.currentTime = numValue
  // }

  const thumbnailHandler = () => {
    if (!currentDraft || !thumbnail.thumbnail) return
    updateThumbnail(currentDraft._id, thumbnail.thumbnail)
    console.log(thumbnail, value, "saved thumbnail")
    // if (!videoRef.current) return

    // const canvas = generateCanvas(videoRef.current, videoRef.current.videoHeight, videoRef.current.videoWidth)
    // if (!canvas) return

    // canvas.toBlob((blob) => {
    //   if (!blob) return
    //   let url = URL.createObjectURL(blob)

    //   setThumbnail({
    //     thumbnail: url,
    //     thumbnailBlob: blob,
    //   })
    // })
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="post-recording__thumbnail">
      <div className="post-recording__thumbnail-header">
        <div className="post-recording__thumbnail-header--bs-inset">
          <div className="post-recording__thumbnail-header-close">
            <RoundButton
              type="Close"
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
                onChange={(event) => onChangeHandler(event.target.valueAsNumber)}
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

export const ThumbnailSelector = () => {
  const { currentDraft } = useSongDraftsContext()
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <div className="post-recording__choose-thumbnail">
      <ThumbnailModal
        video={currentDraft?.src}
        duration={currentDraft?.duration}
        isOpen={showModal}
        onClose={setShowModal}
      />
      <div className="post-recording__choose-thumbnail--bs-inset">
        <div className="post-recording__choose-thumbnail-title">
          <button className="post-recording__choose-thumbnail-title--bs-outset" onClick={() => setShowModal(true)}>
            Pick Thumbnail
          </button>
        </div>
        <div className="post-recording__choose-thumbnail-btns">
          <div className="post-recording__choose-thumbnail-btn">
            <img className="post-recording__choose-thumbnail-img" src={currentDraft?.thumbnail} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
