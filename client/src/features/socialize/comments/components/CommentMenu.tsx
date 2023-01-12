import { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../../server/src/models"
import { CommentDispatch, commentInputMenuReducer, CommentState, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
import { CommentActions, CommentInput, ReplyActions } from "./CommentActions"
import { CommentHeader, CommentHeaderButton } from "./CommentHeader"
import CommentItem from "./CommentItem/CommentItem"
import { LikeButton, ReplyButton, UsersCommentButtons } from "./CommentItem/ItemButtons"
import TextBox from "./TextBox"

type InputType = "Comment" | "Edit" | "Reply" | "Hide"
type SortType = "Top" | "Newest"

type CommentMenuProps = {
  song: ISong
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}

type CommentMenuLayoutProps = {
  header: JSX.Element
  actions: JSX.Element
  items: JSX.Element
}

function CommentMenuLayout({ header, actions, items }: CommentMenuLayoutProps) {
  return (
    <div className="CommentMenu">
      <div className="comments__header--container">{header}</div>

      <div className="comments__header-actions">
        <div className="comments__header-actions--bs-outset">{actions}</div>
      </div>

      <div className="comments__list--container">
        <div className="comments__list--shadow-outset">
          <div className="comments__list--shadow-inset">
            <ul className="comments__list">{items}</ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReplyMenu({
  song,
  state,
  dispatch,
  comment,
  isOpen,
  onClose,
  onGoBack,
}: {
  song: ISong
  state: CommentState
  dispatch: CommentDispatch
  comment: IComment
  isOpen: boolean
  onClose: () => void
  onGoBack: () => void
}) {
  const root = document.getElementById("root")!
  const getReplies = trpc.useQuery(["comments.get-comment", { _id: comment._id }])
  const lastReply = getReplies.data && getReplies.data.replies[getReplies.data.replies.length - 1]?._id
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <CommentMenuLayout
      header={
        <CommentHeader
          menu="Replies"
          comments={undefined}
          onClose={onClose}
          replyBackButton={<CommentHeaderButton onClick={() => onGoBack()} type="Back" />}
        />
      }
      actions={
        <>
          <ReplyActions comment={comment} song={song} state={state} dispatch={dispatch} />
          <CommentInput
            placeholder="Add a reply"
            dispatch={() => dispatch({ type: "REPLY", payload: { selectedComment: comment } })}
          />
        </>
      }
      items={
        !getReplies.isLoading && getReplies.data ? (
          <>
            {getReplies.data.replies?.map((item, index) => {
              let isLast = false
              if (getReplies?.data?.replies && getReplies.data.replies.length - 1 === index) isLast = true
              return (
                <CommentItem
                  key={item._id}
                  comment={item}
                  authorId={song.user._id}
                  editId={state.isEditingId}
                  lastItemId={lastReply}
                >
                  <LikeButton comment={item} />
                  <UsersCommentButtons songId={song._id} comment={item} dispatch={dispatch} />
                </CommentItem>
              )
            })}
          </>
        ) : (
          <>
            <p>loading..</p>
          </>
        )
      }
    />,
    root
  )
}

export default function CommentMenu({ song, isOpen, onClose }: CommentMenuProps) {
  const root = document.getElementById("root")!
  const comments = song.comments
  const lastCommentId = comments[comments.length - 1]?._id
  const [toggleSort, setToggleSort] = useState<SortType>("Top")
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

  const handleCloseMenu = () => {
    onClose(false)
    dispatch({ type: "CLOSE", payload: { selectedComment: null } })
  }

  useEffect(() => {
    dispatch({ type: "CLOSE", payload: { selectedComment: null } })
  }, [song])

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} dispatch={dispatch} />
      <CommentMenuLayout
        header={<CommentHeader menu="Comments" comments={comments.length} onClose={handleCloseMenu} />}
        actions={
          <>
            <CommentActions toggleSort={toggleSort} setToggleSort={setToggleSort} />
            <CommentInput
              placeholder="Add a comment"
              dispatch={() => dispatch({ type: "COMMENT", payload: { selectedComment: null } })}
            />
          </>
        }
        items={
          <>
            {comments.map((item, index) => {
              let isLast
              if (comments.length - 1 === index) isLast = item._id
              return (
                <CommentItem
                  key={item._id}
                  comment={item}
                  authorId={song.user._id}
                  editId={state.isEditingId}
                  lastItemId={lastCommentId}
                >
                  <ReplyMenu
                    song={song}
                    state={state}
                    dispatch={dispatch}
                    isOpen={state.isReplyMenuOpen}
                    onClose={handleCloseMenu}
                    onGoBack={() => dispatch({ type: "CLOSE_REPLY_MENU", payload: { selectedComment: null } })}
                    comment={item}
                  />
                  <LikeButton comment={item} />
                  <ReplyButton
                    onClick={() => dispatch({ type: "OPEN_REPLY_MENU", payload: { selectedComment: item } })}
                    total={item?.replies?.length}
                  />
                  <UsersCommentButtons songId={song._id} comment={item} dispatch={dispatch} />
                </CommentItem>
              )
            })}
          </>
        }
      />
    </>,
    root
  )
}
