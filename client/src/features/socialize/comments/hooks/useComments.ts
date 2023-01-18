import { useCallback, useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { trpc } from "src/utils/trpc"
import { IComment } from "../../../../../../server/src/models"
import { useAuth } from "../../../../context/AuthContext"

type ErrorType = {
  target: "Create" | "Edit" | "Delete" | undefined
  message: string
}
const ERROR_STATE: ErrorType = {
  target: undefined,
  message: "",
}

export default function useComments() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [error, setError] = useState<ErrorType>(ERROR_STATE)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<{ target: "EDIT" | "ADD" | "DELETE"; data: IComment }>()

  const add = trpc.useMutation(["comments.create"], {
    onSuccess: (data) => {
      console.log(data, "success: added a comment")
      invalidateQueries()
      setData({ target: "ADD", data: data as IComment })
    },
    onError: (err) => {
      setError({ target: "Create", message: err.message })
    },
  })

  const edit = trpc.useMutation(["comments.edit"], {
    onSuccess: (data) => {
      invalidateQueries()
      console.log(data, "success: edited a comment")
      setData({ target: "EDIT", data: data as IComment })
    },
    onError: (err) => {
      setError({ target: "Edit", message: err.message })
    },
  })

  const del = trpc.useMutation(["comments.delete"], {
    onSuccess: (data) => {
      invalidateQueries()
      console.log(data, "success: deleted a comment")
    },
    onError: (err) => {
      setError({ target: "Delete", message: err.message })
    },
  })

  const addComment = useCallback((parent: string, text: string) => {
    if (!user) return
    add.mutate({ parent, text, user })
  }, [])

  const editComment = useCallback((_id: string, text: string) => {
    edit.mutate({ _id, text })
  }, [])

  const deleteComment = useCallback((_id: string, parent: string) => {
    del.mutate({ _id, parent })
  }, [])

  const invalidateQueries = () => {
    queryClient.invalidateQueries(["songs.all-songs"])
  }

  useEffect(() => {
    if (add.isLoading || edit.isLoading || del.isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [add, edit, del])

  return { addComment, editComment, deleteComment, error, isLoading, data }
}
