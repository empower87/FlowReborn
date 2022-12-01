import { Dispatch } from "react"
import { ISong } from "../../../../../server/src/models"

type State = {
  feedInView: Feeds
  feedSongs: ISong[]
  feedSongInView: ISong | undefined
  ForYou: { _id: string; songs: ISong[] }
  Trending: { _id: string; songs: ISong[] }
  Following: { _id: string; songs: ISong[] }
}

export type Action = {
  type: Feeds | "SET_SONG_INDEX" | "SET_FEED_SONGS"
  payload: {
    feed?: Feeds
    songId?: string
    songs?: {
      ForYou: ISong[]
      Trending: ISong[]
      Following: ISong[]
    }
  }
}

export type Feeds = "ForYou" | "Trending" | "Following"
export type SongReducer = {
  state: State
  dispatch: Dispatch<Action>
}
export const INITIAL_STATE: State = {
  feedInView: "ForYou",
  feedSongs: [],
  feedSongInView: undefined,
  ForYou: { _id: "", songs: [] },
  Trending: { _id: "", songs: [] },
  Following: { _id: "", songs: [] },
}

export const songFeedReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ForYou":
      const homeSong = state.ForYou.songs.filter((song) => song._id === state.ForYou._id)
      return {
        ...state,
        feedInView: "ForYou",
        feedSongs: state.ForYou.songs,
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
      const { ForYou, Trending, Following } = action.payload.songs
      return {
        ...state,
        ForYou: { ...state["ForYou"], songs: ForYou },
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
