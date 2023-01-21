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
  // song,
  // state,
  editingId,
  toggleInput,
  parentComment,
  isOpen,
}: // onClose,
// onGoBack,
{
  // song: ISong
  // state: CommentState
  editingId: string | null
  toggleInput: (type: any, data?: IComment | undefined) => void
  parentComment: IComment | null
  isOpen: boolean
  // onClose: () => void
  // onGoBack: () => void
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
          {/* <ReplyActions comment={parentComment} song={song} state={state} dispatch={dispatch} /> */}
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
                  <EditDeleteButtons
                    // songId={item.parent._id ? item.parent._id : (item.parent as unknown as string)}
                    comment={item}
                    dispatch={toggleInput}
                  />
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
  const {
    comments,
    state,
    handleCloseInput,
    handleToggleInput,
    onSubmit,
    // handleCloseCommentMenu,
    sortComments,
    setSortComments,
  } = useCommentMenu(song._id, song.comments, onClose)
  const lastCommentId = comments[comments.length - 1]?._id

  console.log(comments, song.comments, "YO WHAT THE FUCK MAN WHAT THE FUCCKKCKCCKCK")
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <TextBox type={state.showInput} comment={state.selectedComment} onClose={handleCloseInput} onSubmit={onSubmit} />

      <ReplyMenu
        // song={song}
        // state={state}
        editingId={state.isEditingId}
        toggleInput={handleToggleInput}
        isOpen={state.isReplyMenuOpen}
        // onClose={handleCloseCommentMenu}
        // onGoBack={() => handleToggleInput("CLOSE_REPLY_MENU")}
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
