import { ChangeEvent, useState } from "react"
import { useFormContext } from "react-hook-form"
import Resizer from "react-image-file-resizer"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { CropModal } from "./CropModal"

export default function UploadProfilePhoto() {
  const { user } = useAuth()
  const { register } = useFormContext()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | undefined>()
  const [isCropperOpen, setIsCropperOpen] = useState<boolean>(false)

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const file = e.target.files[0]
        setSelectedFile(file)

        Resizer.imageFileResizer(
          file,
          240,
          240,
          "JPEG",
          100,
          0,
          (uri: string | Blob | File | ProgressEvent<FileReader>) => {
            console.log(uri)
            setImageSrc(uri as string)
            setIsCropperOpen(true)
          },
          "base64"
        )
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className="edit-section__profile-photo">
      <div className="edit-section__profile-photo--container">
        <div className="edit-section__profile-photo--bs-outset">
          <div className="edit-section__profile-photo--bs-inset">
            <div className="edit-section__profile-photo--bs-outset-2">
              <div className="edit-section__profile-photo--bs-inset-2">
                <div className="edit-section__profile-photo--wrapper">
                  <UserPhoto photoUrl={imageSrc ? imageSrc : user?.picture} username={user ? user.username : "A"} />
                </div>
              </div>
            </div>
          </div>

          <div className="edit-section__photo-edit--container">
            <label className="edit-section__photo-edit-btn" htmlFor="choose-image-input">
              <input
                id="choose-image-input"
                {...register("picture")}
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange(e)}
                hidden
              />
              <Icon type={ButtonTypes.Edit} options={{ color: "White", size: 80 }} />
            </label>
          </div>
        </div>
      </div>
      <CropModal isOpen={isCropperOpen} onClose={setIsCropperOpen} imageSrc={imageSrc} setImageSrc={setImageSrc} />
    </div>
  )
}
