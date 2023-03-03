import { useLayoutEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "src/components/buttons/Icon/Icon"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"

type UserHeaderProps = {
  username: string
  picture: string | undefined
  id: string
}

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <div className="profile__header-back">
      <button type="button" className="profile__header-back-btn" onClick={() => navigate(-1)}>
        <Icon type="Previous" options={{ color: "White", size: 70 }} />
      </button>
    </div>
  )
}
export default function UserHeader({ username, picture, id }: UserHeaderProps) {
  const { user } = useAuth()
  const sizeRef = useRef<HTMLDivElement>(null)
  const isUser = user && user._id === id ? true : false

  useLayoutEffect(() => {
    if (!sizeRef.current) return
    const height = sizeRef.current.offsetHeight
    sizeRef.current.style.width = `${height}px`
  }, [])

  return (
    <div className="profile__header">
      <div className="profile__header--bs-inset">
        {!isUser && <BackButton />}
        <div className="profile__header-username" style={{ width: isUser ? "80%" : "70%" }}>
          <div className="profile__header-username--bs-outset">
            <div className="profile__header-username--bs-inset">
              <p className="username-text-me">{username}</p>
            </div>
          </div>
        </div>

        <div className="user-pic-container">
          <div className="user-pic_shadow-div-outset">
            <div className="user-pic_shadow-div-inset" ref={sizeRef}>
              <div className="user-pic__shadow-div--wrapper">
                <UserPhoto photoUrl={picture} username={username} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
