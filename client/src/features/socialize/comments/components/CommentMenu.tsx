import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { trpc } from "src/utils/trpc"
import { IComment } from "../../../../../../server/src/models/Comment"
import { ISong } from "../../../../../../server/src/models/Song"
import { CommentDispatch, commentInputMenuReducer, CommentState, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
import Item from "./CommentItem/Item"
import TextBox from "./TextBox"

type InputType = "Comment" | "Edit" | "Reply" | "Hide"
type SortType = "Top" | "Newest"

type CommentMenuProps = {
  menu: "Comments" | "Replies"
  song: ISong
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
  comment?: IComment
}
type CommentMenuButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  type: "Close" | "Comment" | "Back"
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

const SortButton = ({ type, selected, onClick }: { type: SortType; selected: SortType; onClick: () => void }) => {
  const isSelected = type === selected ? "selected" : ""
  return (
    <div className="comments__header-actions-sort-btn--container">
      <button className={`comments__header-actions-sort-btn ${isSelected}`} type="button" onClick={onClick}>
        {type}
      </button>
    </div>
  )
}

const Title = ({ title, count }: { title: string; count: number }) => {
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

export default function CommentMenu({ menu, song, isOpen, onClose, comment }: CommentMenuProps) {
  const root = document.getElementById("root")!
  const comments = song.comments
  const [toggleSort, setToggleSort] = useState<SortType>("Top")
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
    <>
      <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} />
      <CommentMenuUI
        menu={menu}
        list={
          <CommentList
            song={song}
            state={state}
            dispatch={dispatch}
            comments={menu === "Replies" && comment ? comment?.replies : comments}
            replyId={menu === "Replies" && comment ? comment._id : undefined}
          />
        }
        comments={comments}
        handleCloseMenu={handleCloseMenu}
        actions={
          menu === "Replies" && comment ? (
            <>
              <div className="comments__item--reply-wrapper">
                <Item comment={comment} song={song} reducer={{ state: state, dispatch: dispatch }} />
              </div>
              <CommentInput dispatch={() => dispatch({ type: "REPLY", payload: { selectedComment: comment } })} />
            </>
          ) : (
            <CommentActions toggleSort={toggleSort} setToggleSort={setToggleSort} dispatch={dispatch} />
          )
        }
      />
    </>,
    root
  )
}

const CommentInput = ({ dispatch }: { dispatch: () => void }) => {
  return (
    <div className="comments__header-actions-text">
      <div className="comments__header-actions-text--bs-outset">
        <Photo />
        <div className="comments__header-actions-input--container">
          <input
            type="text"
            className="comments__header-actions-input"
            placeholder="Add a comment"
            onClick={dispatch}
          ></input>
        </div>
      </div>

      {/* <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} /> */}
    </div>
  )
}

const CommentActions = ({
  toggleSort,
  setToggleSort,
  dispatch,
}: {
  toggleSort: SortType
  setToggleSort: Dispatch<SetStateAction<SortType>>
  dispatch: CommentDispatch
}) => {
  return (
    <>
      <div className="comments__header-actions-sort">
        <SortButton type="Top" selected={toggleSort} onClick={() => setToggleSort("Top")} />
        <SortButton type="Newest" selected={toggleSort} onClick={() => setToggleSort("Newest")} />
      </div>
      <CommentInput dispatch={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })} />
    </>
  )
}

export const CommentList = ({
  song,
  state,
  dispatch,
  comments,
  replyId,
}: {
  song: ISong
  state: CommentState
  dispatch: CommentDispatch
  comments: IComment[]
  replyId?: string
}) => {
  const [list, setList] = useState<IComment[]>([])
  const replies = trpc.useQuery(["comments.get-comment", { _id: replyId ? replyId : "" }])

  useEffect(() => {
    if (replyId && replies.data) {
      console.log(replies.data, "wtf")
      setList(replies.data.replies)
    } else {
      setList(comments)
    }
  }, [replyId, replies, comments])

  console.log(list, comments, "check this shit son")
  return (
    <div className="comments__list--shadow-outset">
      <div className="comments__list--shadow-inset">
        <ul className="comments__list">
          {list?.map((item, index) => {
            let isLast = false
            if (list.length - 1 === index) isLast = true
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
      </div>
    </div>
  )
}

export const CommentHeader = ({
  menu,
  comments,
  handleCloseMenu,
}: {
  menu: "Comments" | "Replies"
  comments: IComment[]
  handleCloseMenu: () => void
}) => {
  return (
    <div className="comments__header--shadow-outset">
      <div className="comments__header--shadow-inset">
        {menu === "Replies" ? <Button onClick={handleCloseMenu} type="Back" /> : null}
        <Title title={menu} count={comments.length} />
        <Button onClick={handleCloseMenu} type="Close" />
      </div>
    </div>
  )
}

type CommentMenuUIProps = {
  menu: "Comments" | "Replies"
  list: JSX.Element
  comments: IComment[]
  handleCloseMenu: () => void
  actions: JSX.Element
}

export const CommentMenuUI = ({ menu, list, comments, handleCloseMenu, actions }: CommentMenuUIProps) => {
  return (
    <div className="CommentMenu">
      <div className="comments__header--container">
        <CommentHeader menu={menu} comments={comments} handleCloseMenu={handleCloseMenu} />
      </div>

      <div className="comments__header-actions">
        <div className="comments__header-actions--bs-outset">{actions}</div>
      </div>

      <div className="comments__list--container">{list}</div>

      {/* <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} /> */}
    </div>
  )
}

// export default function CommentMenu({ song, isOpen, onClose }: CommentMenuProps) {
//   const root = document.getElementById("root")!
//   const comments = song.comments
//   const [selectedComment, setSelectedComment] = useState<IComment | undefined>()
//   const [toggleSort, setToggleSort] = useState<"Top" | "Newest">("Top")
//   const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

//   const handleCloseMenu = () => {
//     onClose(false)
//     dispatch({ type: "HIDE", payload: { selectedComment: null } })
//   }

//   useEffect(() => {
//     dispatch({ type: "HIDE", payload: { selectedComment: null } })
//   }, [song])

//   if (!isOpen) return null
//   return ReactDOM.createPortal(
//     <div className="CommentMenu">
//       <div className="comments__header--container">
//         <div className="comments__header">
//           <div className="comments__header--shadow-outset">
//             <div className="comments__header--shadow-inset">
//               {state.showReplies ? (
//                 <Header title={"Replies"} count={selectedComment ? selectedComment.replies.length : 0} />
//               ) : (
//                 <Header title={"Comments"} count={comments.length} />
//               )}

//               <Button onClick={handleCloseMenu} type="Close" />
//               {/* <Button onClick={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })} type="Comment" /> */}
//             </div>
//           </div>
//         </div>

//         <div className="comments__header-actions">
//           <div className="comments__header-actions--bs-outset">
//             <div className="comments__header-actions-sort">
//               <SortButton type="Top" selected={toggleSort} onClick={() => setToggleSort("Top")} />
//               <SortButton type="Newest" selected={toggleSort} onClick={() => setToggleSort("Newest")} />
//             </div>
//             <div className="comments__header-actions-text">
//               <div className="comments__header-actions-text--bs-outset">
//                 <Photo />

//                 <Input onFocus={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

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

//       <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} />
//     </div>,
//     root
//   )
// }

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
