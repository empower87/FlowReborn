import { useEffect, useState } from "react"
import { useAuth } from "src/context/AuthContext"
import useDebounce from "src/hooks/useDebounce"
import { trpc } from "src/utils/trpc"
// import { IUser } from "../../../../../server/src/models"
// import { ISong } from "../../../../../server/src/models/Song"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"

// export default function useFollow(thisUser: IUser) {
export default function useFollow(userId: string, userFollowers: string[]) {
  const { user } = useAuth()
  // const queryClient = useQueryClient()
  const utils = trpc.useContext()

  const follow = trpc.follows.follow.useMutation({
    onSuccess: () => invalidateQueries(),
  })
  const unfollow = trpc.follows.unfollow.useMutation({
    onSuccess: () => invalidateQueries(),
  })

  const [totalFollowers, setTotalFollowers] = useState<number>(0)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)
  const [hasClicked, setHasClicked] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const debouncedIsFollowed = useDebounce(isFollowed, 200)

  useEffect(() => {
    if (follow.isLoading || unfollow.isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [follow.isLoading, unfollow.isLoading])

  useEffect(() => {
    if (!userFollowers) return
    const rerender = stopInvalidatedQueriesFromRerendering()
    if (!rerender) return

    const followers = userFollowers
    setTotalFollowers(followers.length)

    if (!user) return
    if (followers.includes(user._id)) {
      setIsFollowed(true)
    } else {
      setIsFollowed(false)
    }
  }, [userFollowers, user, stopInvalidatedQueriesFromRerendering])

  useEffect(() => {
    if (isLoading || !hasClicked) return

    if (!debouncedIsFollowed) {
      deleteFollowHandler(debouncedIsFollowed)
    } else {
      addFollowHandler(debouncedIsFollowed)
    }

    setHasClicked(false)
  }, [debouncedIsFollowed, isLoading, addFollowHandler, deleteFollowHandler, hasClicked])

  const addFollowHandler = (_isFollowed: boolean) => {
    if (!user || !hasClicked) return
    if (_isFollowed) {
      follow.mutate({ follower: user._id, following: userId })
    }
  }

  const deleteFollowHandler = (_isFollowed: boolean) => {
    if (!user || !hasClicked) return
    if (!_isFollowed) {
      unfollow.mutate({ follower: user._id, following: userId })
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
      // songs.forEach((each) => {
      //   if (each._id === song._id) {
      //     if (each.user.followers.length !== song.user.followers.length) isMatch = false
      //   }
      // })
    }
    return isMatch
  }

  const handleOnClick = () => {
    setHasClicked(true)
    if (isFollowed) {
      setIsFollowed(false)
      setTotalFollowers((prev) => prev - 1)
    } else {
      setIsFollowed(true)
      setTotalFollowers((prev) => prev + 1)
    }
  }

  const props = {
    total: totalFollowers,
    hasUser: isFollowed,
    onClick: handleOnClick,
    loading: isLoading,
  }

  return { ...props }
}
