import { Dispatch, SetStateAction } from "react"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { IComment, ISong } from "../../../../../../server/src/models"
import { CommentDispatch, CommentState } from "../hooks/commentInputMenuReducer"
import CommentItem from "./CommentItem/CommentItem"
import { LikeButton, ReplyButton, UsersCommentButtons } from "./CommentItem/ItemButtons"

type SortType = "Top" | "Newest"

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

const SortButton = ({ type, selected, onClick }: { type: SortType; selected: SortType; onClick: () => void }) => {
  const selectedClass = type === selected ? "selected" : ""
  return (
    <div className="comments__header-actions-sort-btn--container">
      <button className={`comments__header-actions-sort-btn ${selectedClass}`} type="button" onClick={onClick}>
        {type}
      </button>
    </div>
  )
}

export const CommentInput = ({ placeholder, dispatch }: { placeholder: string; dispatch: () => void }) => {
  return (
    <div className="comments__header-actions-text">
      <div className="comments__header-actions-text--bs-outset">
        <Photo />
        <div className="comments__header-actions-input--container">
          <input
            type="text"
            className="comments__header-actions-input"
            placeholder={placeholder}
            onClick={dispatch}
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
  toggleSort: SortType
  setToggleSort: Dispatch<SetStateAction<SortType>>
}) => {
  return (
    <div className="comments__header-actions-sort">
      <SortButton type="Top" selected={toggleSort} onClick={() => setToggleSort("Top")} />
      <SortButton type="Newest" selected={toggleSort} onClick={() => setToggleSort("Newest")} />
    </div>
  )
}

export const ReplyActions = ({
  comment,
  song,
  state,
  dispatch,
}: {
  comment: IComment
  song: ISong
  state: CommentState
  dispatch: CommentDispatch
}) => {
  return (
    <div className="comments__item--reply-wrapper">
      <CommentItem comment={comment} authorId={song.user._id} editId={state.isEditingId} lastItemId={comment._id}>
        <LikeButton comment={comment} />
        <ReplyButton reply={comment} onClick={dispatch} total={comment?.replies?.length} />
        <UsersCommentButtons songId={song._id} comment={comment} dispatch={dispatch} />
      </CommentItem>
    </div>
  )
}
