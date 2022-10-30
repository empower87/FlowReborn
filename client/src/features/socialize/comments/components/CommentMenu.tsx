import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useReducer, useState } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { LayoutThree } from "src/components/layouts/LayoutWrappers"
import { IComment } from "../../../../../../server/src/models/Comment"
import { ISong } from "../../../../../../server/src/models/Song"
import { commentInputMenuReducer, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
import Item from "./CommentItem/Item"
import ReplyList from "./CommentList/ReplyList"
import TextBox from "./TextBox"

type InputType = "Comment" | "Edit" | "Reply" | "Hide"
type CommentMenuProps = {
  song: ISong
  page: string
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}
type CommentMenuButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  type: "Back" | "Comment"
}

const Button = ({ onClick, type }: CommentMenuButtonProps) => {
  const color = type === "Comment" ? "White" : "Primary"
  const size = type === "Comment" ? 75 : 100
  return (
    <div className="comments__header-btn--container">
      <button className={`comments__header-btn ${type}`} type="button" onClick={onClick}>
        <Icon type={ButtonTypes[type]} options={{ color: color, size: size }} />
      </button>
    </div>
  )
}

const Header = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="comments__title--container">
      <div className="comments__title--shadow-outset">
        <h3 className="comments__text">{title} </h3>
        <p>{count}</p>
      </div>
    </div>
  )
}

export default function CommentMenu({ song, page, isOpen, onClose }: CommentMenuProps) {
  const comments = song.comments
  const [selectedComment, setSelectedComment] = useState<IComment | undefined>()
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

  const handleCloseMenu = () => {
    onClose(false)
    dispatch({ type: "HIDE", payload: { selectedComment: null } })
  }

  useEffect(() => {
    dispatch({ type: "HIDE", payload: { selectedComment: null } })
  }, [song])

  return (
    <div
      className={`CommentMenu ${isOpen ? "show-menu" : "hide-menu"}`}
      style={page === "home" && isOpen ? { marginBottom: "-8%" } : { marginBottom: "0%" }}
    >
      <LayoutThree
        classes={["comments__list--container", "comments__list--shadow-outset", "comments__list--shadow-inset"]}
      >
        {state.showReplies ? (
          <ul className="comments__list">
            <ReplyList song={song} reducer={{ state: state, dispatch: dispatch }} />
          </ul>
        ) : (
          <ul className="comments__list">
            {comments?.map((item, index) => {
              let isLast = false
              if (comments.length - 1 === index) isLast = true
              return (
                <Item
                  key={item._id}
                  comment={item}
                  song={song}
                  reducer={{ state: state, dispatch: dispatch }}
                  isLast={isLast}
                />
              )
            })}
          </ul>
        )}
      </LayoutThree>

      <LayoutThree
        classes={["comments__header--container", "comments__header--shadow-outset", "comments__header--shadow-inset"]}
      >
        <Button onClick={handleCloseMenu} type="Back" />

        {state.showReplies ? (
          <Header title={"Replies"} count={selectedComment ? selectedComment.replies.length : 0} />
        ) : (
          <Header title={"Comments"} count={comments.length} />
        )}

        <Button onClick={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })} type="Comment" />
      </LayoutThree>

      <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} />
    </div>
  )
}
