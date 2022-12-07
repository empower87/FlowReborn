import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
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
  type: "Close" | "Comment"
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
        <div className="comments__header-toggle-fullscreen">
          <div className="comments__header-toggle-fullscreen--bs-inset">
            <button className="comments__header-toggle-fullscreen-btn"></button>
          </div>
        </div>
      </div>
    </div>
  )
}

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

const Input = ({ onFocus }: { onFocus: () => void }) => {
  return (
    <div className="comments__header-actions-input--container">
      <input
        type="text"
        className="comments__header-actions-input"
        placeholder="Add a comment"
        onFocus={onFocus}
      ></input>
    </div>
  )
}

export default function CommentMenu({ song, page, isOpen, onClose }: CommentMenuProps) {
  const root = document.getElementById("root")!
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

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div
      // className={`CommentMenu ${isOpen ? "show-menu" : "hide-menu"}`}
      className="CommentMenu"
      // style={page === "home" && isOpen ? { marginBottom: "-8%" } : { marginBottom: "0%" }}
    >
      <div className="comments__header--container">
        <div className="comments__header">
          <div className="comments__header--shadow-outset">
            <div className="comments__header--shadow-inset">
              {state.showReplies ? (
                <Header title={"Replies"} count={selectedComment ? selectedComment.replies.length : 0} />
              ) : (
                <Header title={"Comments"} count={comments.length} />
              )}

              <Button onClick={handleCloseMenu} type="Close" />
              {/* <Button onClick={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })} type="Comment" /> */}
            </div>
          </div>
        </div>
        <div className="comments__header-actions">
          <div className="comments__header-actions-sort"></div>
          <div className="comments__header-actions-text">
            <div className="comments__header-actions-text--bs-outset">
              <Photo />

              <Input onFocus={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })} />
            </div>
          </div>
        </div>
      </div>

      <div className="comments__list--container">
        <div className="comments__list--shadow-outset">
          <div className="comments__list--shadow-inset">
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
          </div>
        </div>
      </div>

      <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} />
    </div>,
    root
  )
}
// export default function CommentMenu({ song, page, isOpen, onClose }: CommentMenuProps) {
//   const comments = song.comments
//   const [selectedComment, setSelectedComment] = useState<IComment | undefined>()
//   const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

//   const handleCloseMenu = () => {
//     onClose(false)
//     dispatch({ type: "HIDE", payload: { selectedComment: null } })
//   }

//   useEffect(() => {
//     dispatch({ type: "HIDE", payload: { selectedComment: null } })
//   }, [song])

//   return (
//     <div
//       className={`CommentMenu ${isOpen ? "show-menu" : "hide-menu"}`}
//       style={page === "home" && isOpen ? { marginBottom: "-8%" } : { marginBottom: "0%" }}
//     >
//       <div className="comments__list--container">
//         <div className="comments__list--shadow-outset">
//           <div className="comments__list--shadow-inset">
//             {state.showReplies ? (
//               <ul className="comments__list">
//                 <ReplyList song={song} reducer={{ state: state, dispatch: dispatch }} />
//               </ul>
//             ) : (
//               <ul className="comments__list">
//                 {comments?.map((item, index) => {
//                   let isLast = false
//                   if (comments.length - 1 === index) isLast = true
//                   return (
//                     <Item
//                       key={item._id}
//                       comment={item}
//                       song={song}
//                       reducer={{ state: state, dispatch: dispatch }}
//                       isLast={isLast}
//                     />
//                   )
//                 })}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="comments__header--container">
//         <div className="comments__header--shadow-outset">
//           <div className="comments__header--shadow-inset">
//             <Button onClick={handleCloseMenu} type="Back" />

//             {state.showReplies ? (
//               <Header title={"Replies"} count={selectedComment ? selectedComment.replies.length : 0} />
//             ) : (
//               <Header title={"Comments"} count={comments.length} />
//             )}

//             <Button onClick={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })} type="Comment" />
//           </div>
//         </div>
//       </div>

//       <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} />
//     </div>
//   )
// }
