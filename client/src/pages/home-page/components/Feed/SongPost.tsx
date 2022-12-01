import { Dispatch, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import AudioSlider from "src/components/audio/AudioSlider"
import { PlayButton } from "src/components/buttons/PlayButton"
import { SideButton, SideButtonMenu } from "src/components/ui/SideButtonMenu"
import CommentMenu from "src/features/socialize/comments/components/CommentMenu"
import useFollow from "src/features/socialize/follow/useFollow"
import useLike from "src/features/socialize/like/useLike"
import useAudioPlayer from "src/hooks/useAudioPlayer"
import { IComment, IUser } from "../../../../../../server/src/models"
import { ISong } from "../../../../../../server/src/models/Song"
import { Action, Feeds } from "../../hooks/songFeedReducer"
import SongDetails from "../Details/SongDetails"

type Props = {
  feed: Feeds
  song: ISong
  dispatch: Dispatch<Action>
}

const LikeButton = ({ data }: { data: ISong | IComment }) => {
  const { total, hasUser, onClick } = useLike(data, "Song")
  return <SideButton type="Like" text={`${total}`} hasUser={hasUser} onClick={onClick} size={75} />
}

const FollowButton = ({ data }: { data: IUser }) => {
  const { total, hasUser, onClick } = useFollow(data)
  return <SideButton type="Follow" text={`${total}`} hasUser={hasUser} onClick={onClick} size={110} />
}

const ShowLyrics = ({ lyrics, isOpen }: { lyrics: string[][]; isOpen: boolean }) => {
  return (
    <div className={`lyrics-popup ${isOpen ? "Open" : "Closed"}`} style={{ visibility: isOpen ? "visible" : "hidden" }}>
      {lyrics.map((line, index) => {
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
  )
}
const MediaPlayer = ({ song }: { song: ISong }) => {
  const { slider, time, isPlaying, setIsPlaying } = useAudioPlayer({
    src: song.audio,
    duration: song.duration,
    bgColor: "#eeb2cb",
    video: song.thumbnail ? song.audio : undefined,
  })

  return (
    <div className="audio-player">
      <div className="audio-player__slider">
        <div className="audio-player__playback-text Start">{time.current}</div>
        <div className="audio-player__slider">
          <div className="audio-player__slider--bs-inset">
            <AudioSlider addClass="" {...slider} />
          </div>
        </div>
        <div className="audio-player__playback-text End">{time.end}</div>
      </div>
      <div className="audio-player__play">
        <div className="audio-player__play-btn">
          <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={song.audio} />
        </div>
      </div>
    </div>
  )
}

export default function SongPost({ feed, song, dispatch }: Props) {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [toggleLyrics, setToggleLyrics] = useState<boolean>(false)

  const [ref, inView] = useInView({
    threshold: 0.9,
    root: document.querySelector(".video-scroll-container"),
    rootMargin: "0px 0px 200px 0px",
  })

  useEffect(() => {
    // const video = gifs[Math.floor(Math.random() * 10)].url
    if (inView) {
      dispatch({ type: "SET_SONG_INDEX", payload: { songId: song._id, feed: feed } })
      // if (loadVideo === "") setLoadVideo(video)
    }
  }, [inView])

  return (
    <li
      id={song?._id}
      ref={ref}
      className="video-pane"
      style={{ backgroundImage: `url(${song.video ? song.video : ""})` }}
    >
      <CommentMenu song={song} page={"Home"} isOpen={showComments} onClose={setShowComments} />

      {song.thumbnail ? (
        <video
          id={song.audio}
          className="video-pane-video"
          src={song.audio}
          poster={song.thumbnail}
          autoPlay={inView}
          loop={inView}
          playsInline
        />
      ) : (
        <></>
      )}
      <div className="last-div">
        <MediaPlayer song={song} />

        <SideButtonMenu>
          <LikeButton data={song} />
          <SideButton
            type="Comment"
            text={`${song.comments.length}`}
            hasUser={false}
            onClick={() => setShowComments(true)}
            isPressed={showComments}
            size={60}
          />
          <FollowButton data={song.user} />
          <SideButton
            type="Songs"
            text={"Lyrics"}
            hasUser={false}
            onClick={() => setToggleLyrics((prev) => !prev)}
            isPressed={toggleLyrics}
            size={80}
          />
        </SideButtonMenu>

        <ShowLyrics lyrics={song.lyrics} isOpen={toggleLyrics} />
        <SongDetails song={song} />
      </div>
    </li>
  )
}
