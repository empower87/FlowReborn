import { ReactNode } from "react"
import { CommentButton, FollowButton, LikeButton } from "src/features/socialize/SocializeButtons"
// import { ISong } from "../../../../../server/src/models"
import { ISongPopulatedUser as ISong } from "src/types/ServerModelTypes"

type SocialButton = {
  type: "follow" | "like" | "comment"
  song: ISong
  showComments?: () => void
}

export const SocialButton = ({ type, song, showComments }: SocialButton) => {
  return (
    <div className={`songscreen__btn--container ${type}`}>
      {type === "follow" ? (
        <FollowButton location="Song" song={song} />
      ) : type === "comment" && showComments ? (
        <CommentButton location="Song" song={song} onClick={showComments} />
      ) : (
        <LikeButton location="Song" song={song} />
      )}
    </div>
  )
}

export default function SocialButtons({ children }: { children: ReactNode }) {
  return (
    <div className="songscreen__social-btns--container">
      <div className="songscreen__social-btns--shadow-outset">
        <div className="songscreen__social-btns--shadow-inset">{children}</div>
      </div>
    </div>
  )
}
