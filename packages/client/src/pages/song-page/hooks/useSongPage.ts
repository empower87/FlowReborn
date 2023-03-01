import { inferReactQueryProcedureOptions } from "@trpc/react-query"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { useCallback, useEffect, useState } from "react"
import { trpc } from "src/utils/trpc"
// import { ISong } from "../../../../../server/src/models"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"
import type { AppRouter } from "../../../../../server/src/routes/app.router"

type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>
type RouterInputs = inferRouterInputs<AppRouter>
type RouterOutput = inferRouterOutputs<AppRouter>

const useSongPage = (id: string | undefined) => {
  const songId = id ? id : ""
  const {
    data: song,
    isLoading: songIsLoading,
    isError: songIsError,
  } = trpc.songs.getSongPopulated.useQuery(
    { _id: songId },
    {
      enabled: !!songId,
    }
  )

  // if (!song) return null
  // const {
  //   data: song,
  //   isLoading: songIsLoading,
  //   isError: songIsError,
  // } = trpc.useQuery(["songs.get-song", { _id: songId }], {
  //   enabled: !!songId,
  // })

  const userId = song && song.user ? song.user._id : ""

  // const userId = ""

  // const userId = songQuery.user._id

  const {
    data: songs,
    isLoading: songsIsLoading,
    isError: songsIsError,
  } = trpc.songs.usersSongsWithComments.useQuery(
    { _id: userId },
    {
      enabled: !!userId,
    }
  )
  const [songInView, setSongInView] = useState<ISong>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [allSongs, setAllSongs] = useState<ISong[]>([])

  useEffect(() => {
    const oneSong = song

    if (song) {
      console.log(oneSong, "wtf is going on???")
      setSongInView(song)
    }
  }, [song])

  useEffect(() => {
    if (songs) {
      setAllSongs(songs)
    }
  }, [songs])

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
      if (!allSongs) return
      ;[...allSongs].filter((each, index) => {
        if (each._id === songInView?._id) {
          if (direction === "Previous") {
            if (index === 0) {
              return null
            } else {
              setSongInView(allSongs[index - 1])
            }
          } else {
            if (index === allSongs.length - 1) {
              return null
            } else {
              setSongInView(allSongs[index + 1])
            }
          }
        }
      })
    },
    [allSongs, songInView]
  )

  return { songInView, songs, findCurrentSong, isLoading, isError }
}

export default useSongPage
