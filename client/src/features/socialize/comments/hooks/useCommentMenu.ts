import { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState } from "react"
import { QueryClient } from "react-query"
import { IComment, ISong } from "../../../../../../server/src/models"
import { commentInputMenuReducer, INITIAL_STATE, InputTypes } from "../hooks/commentInputMenuReducer"
import useComments from "../hooks/useComments"

export type SortCommentsType = "TOP" | "NEWEST"
export type ToggleInputHandlerType = (type: InputTypes, data?: IComment | undefined) => void

export default function useCommentMenu(song: ISong, onClose: Dispatch<SetStateAction<boolean>>) {
  const queryClient = new QueryClient()
  const songId = song._id
  const _comments = song.comments
  const sortByNewest = _comments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())

  const { addComment, editComment, deleteComment, isLoading, error, resetError, data } = useComments()
  const [state, dispatch] = useReducer(commentInputMenuReducer, INITIAL_STATE)

  const [comments, setComments] = useState<IComment[]>([])
  const [sortComments, setSortComments] = useState<SortCommentsType>("NEWEST")

  useEffect(() => {
    setComments(sortByNewest)
    setSortComments("NEWEST")
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

  const sortCommentsHandler = useCallback((sort: SortCommentsType) => {
    setSortComments(sort)
    if (sort === "TOP") {
      setComments((prevComments) => prevComments.sort((a, b) => b.likes.length - a.likes.length))
    } else {
      setComments((prevComments) =>
        prevComments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
      )
    }
  }, [])

  const handleToggleInput = useCallback((type: InputTypes, data?: IComment | undefined) => {
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

  const [rerender, setRerender] = useState<boolean>(false)

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
        queryClient.invalidateQueries("get-comment")
        setRerender(true)
        break
      case "OPEN_REPLY_MENU":
        if (!state.selectedComment) return
        addComment(state.selectedComment._id, text, songId)
        queryClient.invalidateQueries("get-comment")
        setRerender(true)
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
    sortCommentsHandler,
    isLoading,
    error,
    resetError,
    rerender,
  }
}
