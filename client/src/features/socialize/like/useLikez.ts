import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import useDebounce from "src/hooks/useDebounce"
import { trpc } from "src/utils/trpc"
import { ISong } from "../../../../../server/src/models/Song"
import { useAuth } from "../../../context/AuthContext"

export default function useLike(song: ISong) {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const like = trpc.useMutation(["likes.like-song"], {
    onSuccess: () => invalidateQueries(),
  })
  const unlike = trpc.useMutation(["likes.unlike-song"], {
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
    if (!song) return
    const rerender = stopInvalidatedQueriesFromRerendering()
    if (!rerender) return

    const likes = song.likes
    setTotalLikes(likes.length)

    if (!user) return
    if (likes.includes(user._id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [song, user])

  useEffect(() => {
    if (like.isLoading || unlike.isLoading || !hasClicked) return

    if (!debouncedIsLiked) {
      deleteLikeHandler(debouncedIsLiked)
    } else {
      addLikeHandler(debouncedIsLiked)
    }

    setHasClicked(false)
  }, [debouncedIsLiked, like.isLoading, unlike.isLoading])

  const addLikeHandler = (_isLIked: boolean) => {
    if (!user || !hasClicked) return
    if (_isLIked) {
      like.mutate({ _id: song._id })
    }
  }

  const deleteLikeHandler = (_isLIked: boolean) => {
    if (!user || !hasClicked) return
    if (!_isLIked) {
      unlike.mutate({ _id: song._id })
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
        if (each._id === song._id) {
          if (each.likes.length !== song.likes.length) isMatch = false
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
