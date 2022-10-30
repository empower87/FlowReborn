import { Dispatch, useEffect } from "react"
import { ISong } from "../../../../../../server/src/models"
import { Action, Feeds } from "../../hooks/songFeedReducer"
import Video from "./Video"

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
    <ul className="video-scroll-container" style={{ overflowY: "scroll" }}>
      {/* <Loading isLoading={isLoading} /> */}
      {songs?.map((item, index) => {
        return <Video key={`${item._id}_${index}`} feed={feedInView} song={item} dispatch={dispatch} />
      })}
    </ul>
  )
}
