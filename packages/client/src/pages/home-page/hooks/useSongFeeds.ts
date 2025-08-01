import { useCallback, useEffect, useReducer, useState } from "react"
import gifArray from "src/assets/images/gifs.json"
import { useAuth } from "src/context/AuthContext"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"
import { trpc } from "src/utils/trpc"
import { Feeds, INITIAL_STATE, songFeedReducer } from "./songFeedReducer"

export default function useSongFeeds() {
  const { user } = useAuth()
  const songs = trpc.songs.allSongs.useQuery()
  const [state, dispatch] = useReducer(songFeedReducer, INITIAL_STATE)
  const [feedSongs, setFeedSongs] = useState<ISong[]>([])

  const getTrendingSongs = useCallback((songs: ISong[]) => {
    const byLikes = songs.sort((a, b) => b.likes.length - a.likes.length)
    return byLikes
  }, [])

  const getFollowingSongs = useCallback((songs: ISong[], userId: string) => {
    const byFollows = songs.filter((song) => song.user.followers.includes(userId)).reverse()
    return byFollows
  }, [])

  useEffect(() => {
    if (!songs.data || !user) return
    const songsData = songs.data
    const allSongs = songsData.map((each) => {
      if (!each.thumbnail) return { ...each, video: gifArray[Math.floor(Math.random() * 10)].url }
      else return { ...each }
    })

    dispatch({
      type: "SET_FEED_SONGS",
      payload: {
        feed: "Following",
        songs: {
          ForYou: [...allSongs].reverse(),
          Trending: getTrendingSongs([...allSongs]),
          Following: getFollowingSongs([...allSongs], user._id),
        },
      },
    })
  }, [songs.data, user, getTrendingSongs, getFollowingSongs, dispatch])

  const toggleFeedHandler = (feed: Feeds) => {
    dispatch({ type: feed })
  }

  useEffect(() => {
    if (!songs.data) return
    setFeedSongs(state.ForYou.songs)
  }, [songs, state.ForYou.songs])

  useEffect(() => {
    switch (state.feedInView) {
      case "ForYou":
        setFeedSongs(state.ForYou.songs)
        break
      case "Following":
        setFeedSongs(state.Following.songs)
        break
      case "Trending":
        setFeedSongs(state.Trending.songs)
        break
      default:
        return
    }
  }, [state.feedInView, state.ForYou.songs, state.Following.songs, state.Trending.songs])

  // useEffect(() => {
  //   if (state.feedSongs && state.feedSongs.length !== 0) {
  //     setFeedSongs(state.feedSongs)
  //   } else {
  //     setFeedSongs(state.ForYou.songs)
  //   }
  // }, [state])

  return {
    isLoading: songs.isLoading,
    feedInView: state.feedInView,
    feedSongs,
    dispatch,
    toggleFeedHandler,
  }
}
