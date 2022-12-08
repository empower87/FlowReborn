import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import AudioSlider from "src/components/audio/AudioSlider"
import { PlayButton } from "src/components/buttons/PlayButton"
import { SideButton, SideButtonMenu } from "src/components/ui/SideButtonMenu"
import CommentMenu from "src/features/socialize/comments/components/CommentMenu"
import useFollow from "src/features/socialize/follow/useFollow"
import useLike from "src/features/socialize/like/useLike"
import useAudioPlayer from "src/hooks/useAudioPlayer"
import { useIntersectionObserver } from "src/hooks/useIntersectionObserver"
import { IComment, IUser } from "../../../../../../server/src/models"
import { ISong } from "../../../../../../server/src/models/Song"
import SongDetails from "../Details/SongDetails"

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

const MediaPlayer = ({ song, autoPlay }: { song: ISong; autoPlay: boolean }) => {
  const {
    slider,
    time: { current, end },
    isPlaying,
    setIsPlaying,
  } = useAudioPlayer({
    src: song.audio,
    duration: song.duration,
    bgColor: "#eeb2cb",
    video: song.thumbnail ? song.audio : undefined,
  })

  useEffect(() => {
    if (autoPlay) {
      setIsPlaying(true)
    }
  }, [autoPlay])

  return (
    <div className="audio-player">
      <div className="audio-player__slider">
        <div className="audio-player__playback-text Start">{current}</div>
        <div className="audio-player__slider">
          <div className="audio-player__slider--bs-inset">
            <AudioSlider addClass="" {...slider} />
          </div>
        </div>
        <div className="audio-player__playback-text End">{end}</div>
      </div>
      <div className="audio-player__play">
        <div className="audio-player__play-btn">
          <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={song.audio} />
        </div>
      </div>
    </div>
  )
}

export default function SongPost({
  song,
  isVideoFullscreen,
  setIsVideoFullscreen,
  setOnShowCommentMenu,
}: {
  song: ISong
  isVideoFullscreen: boolean
  setIsVideoFullscreen: Dispatch<SetStateAction<boolean>>
  setOnShowCommentMenu: Dispatch<SetStateAction<boolean>>
}) {
  const [showComments, setShowComments] = useState<boolean>(false)
  const [toggleLyrics, setToggleLyrics] = useState<boolean>(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const isIntersecting = useIntersectionObserver(itemRef, {
    threshold: 0.9,
    root: document.querySelector(".video-scroll-container"),
    rootMargin: "0px 0px 200px 0px",
  })

  useEffect(() => {
    if (showComments) {
      setOnShowCommentMenu(true)
    } else {
      setOnShowCommentMenu(false)
    }
  }, [showComments])

  return (
    <li
      id={song?._id}
      ref={itemRef}
      className="video-pane"
      style={{ backgroundImage: `url(${song.video && isIntersecting ? song.video : ""})` }}
    >
      <CommentMenu song={song} isOpen={showComments} onClose={setShowComments} />

      {song.thumbnail && isIntersecting ? (
        <video
          id={song.audio}
          className="video-pane-video"
          src={song.audio}
          poster={song.thumbnail}
          autoPlay
          loop
          playsInline
          onClick={() => setIsVideoFullscreen(false)}
        />
      ) : (
        <></>
      )}
      <div
        className="last-div"
        style={{ visibility: isVideoFullscreen ? "hidden" : "visible" }}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            setIsVideoFullscreen(true)
          }
        }}
      >
        <MediaPlayer song={song} autoPlay={isIntersecting} />

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
