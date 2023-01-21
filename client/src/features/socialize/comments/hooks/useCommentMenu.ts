import { Dispatch, MouseEvent, SetStateAction, useCallback, useEffect, useReducer, useState } from "react"
import { IComment } from "../../../../../../server/src/models"
import { commentInputMenuReducer, INITIAL_STATE } from "../hooks/commentInputMenuReducer"
import useComments from "../hooks/useComments"

export default function useCommentMenu(
  songId: string,
  _comments: IComment[],
  onClose: Dispatch<SetStateAction<boolean>>
) {
  const [comments, setComments] = useState<IComment[]>([])
  const { addComment, editComment, deleteComment, error, isLoading, data } = useComments()
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)
  const [sortComments, setSortComments] = useState<"Top" | "Newest">("Newest")

  useEffect(() => {
    setComments(_comments)
  }, [_comments])

  useEffect(() => {
    if (!data) return
    if (!data.data || !data.target) return
    const validData = data.data

    switch (data?.target) {
      case "CREATE":
        setComments((prev) => [...prev, validData])
        break
      case "EDIT":
        setComments((prev) =>
          prev.map((prevComment) => {
            if (prevComment._id === validData._id) {
              return validData
            } else {
              return prevComment
            }
          })
        )
        break
      case "DELETE":
        if (data.deleteReply && data.deleteReply === true) {
          setComments((prev) =>
            prev.map((comment) => {
              if (comment._id === validData.parent._id) {
                console.log(comment, validData, "MUST BE A COMMENT REPLY NOT A SONG COMMENT")
                return {
                  ...comment,
                  replies: comment.replies.filter((reply) => reply._id !== validData._id),
                }
              } else {
                return comment
              }
            })
          )
        } else {
          setComments((prev) =>
            prev.map((prevComment) => {
              if (prevComment._id === validData._id) {
                console.log(prevComment, validData, "MUST HAVE BEEN A SONG COMMENT NOT A REPLY")
                return validData
              } else {
                return prevComment
              }
            })
          )
        }
        break
      default:
        return
    }
    console.log(data, validData, "Did Comments update?")
  }, [data])

  // useEffect(() => {
  //   if (data && data.target === "DELETE") {
  //     console.log(comments, data, "did it change the replY?")
  //   }
  // }, [data])

  const handleToggleInput = useCallback(
    (
      type: "EDIT" | "REPLY" | "COMMENT" | "OPEN_REPLY_MENU" | "CLOSE_REPLY_MENU" | "CLOSE" | "DELETE",
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
        case "CLOSE":
          dispatch({ type: "CLOSE" })
          onClose(false)
          break
        case "DELETE":
          if (!data) return
          const parentId = data.parent._id ? data.parent._id : (data.parent as unknown as string)
          deleteComment(data._id, parentId, songId)
      }
    },
    []
  )

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
        editComment(state.selectedComment._id, text, songId)
        break
      case "REPLY":
        if (!state.selectedComment) return
        addComment(state.selectedComment._id, text, songId)
        break
      case "COMMENT":
        addComment(songId, text, songId)
        break
      default:
        return
    }
    e.preventDefault()
  }

  return {
    comments,
    state,
    // handleCloseCommentMenu,
    handleToggleInput,
    handleCloseInput,
    onSubmit,
    sortComments,
    setSortComments,
  }
}
