import { useEffect, useState } from "react"
import useDebounce from "src/hooks/useDebounce"
import { trpc } from "src/utils/trpc"
// import { IComment, ISong } from "../../../../../server/src/models/index"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"
import { useAuth } from "../../../context/AuthContext"

const parentId = ""
const parentLikes = []

// params before refactor: useLike(parent: ISong | IComment, type: "Song" | "Comment")
export default function useLike(parentId: string, parentLikes: string[], type: "Song" | "Comment") {
  const { user } = useAuth()
  // const queryClient = useQueryClient()
  const utils = trpc.useContext()

  const likeEndpoint = type === "Song" ? "likeSong" : "likeComment"
  const unlikeEndpoint = type === "Song" ? "unlikeSong" : "unlikeComment"

  const like = trpc.likes[likeEndpoint].useMutation({
    onSuccess: () => invalidateQueries(),
  })
  const unlike = trpc.likes[unlikeEndpoint].useMutation({
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
    if (!parentLikes) return
    const rerender = stopInvalidatedQueriesFromRerendering()
    if (!rerender) return

    const likes = parentLikes
    setTotalLikes(likes?.length)

    if (!user) return
    if (likes?.includes(user._id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }, [parentLikes, user])

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
      like.mutate({ _id: parentId })
    }
  }

  const deleteLikeHandler = (_isLiked: boolean) => {
    if (!user || !hasClicked) return
    if (!_isLiked) {
      unlike.mutate({ _id: parentId })
    }
  }

  const invalidateQueries = () => {
    // queryClient.invalidateQueries(["users.getMe"])
    // queryClient.invalidateQueries(["songs.allSongs"])
    utils.users.getMe.invalidate()
    utils.songs.allSongs.invalidate()
  }

  const stopInvalidatedQueriesFromRerendering = () => {
    let isMatch = true
    const songs: ISong[] | undefined = utils.songs.allSongs.getData()
    if (songs) {
      songs.forEach((each) => {
        if (each._id === parentId) {
          if (each.likes.length !== parentLikes.length) isMatch = false
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
