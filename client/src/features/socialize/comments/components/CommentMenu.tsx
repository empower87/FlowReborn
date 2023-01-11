import { Dispatch, SetStateAction, useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { useAuth } from "src/context/AuthContext"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../../server/src/models"
import { commentInputMenuReducer, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
import { CommentActions, CommentInput, ReplyActions } from "./CommentActions"
import { CommentHeader, CommentHeaderButton } from "./CommentHeader"
import CommentItem from "./CommentItem/CommentItem"
import { LikeButton, ReplyButton, UsersCommentButtons } from "./CommentItem/ItemButtons"
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

export function ReplyMenu({
  menu,
  song,
  comment,
  isOpen,
  onClose,
  onGoBack,
}: {
  menu: "Comments" | "Replies"
  song: ISong
  comment: IComment
  isOpen: boolean
  onClose: () => void
  onGoBack: () => void
}) {
  const root = document.getElementById("root")!
  const { user } = useAuth()
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)
  const getReplies = trpc.useQuery(["comments.get-comment", { _id: comment._id }])

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <TextBox type={state.showInput} songId={song._id} comment={state.selectedComment} dispatch={dispatch} />
      <CommentMenuLayout
        header={
          <CommentHeader
            menu={menu}
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
                let isUser = false
                if (user && item.user?._id === user._id) isUser = true
                if (getReplies?.data?.replies && getReplies.data.replies.length - 1 === index) isLast = true
                return (
                  <CommentItem
                    key={item._id}
                    comment={item}
                    song={song}
                    reducer={{ state: state, dispatch: dispatch }}
                    isLast={isLast}
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
      />
    </>,
    root
  )
}

export default function CommentMenu({ menu, song, isOpen, onClose }: CommentMenuProps) {
  const root = document.getElementById("root")!
  const { user } = useAuth()
  const comments = song.comments
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
        header={<CommentHeader menu={menu} comments={comments.length} onClose={handleCloseMenu} />}
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
              let isLast = false
              let isUser = false
              if (user && item.user?._id === user?._id) isUser = true
              if (comments.length - 1 === index) isLast = true
              return (
                <CommentItem
                  key={item._id}
                  comment={item}
                  song={song}
                  reducer={{ state: state, dispatch: dispatch }}
                  isLast={isLast}
                >
                  <ReplyMenu
                    menu="Replies"
                    song={song}
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
