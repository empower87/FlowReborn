import { useCallback, useEffect, useState } from "react"
import { trpc } from "src/utils/trpc"
import { ISong } from "../../../../../server/src/models/Song"

const useSongPage = (id: string | undefined) => {
  const songId = id ? id : ""
  const {
    data: song,
    isLoading: songIsLoading,
    isError: songIsError,
  } = trpc.useQuery(["songs.get-song", { _id: songId }], {
    enabled: !!songId,
  })
  const userId = song?.user ? song.user._id : ""
  const {
    data: songs,
    isLoading: songsIsLoading,
    isError: songsIsError,
  } = trpc.useQuery(["songs.users-songs", { _id: userId }], {
    enabled: !!userId,
  })
  const [songInView, setSongInView] = useState<ISong>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    if (song) {
      setSongInView(song)
    }
  }, [song])

  useEffect(() => {
    if (songIsLoading || songsIsLoading) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [songIsLoading, songsIsLoading])

  useEffect(() => {
    if (songIsError || songsIsError) {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }, [songIsError, songsIsError])

  const findCurrentSong = useCallback(
    (direction: "Previous" | "Next") => {
      if (!songs) return
      ;[...songs].filter((each: ISong, index: number) => {
        if (each._id === songInView?._id) {
          if (direction === "Previous") {
            if (index === 0) {
              return null
            } else {
              setSongInView(songs[index - 1])
            }
          } else {
            if (index === songs.length - 1) {
              return null
            } else {
              setSongInView(songs[index + 1])
            }
          }
        }
      })
    },
    [songs, songInView]
  )

  return { songInView, songs, findCurrentSong, isLoading, isError }
}

export default useSongPage
