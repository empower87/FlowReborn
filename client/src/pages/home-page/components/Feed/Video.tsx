import { Dispatch, useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import gifsArray from "src/assets/images/gifs.json"
import { SideButton, SideButtonMenu } from "src/components/ui/SideButtonMenu"
import useFollow from "src/features/socialize/follow/useFollow"
import useLike from "src/features/socialize/like/useLike"
import { IComment, IUser } from "../../../../../../server/src/models"
import { ISong } from "../../../../../../server/src/models/Song"
import { Action, Feeds } from "../../hooks/songFeedReducer"
import SongDetails from "../Details/SongDetails"

type Props = {
  feed: Feeds
  song: ISong
  dispatch: Dispatch<Action>
}

function Video({ feed, song, dispatch }: Props) {
  const [loadVideo, setLoadVideo] = useState<string>("")
  const gifs = [...gifsArray]
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

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

  useEffect(() => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
    console.log(song, "what does this look like?")
  }, [isPlaying, videoRef.current])

  return (
    <li
      id={song?._id}
      ref={ref}
      className="video-pane"
      style={{ backgroundImage: `url(${!song.thumbnail ? loadVideo : ""})` }}
    >
      {song.thumbnail ? (
        <video
          id={song.audio}
          className="video-pane-video"
          ref={videoRef}
          src={song.audio}
          poster={song.thumbnail}
          autoPlay
          loop
          playsInline
        />
      ) : (
        <></>
      )}
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
        <SideButtonMenu>
          {/* <SideButton
            type="Like"
            text={`${song.likes.length}`}
            isPressed={false}
            onClick={() => console.log("lol")}
            size={75}
          /> */}
          <LikeButton data={song} />
          <SideButton
            type="Comment"
            text={`${song.comments.length}`}
            isPressed={false}
            onClick={() => console.log("lol")}
            size={60}
          />
          {/* <SideButton
            type="Follow"
            text={`${song.user.followers.length}`}
            isPressed={false}
            onClick={() => console.log("lol")}
            size={100}
          /> */}
          <FollowButton data={song.user} />
          <SideButton type="Songs" text={"Lyrics"} isPressed={false} onClick={() => console.log("lol")} size={80} />
        </SideButtonMenu>

        <SongDetails song={song} />
      </div>
    </li>
  )
}

const LikeButton = ({ data }: { data: ISong | IComment }) => {
  const likes = useLike(data, "Song")
  return <SideButton type="Like" text={`${likes.total}`} isPressed={likes.hasUser} onClick={likes.onClick} size={75} />
}

const FollowButton = ({ data }: { data: IUser }) => {
  const follows = useFollow(data)
  return (
    <SideButton
      type="Follow"
      text={`${follows.total}`}
      isPressed={follows.hasUser}
      onClick={follows.onClick}
      size={110}
    />
  )
}

export default Video
