import { useEffect, useState } from "react"
// import { ISong } from "../../../../server/src/models/Song"
import { ISongPopulatedUser as ISong } from "src/types/ServerModelTypes"
import { commentIcon, followIcon, thumbsUpIcon } from "../../assets/images/_icons"
import { ButtonTypes } from "../../components/buttons/Icon/Icon"
import { BtnColorsEnum, RoundButton } from "../../components/buttons/RoundButton/RoundButton"
import useFollow from "./follow/useFollow"
import useLike from "./like/useLike"

interface ISocializeButton {
  type: "Follow" | "Like" | "Comment"
  total: number
  onClick: any
  hasUser: boolean
  loading?: boolean
}

interface ISocializeButtonWrapper {
  location: "Home" | "Song"
  song: ISong
}

interface ICommentButtonWrapper extends ISocializeButtonWrapper {
  onClick: () => void
}

const SocialButtonSong = ({ type, total, onClick, hasUser, loading }: ISocializeButton) => {
  const iconSize = type === "Follow" ? 125 : type === "Comment" ? 55 : 75

  return (
    <div className="songscreen__btn">
      <div className="songscreen__text--container">
        <div className="songscreen__text--wrapper">
          <p className="songscreen__text num">{total}</p>
          <p className="songscreen__text title">{total === 1 ? `${type}` : `${type}s`}</p>
        </div>
      </div>
      <div className={`social-button ${hasUser ? "pushed" : ""}`}>
        <RoundButton
          type={type as ButtonTypes}
          btnOptions={{
            offset: 10,
            bgColor: BtnColorsEnum.Initial,
          }}
          iconOptions={{ color: "Primary", size: iconSize }}
          onClick={onClick}
        />
      </div>
    </div>
  )
}

const SocialButtonHome = ({ type, total, onClick, hasUser, loading }: ISocializeButton) => {
  const icon = type === "Follow" ? followIcon : type === "Like" ? thumbsUpIcon : commentIcon

  return (
    <button
      className={`action-btn_shadow-div-outset ${hasUser ? "liked-followed-commented" : ""}`}
      style={type === "Follow" ? { borderRadius: "50px 5px 5px 50px" } : {}}
      onClick={() => onClick()}
      disabled={loading}
    >
      <div
        className="action-btn-icon_shadow-div-inset"
        style={type === "Follow" ? { borderRadius: "40px 4px 4px 40px" } : {}}
      >
        <img className={`social-icons ${type}`} src={icon} alt={`${type} user icon`} />
      </div>

      <div className="action-btn-container">
        <div className="action-btn-text">
          <p style={{ color: "white" }}>{total}</p>
          <p>{total === 1 ? `${type}` : `${type}s`}</p>
        </div>
      </div>
    </button>
  )
}

export const LikeButton = ({ location, song }: ISocializeButtonWrapper) => {
  const like = useLike(song._id, song.likes, "Song")
  if (location === "Song") return <SocialButtonSong type="Like" {...like} />
  return <SocialButtonHome type="Like" {...like} />
}

export const FollowButton = ({ location, song }: ISocializeButtonWrapper) => {
  const follow = useFollow(song.user._id, song.user.followers)
  if (location === "Song") return <SocialButtonSong type="Follow" {...follow} />
  return <SocialButtonHome type="Follow" {...follow} />
}

export const CommentButton = ({ location, song, onClick }: ICommentButtonWrapper) => {
  const comments = song?.comments
  const [hasCommented, setHasCommented] = useState<boolean>(false)
  const [totalComments, setTotalComments] = useState<number>(0)

  useEffect(() => {
    setTotalComments(comments?.length)
  }, [song])

  const props = {
    total: totalComments,
    hasUser: hasCommented,
    onClick: onClick,
  }

  if (location === "Song") return <SocialButtonSong type="Comment" {...props} />
  return <SocialButtonHome type="Comment" {...props} />
}
