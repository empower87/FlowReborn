import { MouseEventHandler, ReactNode, useLayoutEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import useFormatDate from "src/hooks/useFormatDate"
import { IComment, ISong } from "../../../../../../../server/src/models/index"
import { CommentInputReducerType } from "../../hooks/commentInputMenuReducer"

type InputType = "Comment" | "Edit" | "Reply" | "Hide"

type ItemProps = {
  comment: IComment
  song: ISong
  // openInputModal: (type: InputType, editId?: string, comment?: IComment) => void
  reducer: CommentInputReducerType
  isLast: boolean
  isReply?: boolean
  children?: ReactNode
}

type HeaderProps = {
  username: string
  onClick: MouseEventHandler<HTMLButtonElement>
  picture: string | undefined
  isAuthor: boolean
}

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
      {isAuthor && (
        <div className="comments__user-title-icon">
          <Icon type={ButtonTypes.Check} options={{ color: "White" }} />
        </div>
      )}
    </button>
  )
}

const Date = ({ createdOn, editedOn }: { createdOn: Date | undefined; editedOn?: Date }) => {
  const { formatDate } = useFormatDate()
  return (
    <p className="comments__date">
      {editedOn
        ? `${String.fromCodePoint(8226)} ${formatDate(createdOn, "m")} (edited)`
        : `${String.fromCodePoint(8226)} ${formatDate(createdOn, "m")}`}
    </p>
  )
}

export default function CommentItem({ song, comment, reducer, isLast, isReply, children }: ItemProps) {
  const navigate = useNavigate()
  const { user } = useAuth()
  // const [showReplies, setShowReplies] = useState<boolean>(false)
  // const [isEditing, setIsEditing] = useState<boolean>(false)
  const isAuthor = song.user._id === comment?.user?._id ? true : false
  const isUser = user && user._id === comment?.user?._id ? true : false
  const isEditing = reducer.state.isEditingId === comment._id ? true : false
  // const replyButtonOnClick = () => {
  //   if (isReply) {
  //     return reducer.dispatch({ type: "REPLY", payload: { selectedComment: comment } })
  //   } else {
  //     return setShowReplies(true)
  //   }
  // }

  const navigateToProfilePage = () => {
    navigate(`/profile/${comment?.user?._id}`)
  }

  return (
    <CommentItemLayout
      comment={comment}
      goToProfile={navigateToProfilePage}
      isLastItem={isLast}
      isEditing={isEditing}
      isUser={isUser}
      isAuthor={isAuthor}
    >
      {children}
    </CommentItemLayout>
  )
}
// export default function CommentItem({ song, comment, reducer, isLast, isReply, children }: ItemProps) {
//   const navigate = useNavigate()
//   const { user } = useAuth()
//   const [showReplies, setShowReplies] = useState<boolean>(false)
//   // const [isEditing, setIsEditing] = useState<boolean>(false)
//   const isAuthor = song.user._id === comment?.user?._id ? true : false
//   const isUser = user && user._id === comment?.user?._id ? true : false

//   const replyButtonOnClick = () => {
//     if (isReply) {
//       return reducer.dispatch({ type: "REPLY", payload: { selectedComment: comment } })
//     } else {
//       return setShowReplies(true)
//     }
//   }

//   const navigateToProfilePage = () => {
//     navigate(`/profile/${comment?.user?._id}`)
//   }

//   return (
//     <li
//       id={comment?._id}
//       className={`comments__item ${comment?._id === reducer.state.isEditingId ? "highlight" : ""}`}
//       style={isLast ? { borderRadius: "0.4em 0.4em 0.4em 2.2em" } : {}}
//     >
//       {children}
//       <div className="comment-list-inner">
//         <Photo
//           username={comment?.user?.username}
//           picture={comment?.user?.picture}
//           onClick={() => navigateToProfilePage()}
//         />

//         <div className="comments__text--container">
//           <div className="comments__text--shadow-outset">
//             <div className="comments__user-details">
//               <div className="comments__user-details--bs-inset">
//                 <Title username={comment?.user?.username} isAuthor={isAuthor} onClick={() => navigateToProfilePage()} />
//                 <Date createdOn={comment?.createdOn} editedOn={comment?.editedOn} />
//               </div>
//             </div>
//             <p className="comments__comment">{comment?.text}</p>
//           </div>
//         </div>
//       </div>

//       <div className="comments__actions--container">
//         <div className="space-filler"></div>
//         <div className="comments__actions">
//           <div className="comments__actions--shadow-inset">
//             <LikeButton comment={comment} />
//             <ReplyButton onClick={replyButtonOnClick} total={comment?.replies?.length} />
//             {isUser ? (
//               <>
//               <EditButton onClick={() => reducer.dispatch({ type: "EDIT", payload: { selectedComment: comment } })} />
//               <DeleteButton songId={song._id} commentId={comment?._id} />
//               </>
//             ): null}
//           </div>
//         </div>
//       </div>
//     </li>
//   )
// }

type CommentItemLayoutProps = {
  comment: IComment
  goToProfile: () => void
  isLastItem: boolean
  isEditing: boolean
  isUser: boolean
  isAuthor: boolean
  children: ReactNode
}

type CommentItemButtonsProps = {
  comment: IComment
}

// const CommentItemButtons = ({ }: CommentItemButtonsProps) => {
//   return (
//     <div className="comments__actions--shadow-inset">
//       <LikeButton comment={comment} />
//       <ReplyButton onClick={replyButtonOnClick} total={comment?.replies?.length} />
//       {isUser ? (
//         <>
//         <EditButton onClick={() => reducer.dispatch({ type: "EDIT", payload: { selectedComment: comment } })} />
//         <DeleteButton songId={song._id} commentId={comment?._id} />
//         </>
//       ) : null}
//     </div>
//   )
// }

export function CommentItemLayout({
  comment,
  goToProfile,
  isLastItem,
  isEditing,
  isUser,
  isAuthor,
  children,
}: CommentItemLayoutProps) {
  return (
    <li
      id={comment?._id}
      className={`comments__item ${isEditing ? "highlight" : ""}`}
      // className={`comments__item ${comment?._id === reducer.state.isEditingId ? "highlight" : ""}`}
      style={isLastItem ? { borderRadius: "0.4em 0.4em 0.4em 2.2em" } : {}}
    >
      <div className="comment-list-inner">
        <Photo username={comment?.user?.username} picture={comment?.user?.picture} onClick={() => goToProfile()} />

        <div className="comments__text--container">
          <div className="comments__text--shadow-outset">
            <div className="comments__user-details">
              <div className="comments__user-details--bs-inset">
                <Title username={comment?.user?.username} isAuthor={isAuthor} onClick={() => goToProfile()} />
                <Date createdOn={comment?.createdOn} editedOn={comment?.editedOn} />
              </div>
            </div>
            <p className="comments__comment">{comment?.text}</p>
          </div>
        </div>
      </div>

      <div className="comments__actions--container">
        <div className="space-filler"></div>
        <div className="comments__actions">
          <div className="comments__actions--shadow-inset">
            {children}
            {/* <LikeButton comment={comment} />
          <ReplyButton onClick={replyButtonOnClick} total={comment?.replies?.length} />
          {isUser && (
            <EditButton onClick={() => reducer.dispatch({ type: "EDIT", payload: { selectedComment: comment } })} />
          )}
          {isUser && <DeleteButton songId={song._id} commentId={comment?._id} />} */}
          </div>
        </div>
      </div>
    </li>
  )
}
