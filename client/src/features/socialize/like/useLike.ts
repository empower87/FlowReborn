import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import useDebounce from "src/hooks/useDebounce"
import { trpc } from "src/utils/trpc"
import { IComment, ISong } from "../../../../../server/src/models/index"
import { useAuth } from "../../../context/AuthContext"

export default function useLike(parent: ISong | IComment, type: "Song" | "Comment") {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const likeEndpoint = type === "Song" ? "like-song" : "like-comment"
  const unlikeEndpoint = type === "Song" ? "unlike-song" : "unlike-comment"

  const like = trpc.useMutation([`likes.${likeEndpoint}`], {
    onSuccess: () => invalidateQueries(),
  })
  const unlike = trpc.useMutation([`likes.${unlikeEndpoint}`], {
    onSuccess: () => invalidateQueries(),
  })

  const [totalLikes, setTotalLikes] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [hasClicked, setHasClicked] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const debouncedIsLiked = useDebounce(isLiked, 200)

  useEffect(() => {
    if (like.isLoading || unlike.isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [like.isLoading, unlike.isLoading])

  useEffect(() => {
    if (!parent) return
    const rerender = stopInvalidatedQueriesFromRerendering()
    if (!rerender) return

    const likes = parent?.likes
    setTotalLikes(likes?.length)

    if (!user) return
    if (likes?.includes(user._id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [parent, user])

  useEffect(() => {
    if (like.isLoading || unlike.isLoading || !hasClicked) return

    if (!debouncedIsLiked) {
      deleteLikeHandler(debouncedIsLiked)
    } else {
      addLikeHandler(debouncedIsLiked)
    }

    setHasClicked(false)
  }, [debouncedIsLiked, like.isLoading, unlike.isLoading])

  const addLikeHandler = (_isLiked: boolean) => {
    if (!user || !hasClicked) return
    if (_isLiked) {
      like.mutate({ _id: parent._id })
    }
  }

  const deleteLikeHandler = (_isLiked: boolean) => {
    if (!user || !hasClicked) return
    if (!_isLiked) {
      unlike.mutate({ _id: parent._id })
    }
  }

  const invalidateQueries = () => {
    queryClient.invalidateQueries(["users.get-me"])
    queryClient.invalidateQueries(["songs.all-songs"])
  }

  const stopInvalidatedQueriesFromRerendering = () => {
    let isMatch = true
    const songs: ISong[] | undefined = queryClient.getQueryData(["songs.all-songs"])
    if (songs) {
      songs.forEach((each) => {
        if (each._id === parent._id) {
          if (each.likes.length !== parent.likes.length) isMatch = false
        }
      })
    }
    return isMatch
  }

  const handleOnClick = () => {
    setHasClicked(true)
    if (isLiked) {
      setIsLiked(false)
      setTotalLikes((prev) => prev - 1)
    } else {
      setIsLiked(true)
      setTotalLikes((prev) => prev + 1)
    }
  }

  const props = {
    total: totalLikes,
    hasUser: isLiked,
    onClick: handleOnClick,
    loading: isLoading,
  }

  return { ...props }
}
