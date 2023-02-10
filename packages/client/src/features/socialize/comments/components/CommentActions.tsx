import { ReactNode } from "react"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { SortCommentsType } from "../hooks/useCommentMenu"

const Photo = () => {
  const { user } = useAuth()
  return (
    <div className="comment-input__input-photo">
      <div className="comment-input__input-photo--bs-inset">
        <div className="comment-input__input-photo--bs-outset">
          <div className="comment-input__input-photo--wrapper">
            <UserPhoto photoUrl={user?.picture} username={user ? user.username : "A"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const SortButton = ({
  type,
  selected,
  onClick,
}: {
  type: SortCommentsType
  selected: SortCommentsType
  onClick: () => void
}) => {
  const title = type === "TOP" ? "Top" : "Newest"
  return (
    <div className="comments__header-actions-sort-btn--container">
      <button
        className={`comments__header-actions-sort-btn ${selected === type ? "selected" : ""}`}
        type="button"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  )
}

export const CommentInput = ({
  type,
  placeholder,
  onClick,
}: {
  type: "Comments" | "Replies"
  placeholder: string
  onClick: () => void
}) => {
  return (
    <div className="comments__header-actions-text">
      <div className={`comments__header-actions-text--bs-outset ${type}`}>
        <Photo />
        <div className="comments__header-actions-input--container">
          <input
            type="text"
            className="comments__header-actions-input"
            placeholder={placeholder}
            onClick={onClick}
          ></input>
        </div>
      </div>
    </div>
  )
}

export const CommentActions = ({
  toggleSort,
  setToggleSort,
}: {
  toggleSort: SortCommentsType
  setToggleSort: (sort: SortCommentsType) => void
}) => {
  return (
    <div className="comments__header-actions-sort">
      <SortButton type="TOP" selected={toggleSort} onClick={() => setToggleSort("TOP")} />
      <SortButton type="NEWEST" selected={toggleSort} onClick={() => setToggleSort("NEWEST")} />
    </div>
  )
}

export const ReplyActions = ({ children }: { children: ReactNode }) => {
  return <div className="comments__item--reply-wrapper">{children}</div>
}
