import { useCallback, useEffect, useReducer, useState } from "react"
import gifArray from "src/assets/images/gifs.json"
import { useAuth } from "src/context/AuthContext"
import { trpc } from "src/utils/trpc"
import { ISong } from "../../../../../server/src/models"
import { INITIAL_STATE, songFeedReducer } from "./songFeedReducer"

export default function useSongFeeds() {
  const { user } = useAuth()
  const songs = trpc.useQuery(["songs.all-songs"])
  const [state, dispatch] = useReducer(songFeedReducer, INITIAL_STATE)
  const [feedSongs, setFeedSongs] = useState<ISong[]>([])

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
  }, [songs.data, user])

  useEffect(() => {
    if (state.feedSongs && state.feedSongs.length !== 0) {
      setFeedSongs(state.feedSongs)
    } else {
      setFeedSongs(state.ForYou.songs)
    }
  }, [state])

  const getTrendingSongs = useCallback((songs: ISong[]) => {
    const byLikes = songs.sort((a, b) => b.likes.length - a.likes.length)
    return byLikes
  }, [])

  const getFollowingSongs = useCallback((songs: ISong[], userId: string) => {
    const byFollows = songs.filter((song) => song.user.followers.includes(userId)).reverse()
    return byFollows
  }, [])

  return {
    isLoading: songs.isLoading,
    feedInView: state.feedInView,
    feedSongs,
    dispatch,
  }
}
