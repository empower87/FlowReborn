import { useState } from "react"
import ReactDOM from "react-dom"
import { SideButton } from "src/components/ui/SideButtonMenu"
import CommentMenu from "src/features/socialize/comments/components/CommentMenu"
import useFollow from "src/features/socialize/follow/useFollow"
import useLike from "src/features/socialize/like/useLike"
import { IComment, ISongPopulatedUserAndComments as ISong, IUser } from "src/types/ServerModelTypes"

export const LikeButton = ({ data }: { data: ISong | IComment }) => {
  const { total, hasUser, onClick } = useLike(data._id, data.likes, "Song")
  return <SideButton type="Like" text={`${total}`} hasUser={hasUser} onClick={onClick} size={75} />
}

export const FollowButton = ({ data }: { data: IUser }) => {
  const { total, hasUser, onClick } = useFollow(data._id, data.followers)
  return <SideButton type="Follow" text={`${total}`} hasUser={hasUser} onClick={onClick} size={110} />
}

export const FullscreenButton = ({ onClick }: { onClick: any }) => {
  return <SideButton type="Expand" text="" hasUser={false} onClick={onClick} size={80} />
}

export const CommentButtonWithCommentModal = ({ data }: { data: ISong }) => {
  const [showComments, setShowComments] = useState<boolean>(false)

  return (
    <>
      {showComments && <CommentMenu song={data} isOpen={showComments} onClose={setShowComments} />}
      <SideButton
        type="Comment"
        text={`${data.comments.length}`}
        hasUser={false}
        onClick={() => setShowComments(true)}
        size={60}
      />
    </>
  )
}

export const LyricsButtonWithLyricsModal = ({ lyrics }: { lyrics: string[][] }) => {
  const [toggleLyrics, setToggleLyrics] = useState<boolean>(false)
  return (
    <>
      {toggleLyrics && <LyricsModal lyrics={lyrics} isOpen={toggleLyrics} />}
      <SideButton
        type="Songs"
        text={"Lyrics"}
        hasUser={false}
        onClick={() => setToggleLyrics((prev) => !prev)}
        isActive={toggleLyrics}
        size={80}
      />
    </>
  )
}

const LyricsModal = ({ lyrics, isOpen }: { lyrics: string[][]; isOpen: boolean }) => {
  const root = document.getElementById("song-post__root")!
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className={`lyrics-popup ${isOpen ? "Open" : "Closed"}`} style={{ visibility: isOpen ? "visible" : "hidden" }}>
      {lyrics.map((line, index) => {
        return (
          <div className="each-lyric-container" key={`${index}_${line}_songlyrics`}>
            <p className="each-lyric-no">{index + 1}</p>
            {line.map((lyric, i) => {
              return (
                <p key={`${i}_${lyric}`} className="each-lyric-line">
                  {lyric}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>,
    root
  )
}
