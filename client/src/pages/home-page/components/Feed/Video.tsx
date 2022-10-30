import { Dispatch, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import gifsArray from "src/assets/images/gifs.json"
import { ISong } from "../../../../../../server/src/models/Song"
import { Action, Feeds } from "../../hooks/songFeedReducer"

type Props = {
  feed: Feeds
  song: ISong
  dispatch: Dispatch<Action>
}

function Video({ feed, song, dispatch }: Props) {
  const [loadVideo, setLoadVideo] = useState<string>("")
  const gifs = [...gifsArray]

  const [ref, inView] = useInView({
    threshold: 0.9,
    root: document.querySelector(".video-scroll-container"),
    rootMargin: "0px 0px 200px 0px",
  })

  useEffect(() => {
    const video = gifs[Math.floor(Math.random() * 10)].url
    if (inView) {
      dispatch({ type: "SET_SONG_INDEX", payload: { songId: song._id, feed: feed } })
      if (loadVideo === "") setLoadVideo(video)
    }
  }, [inView])

  return (
    <li id={song?._id} ref={ref} className="video-pane" style={{ backgroundImage: `url(${loadVideo})` }}>
      {/* <div className="transparent"></div> */}
      <div className="last-div">
        {song?.lyrics?.map((line, index) => {
          return (
            <div className="each-lyric-container" key={`${index}_${line}_songlyrics`}>
              <p className="each-lyric-no">{index + 1}</p>
              {line.map((lyric, i) => {
                return (
                  <p key={`${i}_${lyric}`} className="each-lyric-line">
                    {lyric}
                  </p>
                )
              })}
            </div>
          )
        })}
      </div>
    </li>
  )
}

export default Video
