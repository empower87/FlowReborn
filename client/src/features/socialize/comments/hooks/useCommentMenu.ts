import { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState } from "react"
import { IComment } from "../../../../../../server/src/models"
import { commentInputMenuReducer, INITIAL_STATE, InputTypes } from "../hooks/commentInputMenuReducer"
import useComments from "../hooks/useComments"

export default function useCommentMenu(
  songId: string,
  _comments: IComment[],
  onClose: Dispatch<SetStateAction<boolean>>
) {
  const [comments, setComments] = useState<IComment[]>([])
  const { addComment, editComment, deleteComment, isLoading, error, resetError, data } = useComments()
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)
  const [sortComments, setSortComments] = useState<"Top" | "Newest">("Newest")

  useEffect(() => {
    const sortByNewest = _comments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
    setComments(sortByNewest)
    setSortComments("Newest")
  }, [_comments])

  // useEffect(() => {
  //   if (!comments.length) return
  //   if (sortComments === "Top") {
  //     setComments((prevComments) => prevComments.sort((a, b) => b.likes.length - a.likes.length))
  //   } else if (sortComments === "Newest") {
  //     setComments((prevComments) =>
  //       prevComments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
  //     )
  //   }
  // }, [sortComments])

  const sortCommentsHandler = useCallback((sort: "Top" | "Newest") => {
    if (sort === "Top") {
      setSortComments("Top")
      setComments((prevComments) => prevComments.sort((a, b) => b.likes.length - a.likes.length))
    } else {
      setSortComments("Newest")
      setComments((prevComments) =>
        prevComments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
      )
    }
  }, [])

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
      default:
        return
    }
  }, [data])

  const handleToggleInput = useCallback((type: InputTypes | "DELETE", data?: IComment | undefined) => {
    switch (type) {
      case "OPEN_EDIT_INPUT":
        dispatch({ type: "OPEN_EDIT_INPUT", payload: { editComment: data } })
        console.log("TOGGLE EDIT INPUT", data?.text, state.selectedComment?.text)
        break
      case "OPEN_REPLY_INPUT":
        dispatch({ type: "OPEN_REPLY_INPUT", payload: { reply: data } })
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
      case "OPEN_COMMENT_INPUT":
        dispatch({ type: "OPEN_COMMENT_INPUT" })
        console.log("TOGGLE COMMENT INPUT", data?.text, state.selectedComment?.text)
        break
      case "CLOSE_MENUS":
        dispatch({ type: "CLOSE_MENUS" })
        onClose(false)
        break
      case "HIDE_INPUT":
        dispatch({ type: "HIDE_INPUT" })
        resetError()
        break
      case "DELETE":
        if (!data) return
        const parentId = data.parent._id ? data.parent._id : (data.parent as unknown as string)
        deleteComment(data._id, parentId, songId)
        break
      default:
        return
    }
  }, [])

  const onSubmit = (text: string | undefined) => {
    if (!text || text === "") return
    switch (state.showInput) {
      case "OPEN_EDIT_INPUT":
        if (!state.selectedComment) return
        editComment(state.selectedComment._id, text, songId)
        break
      case "OPEN_REPLY_INPUT":
        if (!state.selectedComment) return
        addComment(state.selectedComment._id, text, songId)
        break
      case "OPEN_COMMENT_INPUT":
        addComment(songId, text, songId)
        break
      default:
        return
    }
  }

  return {
    comments,
    state,
    handleToggleInput,
    onSubmit,
    sortComments,
    setSortComments,
    sortCommentsHandler,
    isLoading,
    error,
    resetError,
  }
}
