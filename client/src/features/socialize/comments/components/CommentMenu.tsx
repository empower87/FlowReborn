import { Dispatch, SetStateAction } from "react"
import ReactDOM from "react-dom"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../../server/src/models"
import useCommentMenu from "../hooks/useCommentMenu"
import { CommentActions, CommentInput, ReplyActions } from "./CommentActions"
import { CommentHeader, CommentHeaderButton } from "./CommentHeader"
import CommentItem from "./CommentItem/CommentItem"
import { EditDeleteButtons, LikeButton, ReplyButton } from "./CommentItem/ItemButtons"
import TextBox from "./TextBox"

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
  editingId,
  toggleInput,
  parentComment,
  isOpen,
}: {
  editingId: string | null
  toggleInput: (type: any, data?: IComment | undefined) => void
  parentComment: IComment | null
  isOpen: boolean
}) {
  const root = document.getElementById("root")!
  if (!parentComment || !isOpen) return null

  const getReplies = trpc.useQuery(["comments.get-comment", { _id: parentComment._id }])
  const lastReply = getReplies.data && getReplies.data.replies[getReplies.data.replies.length - 1]?._id

  const songId = parentComment.parent._id ? parentComment.parent._id : (parentComment.parent as unknown as string)
  if (getReplies.data) console.log(getReplies.data, "WTF IS GOING ON WITH REPLIES MAN")
  return ReactDOM.createPortal(
    <CommentMenuLayout
      header={
        <CommentHeader
          menu="Replies"
          comments={undefined}
          onClose={() => toggleInput("CLOSE")}
          replyBackButton={<CommentHeaderButton onClick={() => toggleInput("CLOSE_REPLY_MENU")} type="Back" />}
        />
      }
      actions={
        <>
          <ReplyActions>
            <CommentItem comment={parentComment} authorId={songId} editId={editingId} lastItemId={parentComment._id}>
              <LikeButton comment={parentComment} />
              <ReplyButton
                reply={parentComment}
                onClick={toggleInput}
                total={getReplies?.data?.replies?.length ? getReplies.data.replies.length : 0}
              />
              <EditDeleteButtons comment={parentComment} dispatch={toggleInput} />
            </CommentItem>
          </ReplyActions>
          <CommentInput placeholder="Add a reply" dispatch={() => toggleInput("REPLY", parentComment)} />
        </>
      }
      items={
        !getReplies.isLoading && getReplies.data ? (
          <>
            {getReplies.data.replies?.map((item, index) => {
              return (
                <CommentItem key={item._id} comment={item} authorId={songId} editId={editingId} lastItemId={lastReply}>
                  <LikeButton comment={item} />
                  <EditDeleteButtons comment={item} dispatch={toggleInput} />
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
  const { comments, state, handleToggleInput, onSubmit, sortComments, setSortComments } = useCommentMenu(
    song._id,
    song.comments,
    onClose
  )
  const lastCommentId = comments[comments.length - 1]?._id

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <TextBox type={state.showInput} comment={state.selectedComment} onClose={handleToggleInput} onSubmit={onSubmit} />

      <ReplyMenu
        editingId={state.isEditingId}
        toggleInput={handleToggleInput}
        isOpen={state.isReplyMenuOpen}
        parentComment={state.replyComment}
      />

      <CommentMenuLayout
        header={<CommentHeader menu="Comments" comments={comments.length} onClose={() => handleToggleInput("CLOSE")} />}
        actions={
          <>
            <CommentActions toggleSort={sortComments} setToggleSort={setSortComments} />
            <CommentInput placeholder="Add a comment" dispatch={() => handleToggleInput("COMMENT", undefined)} />
          </>
        }
        items={
          <>
            {comments.map((item) => {
              const total = item.replies?.length
              return (
                <CommentItem
                  key={item._id}
                  comment={item}
                  authorId={song.user._id}
                  editId={state.isEditingId}
                  lastItemId={lastCommentId}
                >
                  <LikeButton comment={item} />
                  <ReplyButton reply={item} onClick={handleToggleInput} total={total} />
                  <EditDeleteButtons comment={item} dispatch={handleToggleInput} />
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
