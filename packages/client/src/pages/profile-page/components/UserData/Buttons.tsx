import { PropsWithChildren, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "src/components/buttons/Icon/Icon"
import { useAuth } from "src/context/AuthContext"
import useFollow from "src/features/socialize/follow/useFollow"
import { IUser } from "src/types/ServerModelTypes"

type ProfileDataProps = PropsWithChildren<{
  title: "Follow" | "Following" | "Followers" | "Logout" | "Edit"
  size?: number
  onClick?: () => void
  addClasses?: string
}>

const SocialProofItem = ({ title, onClick, size, addClasses, children }: ProfileDataProps) => {
  const addStyles = title === "Following" || title === "Followers" || title === "Follow" ? true : false
  const styles = { padding: "9% 0%", alignItems: "flex-end" }

  return (
    <div className={`profile__side-btn`}>
      <button className={`profile__side-btn--bs-outset ${addClasses}`} onClick={onClick}>
        <div className="profile__side-btn--container">
          <div className="profile__side-btn-icon">
            <div className="profile__side-btn--bs-outset-2">
              <Icon type={title} options={{ color: "Primary", size: size }} />
            </div>
          </div>
        </div>
        <div className="profile__side-btn-title" style={addStyles ? styles : {}}>
          <p className="profile__side-btn-count">
            {/* {total} {title} */}
            {children}
          </p>
        </div>
      </button>
    </div>
  )
}

const FollowButton = ({ thisUser }: { thisUser: IUser }) => {
  const { total, hasUser, onClick, loading } = useFollow(thisUser._id, thisUser.followers)
  const [classes, setClasses] = useState<string>("")
  const [titleText, setTitleText] = useState<string>("Follow")

  useEffect(() => {
    if (hasUser) {
      setClasses("Pressed")
      setTitleText(`${total} Followed`)
    } else {
      const totalText = total === 1 ? "Follow" : "Follows"
      setClasses("")
      setTitleText(`${total} ${totalText}`)
    }
  }, [hasUser])

  return (
    <SocialProofItem title="Follow" size={130} onClick={() => onClick()} addClasses={classes}>
      {titleText}
    </SocialProofItem>
  )
}

export default function Buttons({ thisUser }: { thisUser: IUser }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const followers = thisUser.followers.length
  const isUser = user && user._id === thisUser._id ? true : false

  const logoutHandler = () => {
    // confirm modal
    logout()
  }
  const goToEditProfilePage = () => {
    navigate("/editProfile")
  }

  return (
    <div className="profile__side-btns">
      <div className="profile__side-btns--bs-inset">
        <div className="profile__side-btns-list">
          {isUser ? (
            <SocialProofItem title="Followers" size={90}>
              {followers === 1 ? `${followers} Follower` : `${followers} Followers`}
            </SocialProofItem>
          ) : (
            <FollowButton thisUser={thisUser} />
          )}

          <SocialProofItem title="Following" size={90}>
            {`${thisUser.following.length} Following`}
          </SocialProofItem>

          {isUser && (
            <SocialProofItem title="Edit" size={80} onClick={() => goToEditProfilePage()}>
              {"Edit"}
            </SocialProofItem>
          )}

          {isUser && (
            <SocialProofItem title="Logout" size={80} onClick={() => logoutHandler()}>
              {"Logout"}
            </SocialProofItem>
          )}
        </div>
      </div>
    </div>
  )
}
