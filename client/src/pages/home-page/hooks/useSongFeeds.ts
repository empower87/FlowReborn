import { useCallback, useEffect, useReducer, useState } from "react"
import { useAuth } from "src/context/AuthContext"
import { trpc } from "src/utils/trpc"
import { ISong } from "../../../../../server/src/models"
import { tempMockSong } from "../initialData"
import { INITIAL_STATE, songFeedReducer } from "./songFeedReducer"

export default function useSongFeeds() {
  const { user } = useAuth()
  const songs = trpc.useQuery(["songs.all-songs"])
  const [state, dispatch] = useReducer(songFeedReducer, INITIAL_STATE)
  const [songInView, setSongInView] = useState<ISong>(tempMockSong)
  const [feedSongs, setFeedSongs] = useState<ISong[]>([])

  useEffect(() => {
    if (!songs.data || !user) return
    const allSongs = songs.data
    dispatch({
      type: "SET_FEED_SONGS",
      payload: {
        feed: "Following",
        songs: {
          Home: [...allSongs].reverse(),
          Trending: getTrendingSongs([...allSongs]),
          Following: getFollowingSongs([...allSongs], user._id),
        },
      },
    })
  }, [songs.data, user])

  useEffect(() => {
    if (state.feedSongInView) {
      setSongInView(state.feedSongInView)
    }
  }, [state.feedSongInView])

  useEffect(() => {
    if (state.feedSongs && state.feedSongs.length !== 0) {
      setFeedSongs(state.feedSongs)
    } else {
      setFeedSongs(state.Home.songs)
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
    songInView,
    feedInView: state.feedInView,
    feedSongs,
    dispatch,
  }
}