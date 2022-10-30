import { useCallback, useEffect, useState } from "react"
import { useAuth } from "src/context/AuthContext"
import { ISongTake } from "src/features/recording-booth/utils/types"
import useHistory from "src/hooks/useHistory"
import { trpc } from "src/utils/trpc"
import { ISong } from "../../../../../server/src/models"

type UseEditLyricsProps = {
  _songs: (ISong | ISongTake)[] | ISong[]
  _initialLyrics: LyricsState[]
  _currentSong: ISong | ISongTake
}

export type LyricLine = { id: string; array: string[] }

export type LyricsState = {
  songId: string
  lyrics: LyricLine[]
}

export function useSongLyrics({ _songs }: Pick<UseEditLyricsProps, "_songs">) {
  const { user } = useAuth()
  const userId = user ? user._id : ""
  const usersSongs = trpc.useQuery(["songs.users-songs", { _id: userId }], { enabled: !!userId })
  const [songs, setSongs] = useState<(ISong | ISongTake)[] | ISong[]>([])
  const [initialLyricsHistory, setInitialLyricsHistory] = useState<LyricsState[]>([])

  useEffect(() => {
    if (!usersSongs.data) return

    if (_songs) {
      setSongs([..._songs, ...usersSongs.data])
    } else {
      setSongs(usersSongs.data)
    }
  }, [usersSongs, _songs])

  useEffect(() => {
    if (songs.length) {
      const takeLyrics = songs.map((each) => {
        return { songId: each._id, lyrics: setLyricsStateHandler(each.lyrics) }
      })
      setInitialLyricsHistory(takeLyrics)
    }
  }, [songs])

  const setLyricsStateHandler = useCallback((_lyrics: string[][]) => {
    let lyrics = _lyrics.map((each, index) => {
      return { id: `${index + 1}${each}`, array: each }
    })
    return lyrics
  }, [])

  return { songs, initialLyricsHistory }
}

export default function useEditLyrics({ _songs, _initialLyrics, _currentSong }: UseEditLyricsProps) {
  const [currentSong, setCurrentSong] = useState<ISong | ISongTake>({ ..._currentSong })
  const [
    lyricsHistory,
    setLyricsHistory,
    { history, pointer, back: onUndo, forward: onRedo, reset, canUndo, canRedo },
  ] = useHistory<LyricsState[]>([..._initialLyrics])
  const [currentLyrics, setCurrentLyrics] = useState<LyricsState>({ songId: "1", lyrics: [{ id: "1", array: [""] }] })

  useEffect(() => {
    if (_initialLyrics.length) {
      setLyricsHistory([..._initialLyrics])
    }
  }, [_initialLyrics])

  useEffect(() => {
    if (_currentSong) {
      setCurrentSong({ ..._currentSong })
    }
  }, [_currentSong])

  useEffect(() => {
    if (lyricsHistory.length && currentSong) {
      const song = lyricsHistory.filter((each) => each.songId === currentSong._id)
      setCurrentLyrics(song[0])
    }
  }, [currentSong, lyricsHistory])

  const setCurrentLyricsList = (_songId: string, _lyrics: LyricLine[]) => {
    setLyricsHistory((prev) =>
      prev.map((each) => {
        if (each.songId === _songId) {
          return { ...each, lyrics: _lyrics }
        } else {
          return each
        }
      })
    )
  }

  const onReset = () => {
    if (JSON.stringify(_initialLyrics) === JSON.stringify(lyricsHistory)) {
      return console.log("nothing to reset")
    }
    reset()
    setLyricsHistory([..._initialLyrics])
    setCurrentLyrics(_initialLyrics[0])
  }

  const onSaveLyric = (_songId: string, _lyric: LyricLine) => {
    setLyricsHistory((prev) =>
      prev.map((each) => {
        if (each.songId == _songId) {
          return {
            ...each,
            lyrics: each.lyrics.map((each) => {
              if (each.id === _lyric.id) return { ...each, array: _lyric.array }
              else return each
            }),
          }
        } else {
          return each
        }
      })
    )
  }

  const onDeleteLyric = (_songId: string, _lyric: LyricLine) => {
    setLyricsHistory((prev) =>
      prev.map((each) => {
        if (each.songId === _songId) {
          return { ...each, lyrics: each.lyrics.filter((each) => each.id !== _lyric.id) }
        } else {
          return { ...each }
        }
      })
    )
  }

  const onSave = () => {
    if (!currentSong) return
    // let savedLyrics = lyricsArray.map((each: { id: string; array: Array<string> }) => each.array)
    // setSongs((prev) =>
    //   prev?.map((each) => {
    //     if (each._id === currentSong._id) {
    //       setCurrentSong({ ...each, lyrics: savedLyrics })
    //       return { ...each, lyrics: savedLyrics }
    //     } else {
    //       return each
    //     }
    //   })
    // )
  }

  return {
    currentSong,
    setCurrentSong,
    currentLyrics,
    setCurrentLyrics,
    setCurrentLyricsList,
    lyricsHistory,
    setLyricsHistory,
    onUndo,
    onRedo,
    onReset,
    onSave,
    canUndo,
    canRedo,
    onDeleteLyric,
    onSaveLyric,
  }
}
