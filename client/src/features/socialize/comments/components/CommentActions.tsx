import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"

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

export const SortButton = ({
  type,
  selected,
  onClick,
}: {
  type: SortType
  selected: SortType
  onClick: () => void
}) => {
  const [selectedClass, setSelectedClass] = useState<string>("")

  useEffect(() => {
    if (type === selected) {
      setSelectedClass("selected")
    } else {
      setSelectedClass("")
    }
  }, [type, selected])

  // const selectedClass = type === selected ? "selected" : ""
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
}: // children,
{
  toggleSort: SortType
  setToggleSort: Dispatch<SetStateAction<SortType>>
  // children: ReactNode
}) => {
  const handleToggleSort = (type: "Top" | "Newest") => {
    if (type !== toggleSort) {
      setToggleSort(type)
    }
  }

  return (
    <div className="comments__header-actions-sort">
      {/* {children} */}
      <SortButton type="Top" selected={toggleSort} onClick={() => handleToggleSort("Top")} />
      <SortButton type="Newest" selected={toggleSort} onClick={() => handleToggleSort("Newest")} />
    </div>
  )
}

export const ReplyActions = ({
  // comment,
  // song,
  // state,
  // dispatch,
  children,
}: {
  children: ReactNode
  // comment: IComment
  // song: ISong
  // state: CommentState
  // dispatch: CommentDispatch
}) => {
  return (
    <div className="comments__item--reply-wrapper">
      {children}
      {/* <CommentItem comment={comment} authorId={song.user._id} editId={state.isEditingId} lastItemId={comment._id}>
        <LikeButton comment={comment} />
        <ReplyButton reply={comment} onClick={dispatch} total={comment?.replies?.length} />
        <EditDeleteButtons songId={song._id} comment={comment} dispatch={dispatch} />
      </CommentItem> */}
    </div>
  )
}
