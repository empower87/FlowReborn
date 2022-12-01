import { Dispatch, useEffect } from "react"
import { ISong } from "../../../../../../server/src/models"
import { Action, Feeds } from "../../hooks/songFeedReducer"
import SongPost from "./SongPost"

type FeedProps = {
  songs: ISong[]
  feedInView: Feeds
  dispatch: Dispatch<Action>
}

export const Feed = ({ songs, feedInView, dispatch }: FeedProps) => {
  // useEffect(() => {
  //   console.log(songArray, "WTF IS GOING ON HERE")
  //   let scrollTo = document.getElementById(`${trackInView?._id}`)
  //   // scrollTo?.scrollIntoView({ behavior: 'instant' })
  // }, [trackInView])

  useEffect(() => {}, [])

  return (
    <ul className="video-scroll-container">
      {/* <Loading isLoading={isLoading} /> */}
      {songs?.map((item, index) => {
        return <SongPost key={`${item._id}_${index}`} feed={feedInView} song={item} dispatch={dispatch} />
      })}
    </ul>
  )
}
