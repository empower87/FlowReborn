import { Dispatch, MouseEvent, SetStateAction, useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../../server/src/models"
import { commentInputMenuReducer, CommentState, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
import useComments from "../hooks/useComments"
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
  song,
  state,
  // dispatch,
  toggleInput,
  parentComment,
  isOpen,
  onClose,
  onGoBack,
}: {
  song: ISong
  state: CommentState
  // dispatch: CommentDispatch
  toggleInput: (type: any, data?: IComment | undefined) => void
  parentComment: IComment | null
  isOpen: boolean
  onClose: () => void
  onGoBack: () => void
}) {
  const root = document.getElementById("root")!
  if (!parentComment || !isOpen) return null

  const getReplies = trpc.useQuery(["comments.get-comment", { _id: parentComment._id }])
  const lastReply = getReplies.data && getReplies.data.replies[getReplies.data.replies.length - 1]?._id

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
          {/* <ReplyActions comment={parentComment} song={song} state={state} dispatch={dispatch} /> */}
          <ReplyActions>
            <CommentItem
              comment={parentComment}
              authorId={song.user._id}
              editId={state.isEditingId}
              lastItemId={parentComment._id}
            >
              <LikeButton comment={parentComment} />
              <ReplyButton reply={parentComment} onClick={toggleInput} total={parentComment?.replies?.length} />
              <EditDeleteButtons songId={song._id} comment={parentComment} dispatch={toggleInput} />
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
                <CommentItem
                  key={item._id}
                  comment={item}
                  authorId={song.user._id}
                  editId={state.isEditingId}
                  lastItemId={lastReply}
                >
                  <LikeButton comment={item} />
                  <EditDeleteButtons songId={song._id} comment={item} dispatch={toggleInput} />
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

const useCommentMenu = (onClose: Dispatch<SetStateAction<boolean>>) => {
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

  const handleCloseCommentMenu = () => {
    dispatch({ type: "CLOSE" })
    onClose(false)
  }

  const handleToggleReplyMenu = (toggle: "OPEN_REPLY_MENU" | "CLOSE_REPLY_MENU") => {
    dispatch({ type: toggle })
  }

  const handleCloseInput = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: "CLOSE" })
    }
  }
  return {
    state,
    dispatch,
    handleToggleReplyMenu,
    handleCloseCommentMenu,
    handleCloseInput,
  }
}

const useCommentss = (songId: string, _comments: IComment[], onClose: Dispatch<SetStateAction<boolean>>) => {
  const [comments, setComments] = useState<IComment[]>([])
  const { addComment, editComment, error, isLoading, data } = useComments()
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

  useEffect(() => {
    setComments(_comments)
  }, [_comments])

  useEffect(() => {
    if ((data && !data.data) || (data && !data.target)) return
    switch (data?.target) {
      case "ADD":
        if (!data || typeof data.data === "undefined" || data.target !== "ADD") return
        setComments((prev) => [...prev, data.data])
        break
      case "EDIT":
        if (!data || typeof data.data === "undefined" || data.target !== "EDIT") return
        const hasComment = comments.some((comment) => comment._id === data.data._id)
        if (hasComment) {
          setComments((prev) =>
            prev.map((prevComment) => {
              if (prevComment._id === data.data._id) {
                return data.data
              } else {
                return prevComment
              }
            })
          )
        } else {
          dispatch({ type: "UPDATE_REPLY_MENU", payload: { editComment: data.data } })
          // setComments((prev) =>
          //   prev.map((prevComment) => {
          //     return {
          //       ...prevComment,
          //       replies: prevComment.replies.map((reply) => {
          //         if (reply._id === data.data._id) return data.data
          //         else return reply
          //       }),
          //     }
          //   })
          // )
        }
        break
      case "DELETE":
        if (!data || typeof data.data === "undefined" || data.target !== "DELETE") return
        setComments((prev) => prev.filter((prevComment) => prevComment._id !== data.data._id))
        break
      default:
        return
    }
    console.log(data, "Did Comments update?")
  }, [data])

  const handleCloseCommentMenu = () => {
    dispatch({ type: "CLOSE" })
    onClose(false)
  }

  const handleToggleInput = (
    type: "EDIT" | "REPLY" | "COMMENT" | "OPEN_REPLY_MENU" | "CLOSE_REPLY_MENU",
    data?: IComment | undefined
  ) => {
    switch (type) {
      case "EDIT":
        dispatch({ type: "EDIT", payload: { editComment: data } })
        console.log("TOGGLE EDIT INPUT", data?.text, state.selectedComment?.text)
        break
      case "REPLY":
        dispatch({ type: "REPLY", payload: { reply: data } })
        console.log("TOGGLE REPLY INPUT", data?.text, state.selectedComment?.text)
        break
      case "OPEN_REPLY_MENU":
        dispatch({ type: "OPEN_REPLY_MENU", payload: { reply: data } })
        console.log("TOGGLE OPEN_REPLY INPUT", data?.text, state.selectedComment?.text)
        break
      case "CLOSE_REPLY_MENU":
        dispatch({ type: "CLOSE_REPLY_MENU" })
        console.log("TOGGLE CLOSE REPLY INPUT", data?.text, state.selectedComment?.text)
        break
      case "COMMENT":
        dispatch({ type: "COMMENT" })
        console.log("TOGGLE COMMENT INPUT", data?.text, state.selectedComment?.text)
        break
    }
  }

  const handleCloseInput = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch({ type: "HIDE" })
    }
  }

  const onSubmit = (e: MouseEvent<HTMLButtonElement>, text: string | undefined) => {
    if (!text || text === "") return
    switch (state.showInput) {
      case "EDIT":
        if (!state.selectedComment) return
        editComment(state.selectedComment._id, text)
        break
      case "REPLY":
        if (!state.selectedComment) return
        addComment(state.selectedComment._id, text)
        break
      case "COMMENT":
        addComment(songId, text)
        break
      default:
        return
    }
    // if (state.showINput === "EDIT" && comment) {
    //   editComment(comment._id, inputRef.current.value)
    // } else if (type === "REPLY" && comment) {
    //   addComment(comment._id, inputRef.current.value)
    // } else {
    //   addComment(songId, inputRef.current.value)
    // }
    e.preventDefault()
  }

  return {
    comments,
    state,
    handleCloseCommentMenu,
    handleToggleInput,
    handleCloseInput,
    onSubmit,
  }
}

export default function CommentMenu({ song, isOpen, onClose }: CommentMenuProps) {
  const root = document.getElementById("root")!
  const [toggleSort, setToggleSort] = useState<SortType>("Top")

  const { comments, state, handleCloseInput, handleToggleInput, onSubmit, handleCloseCommentMenu } = useCommentss(
    song._id,
    song.comments,
    onClose
  )

  const lastCommentId = comments[comments.length - 1]?._id

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <TextBox type={state.showInput} comment={state.selectedComment} onClose={handleCloseInput} onSubmit={onSubmit} />

      <CommentMenuLayout
        header={<CommentHeader menu="Comments" comments={comments.length} onClose={handleCloseCommentMenu} />}
        actions={
          <>
            <CommentActions toggleSort={toggleSort} setToggleSort={setToggleSort} />
            <CommentInput placeholder="Add a comment" dispatch={() => handleToggleInput("COMMENT", undefined)} />
          </>
        }
        items={
          <>
            {comments.map((item) => {
              return (
                <>
                  <ReplyMenu
                    song={song}
                    state={state}
                    toggleInput={handleToggleInput}
                    isOpen={state.isReplyMenuOpen}
                    onClose={handleCloseCommentMenu}
                    onGoBack={() => handleToggleInput("CLOSE_REPLY_MENU")}
                    parentComment={state.replyComment}
                  />

                  <CommentItem
                    key={item._id}
                    comment={item}
                    authorId={song.user._id}
                    editId={state.isEditingId}
                    lastItemId={lastCommentId}
                  >
                    <LikeButton comment={item} />
                    <ReplyButton reply={item} onClick={handleToggleInput} total={item?.replies?.length} />
                    <EditDeleteButtons songId={song._id} comment={item} dispatch={handleToggleInput} />
                  </CommentItem>
                </>
              )
            })}
          </>
        }
      />
    </>,
    root
  )
}
