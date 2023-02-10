import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { useFormContext } from "react-hook-form"
import ReactCrop, { Crop } from "react-image-crop"
import "react-image-crop/src/ReactCrop.scss"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"

export const CropModal = ({
  isOpen,
  onClose,
  imageSrc,
  setImageSrc,
}: {
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  imageSrc: string | undefined
  setImageSrc: Dispatch<SetStateAction<string | undefined>>
}) => {
  const root = document.getElementById("root")!
  const { setValue } = useFormContext()
  const [crop, setCrop] = useState<Crop>({ unit: "px", x: 15, y: 5, width: 130, height: 130 })
  const [aspectStyles, setAspectStyles] = useState<{ height: string; width: string }>({ height: "auto", width: "auto" })

  useEffect(() => {
    return () => {
      setCrop({ unit: "px", x: 15, y: 5, width: 130, height: 130 })
      setAspectStyles({ height: "auto", width: "auto" })
    }
  }, [imageSrc])

  const handleSaveCroppedImage = async () => {
    if (!imageSrc) return
    const img = await getCroppedImage(imageSrc, crop, "profilePic")
    if (!img) return console.log(img, "THIS WAS UNDEFINED OR NULL")

    // const newImg = URL.createObjectURL(img)
    setImageSrc(img)
    onClose(false)
    // console.log(img, imageSrc, "WHAT THE FUCK IS THIS IMAGE, IS IT IMAGE? OR BLOB??")
    setValue("picture", img, { shouldDirty: true })
  }

  const imageOnLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setAspectStyles({ height: `${height}px`, width: `${width}px` })
    if (height > width) {
      const cropAspect = width - 15
      setCrop((prev) => ({ ...prev, width: cropAspect, height: cropAspect }))
    } else {
      const cropAspect = height - 15
      setCrop((prev) => ({ ...prev, width: cropAspect, height: cropAspect }))
    }
  }

  const getCroppedImage = async (_image: string, pixelCrop: Crop, fileName: string) => {
    const canvas = document.createElement("canvas")
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext("2d")
    const image = new Image()
    image.src = _image

    if (!ctx) return null
    try {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      )

      return canvas.toDataURL("image/jpeg")
    } catch (err) {
      console.log(err)
    }
  }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="image-crop">
      <div className="image-crop__modal">
        <div className="image-crop__modal--bs-inset">
          <div className="image-crop__header">
            <div className="image-crop__header--bs-outset">
              <div className="image-crop__header--bs-inset">
                <div className="image-crop__header-btn--container Close">
                  <button className="image-crop__header-btn" onClick={() => onClose(false)}>
                    <Icon type={ButtonTypes.Back} options={{ color: "Primary" }} />
                  </button>
                </div>
                <div className="image-crop__header-btn--container Header">
                  <div className="image-crop__header-btn">
                    <p>Crop Your Photo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`image-crop__image`} style={aspectStyles}>
            <ReactCrop
              crop={crop}
              aspect={1}
              circularCrop={true}
              locked={true}
              onChange={(crop, percentCrop) => setCrop(crop)}
            >
              <img src={imageSrc} onLoad={imageOnLoad} />
            </ReactCrop>
          </div>

          <div className="image-crop__save-btn--container">
            <div className="image-crop__save-btn--bs-outset">
              <div className="image-crop__save-btn--bs-inset">
                <button className="image-crop__save-btn" onClick={() => handleSaveCroppedImage()}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    root
  )
}
