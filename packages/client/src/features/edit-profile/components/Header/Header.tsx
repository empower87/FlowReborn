import { ReactNode, useLayoutEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonTypes } from "src/components/buttons/Icon/Icon"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import ContinueModal from "src/components/modals/ContinueModal"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"

export const BackButton = ({ isDirty }: { isDirty: boolean }) => {
  const navigate = useNavigate()
  const [showExitModal, setShowExitModal] = useState<boolean>(false)

  const onGoBackHandler = () => {
    if (isDirty) {
      setShowExitModal(true)
    } else {
      onExitHandler()
    }
  }

  const onExitHandler = () => {
    navigate(-1)
  }

  return (
    <div className="edit-profile__go-back">
      <ContinueModal
        title={"Discard Changes"}
        text={"Are you sure you want to discard your changes?"}
        isOpen={showExitModal}
        onClose={setShowExitModal}
        onExit={onExitHandler}
      />
      <div className="edit-profile__go-back--wrapper">
        <RoundButton
          type={ButtonTypes.Back}
          btnOptions={{
            inset: [true, "4px"],
            offset: 13,
            bgColor: BtnColorsEnum.Primary,
            alignment: ["flex-start", 0],
          }}
          iconOptions={{ color: "White", size: 70 }}
          onClick={() => onGoBackHandler()}
        />
      </div>
    </div>
  )
}

const Photo = ({ picture, username }: { picture: string | undefined; username: string }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!wrapperRef.current || !sizeRef.current) return
    const height = wrapperRef.current.offsetHeight
    sizeRef.current.style.height = `${height - 13}px`
    sizeRef.current.style.width = `${height - 13}px`
  }, [])

  return (
    <div className="edit-profile__user-pic--container">
      <div className="edit-profile__user-pic--shadow-outset" ref={wrapperRef}>
        <div className="edit-profile__user-pic--shadow-inset" ref={sizeRef}>
          <div className="edit-profile__user-pic--wrapper">
            <UserPhoto photoUrl={picture} username={username} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Header({ children }: { children: ReactNode }) {
  const { user } = useAuth()

  return (
    <div className="edit-profile__header">
      <div className="edit-profile__header--container">
        <div className="edit-profile__header--shadow-outset">
          {children}
          <div className="edit-profile__user-title">
            <div className="edit-profile__user-title--shadow-inset">
              <div className="edit-profile__user-title--container">
                <h3>
                  Edit Your Profile <span>{user?.username}</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Photo picture={user?.picture} username={user?.username ? user.username : "username"} />
    </div>
  )
}
