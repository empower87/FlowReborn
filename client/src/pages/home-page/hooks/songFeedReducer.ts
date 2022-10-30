import { Dispatch } from "react"
import { ISong } from "../../../../../server/src/models"

type State = {
  feedInView: Feeds
  feedSongs: ISong[]
  feedSongInView: ISong | undefined
  Home: { _id: string; songs: ISong[] }
  Trending: { _id: string; songs: ISong[] }
  Following: { _id: string; songs: ISong[] }
}

export type Action = {
  type: Feeds | "SET_SONG_INDEX" | "SET_FEED_SONGS"
  payload: {
    feed?: Feeds
    songId?: string
    songs?: {
      Home: ISong[]
      Trending: ISong[]
      Following: ISong[]
    }
  }
}

export type Feeds = "Home" | "Trending" | "Following"
export type SongReducer = {
  state: State
  dispatch: Dispatch<Action>
}
export const INITIAL_STATE: State = {
  feedInView: "Home",
  feedSongs: [],
  feedSongInView: undefined,
  Home: { _id: "", songs: [] },
  Trending: { _id: "", songs: [] },
  Following: { _id: "", songs: [] },
}

export const songFeedReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "Home":
      const homeSong = state.Home.songs.filter((song) => song._id === state.Home._id)
      return {
        ...state,
        feedInView: "Home",
        feedSongs: state.Home.songs,
        feedSongInView: homeSong[0],
      }
    case "Trending":
      const trendingSong = state.Trending.songs.filter((song) => song._id === state.Trending._id)
      return {
        ...state,
        feedInView: "Trending",
        feedSongs: state.Trending.songs,
        feedSongInView: trendingSong[0],
      }
    case "Following":
      const followingSong = state.Following.songs.filter((song) => song._id === state.Following._id)
      return {
        ...state,
        feedInView: "Following",
        feedSongs: state.Following.songs,
        feedSongInView: followingSong[0],
      }
    case "SET_FEED_SONGS":
      if (!action.payload.songs) return state
      const { Home, Trending, Following } = action.payload.songs
      return {
        ...state,
        Home: { ...state["Home"], songs: Home },
        Trending: { ...state["Trending"], songs: Trending },
        Following: { ...state["Following"], songs: Following },
      }
    case "SET_SONG_INDEX":
      if (!action.payload.songId || !action.payload.feed) return state
      const type = action.payload.feed
      const songInView = state[type].songs.filter((song) => song._id === action.payload.songId)
      return {
        ...state,
        [type]: { ...state[type], _id: action.payload.songId },

        feedSongInView: songInView[0],
      }
    default:
      return state
  }
}
