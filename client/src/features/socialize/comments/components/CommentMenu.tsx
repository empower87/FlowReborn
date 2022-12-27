import { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { IComment } from "../../../../../../server/src/models/Comment"
import { ISong } from "../../../../../../server/src/models/Song"
import { commentInputMenuReducer, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
import { CommentActions, CommentInput, ReplyActions } from "./CommentActions"
import { CommentHeader } from "./CommentHeader"
import { CommentList } from "./CommentList/CommentList"
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
type CommentMenuUIProps = {
  menu: "Comments" | "Replies"
  list: JSX.Element
  comments: IComment[]
  handleCloseMenu: () => void
  actions: JSX.Element
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
              <ReplyActions comment={comment} song={song} state={state} dispatch={dispatch} />
              <CommentInput
                placeholder="Add a reply"
                dispatch={() => dispatch({ type: "REPLY", payload: { selectedComment: comment } })}
              />
            </>
          ) : (
            <>
              <CommentActions toggleSort={toggleSort} setToggleSort={setToggleSort} />
              <CommentInput
                placeholder="Add a comment"
                dispatch={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })}
              />
            </>
          )
        }
      />
    </>,
    root
  )
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
