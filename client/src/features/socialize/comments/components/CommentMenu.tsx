import { Dispatch, MouseEvent, SetStateAction, useEffect, useReducer, useState } from "react"
import ReactDOM from "react-dom"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../../server/src/models"
import { CommentDispatch, commentInputMenuReducer, CommentState, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
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
            dispatch={() => dispatch({ type: "REPLY", payload: { reply: comment } })}
          />
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
                  <EditDeleteButtons songId={song._id} comment={item} dispatch={dispatch} />
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
  const [updateComments, setUpdateComments] = useState<"Comment" | "Edit" | "Delete" | "None">("None")

  useEffect(() => {
    setComments(_comments)
  }, [_comments])

  useEffect(() => {
    if (updateComments === "None" || !data) return
    switch (updateComments) {
      case "Comment":
        setComments((prev) => [...prev, data])
        break
      case "Edit":
        setComments((prev) =>
          prev.map((prevComment) => {
            if (prevComment._id === data._id) {
              return data
            } else {
              return prevComment
            }
          })
        )
        break
      case "Delete":
        setComments((prev) => prev.filter((prevComment) => prevComment._id !== data._id))
        break
      default:
        return
    }
    setUpdateComments("None")
  }, [updateComments])

  const handleCloseCommentMenu = () => {
    dispatch({ type: "CLOSE" })
    onClose(false)
  }

  const handleToggleInput = (type: "EDIT" | "REPLY" | "COMMENT", data: IComment | undefined) => {
    switch(type) {
      case "EDIT":
        dispatch({ type: "EDIT", payload: { editComment: data } })
        break;
      case "REPLY":
        dispatch({ type: "REPLY", payload: { reply: data }})
        break;
      case "COMMENT":
        dispatch({ type: "COMMENT" })
        break;
    }
  }

  const handleToggleReplyMenu = (toggle: "OPEN_REPLY_MENU" | "CLOSE_REPLY_MENU") => {
    dispatch({ type: toggle })
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
        setUpdateComments("Edit")
        break
      case "REPLY":
        if (!state.selectedComment) return
        addComment(state.selectedComment._id, text)
        setUpdateComments("Comment")
        break
      case "COMMENT":
        addComment(songId, text)
        setUpdateComments("Comment")
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
    updateComments,
    handleCloseCommentMenu,
    handleToggleInput,
    handleCloseInput,
    handleToggleReplyMenu,
    onSubmit,
  }
}

export default function CommentMenu({ song, isOpen, onClose }: CommentMenuProps) {
  const root = document.getElementById("root")!
  const comments = song.comments
  const lastCommentId = comments[comments.length - 1]?._id

  const [toggleSort, setToggleSort] = useState<SortType>("Top")
  // const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

  const {
    comments: lol,
    state,
    handleCloseInput,
    handleToggleInput,
    onSubmit,
    handleToggleReplyMenu,
    handleCloseCommentMenu,
  } = useCommentss(song._id, song.comments, onClose)

  // useEffect(() => {
  //   dispatch({ type: "CLOSE" })
  // }, [song])

  // const updateMenuComments = (type: "Comment" | "Edit" | "Delete", data: IComment | undefined) => {
  //   if (!data) return
  //   switch (type) {
  //     case "Comment":
  //       comments.push(data)
  //       break
  //     case "Edit":
  //       comments.map((comment) => {
  //         if (comment._id === data._id) {
  //           return data
  //         } else {
  //           return comment
  //         }
  //       })
  //       break
  //     case "Delete":
  //       comments.filter((comment) => comment._id !== data._id)
  //       break
  //     default:
  //   }
  // }

  if (!isOpen) return null
  return ReactDOM.createPortal(
    <>
      <TextBox
        type={state.showInput}
        // songId={song._id}
        comment={state.selectedComment}
        // dispatch={dispatch}
        // update={updateMenuComments}
        onClose={handleCloseInput}
        onSubmit={onSubmit}
      />

      <CommentMenuLayout
        header={<CommentHeader menu="Comments" comments={comments.length} onClose={handleCloseCommentMenu} />}
        actions={
          <>
            <CommentActions toggleSort={toggleSort} setToggleSort={setToggleSort} />
            <CommentInput placeholder="Add a comment" dispatch={() => handleToggleInput("COMMENT", data: undefined)} />
            {/* <CommentInput placeholder="Add a comment" dispatch={() => dispatch({ type: "COMMENT" })} /> */}
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
                    dispatch={dispatch}
                    isOpen={state.isReplyMenuOpen}
                    onClose={handleCloseCommentMenu}
                    onGoBack={() => handleToggleReplyMenu("CLOSE_REPLY_MENU")}
                    comment={state.replyComment ? state.replyComment : item}
                  />

                  <CommentItem
                    key={item._id}
                    comment={item}
                    authorId={song.user._id}
                    editId={state.isEditingId}
                    lastItemId={lastCommentId}
                  >
                    <LikeButton comment={item} />
                    <ReplyButton reply={item} onClick={dispatch} total={item?.replies?.length} />
                    <EditDeleteButtons songId={song._id} comment={item} dispatch={dispatch} />
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
