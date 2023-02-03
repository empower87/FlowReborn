import { useEffect, useReducer, useState } from "react"
import { ISongPopulatedUser as ISong, IUser } from "src/types/ServerModelTypes"
import { trpc } from "src/utils/trpc"

type SetActions = "Songs" | "Follow" | "Like"

type State = {
  Songs: ISong[]
  Follow: ISong[]
  Like: ISong[]
  displayedSongs: ISong[]
  songsLength: number
  followLength: number
  likeLength: number
  isDisplayed: SetActions
}
type Action = {
  type: "SET_SONGS" | "SET_FOLLOWING" | "SET_LIKED" | "SHOW_LIST"
  payload: { list: ISong[] | []; displayed: SetActions }
}
const INITIAL_STATE = {
  Songs: [],
  Follow: [],
  Like: [],
  displayedSongs: [],
  songsLength: 0,
  followLength: 0,
  likeLength: 0,
  isDisplayed: "Songs" as SetActions,
}

const songFeedsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SONGS":
      return {
        ...state,
        Songs: action.payload.list,
        songsLength: action.payload.list.length,
      }
    case "SET_FOLLOWING":
      return {
        ...state,
        Follow: action.payload.list,
        followLength: action.payload.list.length,
      }
    case "SET_LIKED":
      return {
        ...state,
        Like: action.payload.list,
        likeLength: action.payload.list.length,
      }
    case "SHOW_LIST":
      return {
        ...state,
        displayedSongs: [...state[action.payload.displayed]],
        isDisplayed: action.payload.displayed,
      }
    default:
      return state ?? INITIAL_STATE
  }
}

export default function useSongFeed(user: IUser) {
  const id = user._id
  const followers = user.following
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [state, dispatch] = useReducer(songFeedsReducer, INITIAL_STATE)

  const userSongs = trpc.songs.usersSongs.useQuery(
    { _id: id },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  const likedSongs = trpc.songs.usersLikedSongs.useQuery(
    { _id: id },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  const followSongs = trpc.songs.usersFollowersSongs.useQuery(
    { followers: followers },
    {
      enabled: !!followers,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    if (userSongs.data) {
      dispatch({ type: "SET_SONGS", payload: { list: userSongs.data, displayed: "Songs" } })
    }
  }, [userSongs.data])

  useEffect(() => {
    if (likedSongs.data) {
      dispatch({ type: "SET_LIKED", payload: { list: likedSongs.data, displayed: "Songs" } })
    }
  }, [likedSongs.data])

  useEffect(() => {
    if (followSongs.data) {
      dispatch({ type: "SET_FOLLOWING", payload: { list: followSongs.data, displayed: "Songs" } })
    }
  }, [followSongs.data])

  useEffect(() => {
    if (userSongs.isLoading || likedSongs.isLoading || followSongs.isLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [userSongs.isLoading, likedSongs.isLoading, followSongs.isLoading])

  return { state, dispatch, isLoading }
}
