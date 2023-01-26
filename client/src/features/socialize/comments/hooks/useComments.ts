import { useCallback, useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import { trpc } from "src/utils/trpc"
import { IComment } from "../../../../../../server/src/models"
import { useAuth } from "../../../../context/AuthContext"

type MutationType = "CREATE" | "EDIT" | "DELETE"
export type ErrorType = {
  target: MutationType | undefined
  message: string
}
type DataType = {
  target: MutationType | undefined
  data: IComment | null
}

const ERROR_STATE: ErrorType = {
  target: undefined,
  message: "",
}
const DATA_STATE: DataType = {
  target: undefined,
  data: null,
}

export default function useComments() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<ErrorType>(ERROR_STATE)
  const [data, setData] = useState<DataType>(DATA_STATE)

  const add = trpc.useMutation(["comments.create"], {
    onSuccess: (data, variables) => {
      console.log(data, "SUCCESS: created a comment")
      invalidateQueries()

      setData({ target: "CREATE", data: data })
    },
    onError: (err) => {
      setError({ target: "CREATE", message: err.message })
    },
  })

  const edit = trpc.useMutation(["comments.edit"], {
    onSuccess: (data, variables) => {
      console.log(data, "SUCCESS: edited a comment")
      invalidateQueries()
      setData({ target: "EDIT", data: data })
    },
    onError: (err) => {
      setError({ target: "EDIT", message: err.message })
    },
  })

  const del = trpc.useMutation(["comments.delete"], {
    onSuccess: (data, variables) => {
      console.log(data, "SUCCESS: deleted a comment")
      invalidateQueries()
      setData({ target: "DELETE", data: data })
    },
    onError: (err) => {
      setError({ target: "DELETE", message: err.message })
    },
  })

  const addComment = useCallback((parent: string, text: string, songId: string) => {
    if (!user) return
    add.mutate({ parent, text, user, songId })
  }, [])

  const editComment = useCallback((_id: string, text: string, songId: string) => {
    edit.mutate({ _id, text, songId })
  }, [])

  const deleteComment = useCallback((_id: string, parent: string, songId: string) => {
    del.mutate({ _id, parent, songId })
  }, [])

  const invalidateQueries = () => {
    queryClient.invalidateQueries(["songs.all-songs"])
  }

  const resetError = () => {
    setError(ERROR_STATE)
  }

  useEffect(() => {
    if (add.isLoading || edit.isLoading || del.isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [add, edit, del])

  return { addComment, editComment, deleteComment, error, resetError, isLoading, data }
}
