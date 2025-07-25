import { MouseEventHandler, ReactNode, useLayoutEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Icon } from "src/components/buttons/Icon/Icon"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import useFormatDate from "src/hooks/useFormatDate"
// import { IComment } from "../../../../../../../server/src/models/index"
import { IComment } from "src/types/ServerModelTypes"

// type InputType = "Comment" | "Edit" | "Reply" | "Hide"

type ItemProps = {
  comment: IComment
  authorId: string
  editId: string | null
  lastItemId: string | null | undefined
  children?: ReactNode
}

type HeaderProps = {
  username: string
  onClick: MouseEventHandler<HTMLButtonElement>
  picture: string | undefined
  isAuthor: boolean
}
type CommentItemLayoutProps = {
  details: JSX.Element
  isLastItem: boolean
  isEditing: boolean
  children: ReactNode
}

// type CommentItemButtonsProps = {
//   comment: IComment
// }

const Photo = ({ username, picture, onClick }: Omit<HeaderProps, "isAuthor">) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!wrapperRef.current) return
    const width = wrapperRef.current.offsetWidth
    wrapperRef.current.style.height = `${width}px`
  }, [])

  return (
    <div className="comment-list-photo" ref={wrapperRef}>
      <div className="comment-photo-inner">
        <button className="comment-photo-outer" onClick={onClick}>
          <div className="comment-photo__photo--wrapper">
            <UserPhoto photoUrl={picture} username={username ? username : "A"} />
          </div>
        </button>
      </div>
    </div>
  )
}

const Title = ({ username, isAuthor, onClick }: Omit<HeaderProps, "picture">) => {
  return (
    <button className={`comments__user-title--container ${isAuthor ? "Author" : ""}`} onClick={onClick}>
      <p className="comments__user-title">{username}</p>
      {isAuthor ? (
        <div className="comments__user-title-icon">
          <Icon type="Check" options={{ color: "White" }} />
        </div>
      ) : null}
    </button>
  )
}

const CommentDate = ({ createdOn, editedOn }: { createdOn: string | undefined; editedOn?: string | undefined }) => {
  const { formatDate } = useFormatDate()
  const createdOnDate = createdOn ? new Date(createdOn) : undefined
  const editedOnDate = editedOn ? new Date(editedOn) : undefined
  return (
    <p className="comments__date">
      {editedOn
        ? `${String.fromCodePoint(8226)} ${formatDate(editedOnDate, "m")} (edited)`
        : `${String.fromCodePoint(8226)} ${formatDate(createdOnDate, "m")}`}
    </p>
  )
}

function CommentItemDetails({
  comment,
  onClick,
  isAuthor,
}: {
  comment: IComment
  onClick: () => void
  isAuthor: boolean
}) {
  return (
    <div className="comment-list-inner">
      <Photo username={comment?.user?.username} picture={comment?.user?.picture} onClick={() => onClick()} />

      <div className="comments__text--container">
        <div className="comments__text--shadow-outset">
          <div className="comments__user-details">
            <div className="comments__user-details--bs-inset">
              <Title username={comment?.user?.username} isAuthor={isAuthor} onClick={() => onClick()} />
              <CommentDate createdOn={comment?.createdOn} editedOn={comment?.editedOn} />
            </div>
          </div>
          <p className="comments__comment">{comment?.text}</p>
        </div>
      </div>
    </div>
  )
}

function CommentItemLayout({ isLastItem, isEditing, details, children }: CommentItemLayoutProps) {
  return (
    <li
      className={`comments__item ${isEditing ? "highlight" : ""}`}
      style={isLastItem ? { borderRadius: "0.2em 0.2em 0.2em 2em" } : {}}
    >
      {details}

      <div className="comments__actions--container">
        <div className="space-filler"></div>
        <div className="comments__actions">
          <div className="comments__actions--shadow-inset">{children}</div>
        </div>
      </div>
    </li>
  )
}

export default function CommentItem({ comment, authorId, editId, lastItemId, children }: ItemProps) {
  const navigate = useNavigate()
  const isEditing = editId && editId === comment._id ? true : false
  const isAuthor = authorId === comment.user._id ? true : false
  const isLast = lastItemId && lastItemId === comment._id ? true : false

  const goToProfile = () => {
    navigate(`/profile/${comment?.user?._id}`)
  }

  return (
    <CommentItemLayout
      isLastItem={isLast}
      isEditing={isEditing}
      details={<CommentItemDetails comment={comment} onClick={goToProfile} isAuthor={isAuthor} />}
    >
      {children}
    </CommentItemLayout>
  )
}
