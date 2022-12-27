import { Dispatch, SetStateAction } from "react"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { IComment, ISong } from "../../../../../../server/src/models"
import { CommentDispatch } from "../hooks/commentInputMenuReducer"
import Item from "./CommentItem/Item"

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
  state: any
  dispatch: CommentDispatch
}) => {
  return (
    <div className="comments__item--reply-wrapper">
      <Item comment={comment} song={song} reducer={{ state: state, dispatch: dispatch }} />
    </div>
  )
}

// export const CommentActions = ({ type, dispatch, children }: { type: "COMMENT" | "REPLY", dispatch: CommentDispatch; children: ReactNode }) => {
//   return (
//     <>
//       {children}
//       <CommentInput dispatch={() => dispatch({ type: type, payload: { selectedComment: null } })} />
//     </>
//   )
// }
