import { Dispatch, SetStateAction } from "react"
import ReactDOM from "react-dom"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../../server/src/models"
import useCommentMenu, { ToggleInputHandlerType } from "../hooks/useCommentMenu"
import { CommentActions, CommentInput, ReplyActions } from "./CommentActions"
import { CommentHeader, CommentHeaderButton } from "./CommentHeader"
import CommentItem from "./CommentItem/CommentItem"
import { EditDeleteButtons, LikeButton, ReplyButton } from "./CommentItem/ItemButtons"
import TextBox from "./TextBox"

type CommentMenuType = "Comments" | "Replies"

type CommentMenuProps = {
  song: ISong
  isOpen: boolean
  onClose: Dispatch<SetStateAction<boolean>>
}

type ReplyMenuProps = {
  editingId: string | null
  toggleInput: ToggleInputHandlerType
  parentComment: IComment | null
  isOpen: boolean
}

type CommentMenuLayoutProps = {
  header: JSX.Element
  actions: JSX.Element
  list: JSX.Element
}

function CommentMenuLayout({ header, actions, list }: CommentMenuLayoutProps) {
  return (
    <div className="CommentMenu">
      <div className="comments__header--container">{header}</div>

      <div className="comments__header-actions">
        <div className="comments__header-actions--bs-outset">{actions}</div>
      </div>

      <div className="comments__list--container">
        <div className="comments__list--shadow-outset">
          <div className="comments__list--shadow-inset">{list}</div>
        </div>
      </div>
    </div>
  )
}

function ReplyMenu({ editingId, toggleInput, parentComment, isOpen }: ReplyMenuProps) {
  const root = document.getElementById("root")!
  if (!parentComment || !isOpen) return null
  const getReplies = trpc.useQuery(["comments.get-comment", { _id: parentComment._id }])
  const lastReply = getReplies.data && getReplies.data.replies[getReplies.data.replies.length - 1]?._id
  const songId = parentComment.parent._id ? parentComment.parent._id : (parentComment.parent as unknown as string)

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <CommentMenuLayout
      header={
        <CommentHeader
          menu="Replies"
          onClose={() => toggleInput("CLOSE_MENUS")}
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
              <EditDeleteButtons comment={parentComment} onClick={toggleInput} />
            </CommentItem>
          </ReplyActions>
          <CommentInput
            type="Replies"
            placeholder="Add a reply..."
            onClick={() => toggleInput("OPEN_REPLY_INPUT", parentComment)}
          />
        </>
      }
      list={
        <div className="comments__list">
          {getReplies.isLoading || getReplies.isRefetching ? (
            <p>loading...</p>
          ) : getReplies.data ? (
            <>
              {getReplies.data.replies?.map((item) => {
                return (
                  <CommentItem
                    key={item._id}
                    comment={item}
                    authorId={songId}
                    editId={editingId}
                    lastItemId={lastReply}
                  >
                    <LikeButton comment={item} />
                    <EditDeleteButtons comment={item} onClick={toggleInput} />
                  </CommentItem>
                )
              })}
            </>
          ) : (
            <></>
          )}
        </div>
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
    handleToggleInput,
    onSubmit,
    sortComments,
    sortCommentsHandler,
    mutationStatus,
    setMutationStatus,
  } = useCommentMenu(song, onClose)
  const lastCommentId = comments[comments.length - 1]?._id

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <TextBox
        inputType={state.showInput}
        comment={state.selectedComment}
        onClose={handleToggleInput}
        onSubmit={onSubmit}
        // isLoading={mutationStatus.isLoading}
        // isSubmitting={mutationStatus.isSubmitting}
        // error={mutationStatus.error}
        status={mutationStatus}
      />

      <ReplyMenu
        editingId={state.isEditingId}
        toggleInput={handleToggleInput}
        isOpen={state.isReplyMenuOpen}
        parentComment={state.replyComment}
      />

      <CommentMenuLayout
        header={
          <CommentHeader
            menu="Comments"
            onClose={() => handleToggleInput("CLOSE_MENUS")}
            totalComments={comments.length}
          />
        }
        actions={
          <>
            <CommentActions toggleSort={sortComments} setToggleSort={sortCommentsHandler} />
            <CommentInput
              type="Comments"
              placeholder="Add a comment..."
              onClick={() => handleToggleInput("OPEN_COMMENT_INPUT", undefined)}
            />
          </>
        }
        list={
          <ul className="comments__list">
            {comments.map((item, index) => {
              const total = item.replies?.length
              return (
                <CommentItem
                  key={`${item._id}_CommentMenu_${index}`}
                  comment={item}
                  authorId={song.user._id}
                  editId={state.isEditingId}
                  lastItemId={lastCommentId}
                >
                  <LikeButton comment={item} />
                  <ReplyButton reply={item} onClick={handleToggleInput} total={total} />
                  <EditDeleteButtons comment={item} onClick={handleToggleInput} />
                </CommentItem>
              )
            })}
          </ul>
        }
      />
    </>,
    root
  )
}
