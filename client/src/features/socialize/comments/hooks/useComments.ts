import { useCallback } from "react"
import { useQueryClient } from "react-query"
import { trpc } from "src/utils/trpc"
import { useAuth } from "../../../../context/AuthContext"

export default function useComments() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const add = trpc.useMutation(["comments.create"], {
    onSuccess: (data) => {
      console.log(data, "success: added a comment")
      invalidateQueries()
    },
    onError: (err) => console.log(err),
  })

  const edit = trpc.useMutation(["comments.edit"], {
    onSuccess: (data) => {
      invalidateQueries()
      console.log(data, "success: edited a comment")
    },
    onError: (err) => console.log(err),
  })

  const del = trpc.useMutation(["comments.delete"], {
    onSuccess: (data) => {
      invalidateQueries()
      console.log(data, "success: deleted a comment")
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
  return { addComment, editComment, deleteComment }
}
