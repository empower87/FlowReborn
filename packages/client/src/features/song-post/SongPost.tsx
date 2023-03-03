import { CSSProperties, Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react"
import AudioSlider from "src/components/audio/AudioSlider"
import { SideButton, SideButtonMenu } from "src/components/ui/SideButtonMenu"
import CommentMenu from "src/features/socialize/comments/components/CommentMenu"
import useFollow from "src/features/socialize/follow/useFollow"
import useLike from "src/features/socialize/like/useLike"
import useAudioPlayer from "src/hooks/useAudioPlayer"
import { useIntersectionObserver } from "src/hooks/useIntersectionObserver"
import { IComment, ISongPopulatedUserAndComments as ISong, IUser } from "src/types/ServerModelTypes"
import SongDetails from "./Details/SongDetails"

type SongPostProps = {
  song: ISong
  isVideoFullscreen: boolean
  setIsVideoFullscreen: Dispatch<SetStateAction<boolean>>
}

interface ISongPostProps extends SongPostProps {
  style: CSSProperties
}

interface ISongPostUIOverlayProps extends SongPostProps {
  isIntersecting: boolean
  showComments: boolean
  setShowComments: Dispatch<SetStateAction<boolean>>
  toggleAspectRatio: "Landscape" | "Portrait"
  handleToggleVideoAspect: () => void
}

type VideoProps = {
  thumbnail: string | undefined
  src: string | undefined
  onClick: () => void
  placeholder?: string | undefined
  toggleAspectRatio: "Landscape" | "Portrait"
}

const LikeButton = ({ data }: { data: ISong | IComment }) => {
  const { total, hasUser, onClick } = useLike(data._id, data.likes, "Song")
  return <SideButton type="Like" text={`${total}`} hasUser={hasUser} onClick={onClick} size={75} />
}

const FollowButton = ({ data }: { data: IUser }) => {
  const { total, hasUser, onClick } = useFollow(data._id, data.followers)
  return <SideButton type="Follow" text={`${total}`} hasUser={hasUser} onClick={onClick} size={110} />
}

const LyricsModal = ({ lyrics, isOpen }: { lyrics: string[][]; isOpen: boolean }) => {
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
    } else {
      setIsPlaying(false)
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
      {/* <div className="audio-player__play">
        <div className="audio-player__play-btn">
          <PlayButton isPlaying={isPlaying} setIsPlaying={setIsPlaying} audio={song.audio} />
        </div>
      </div> */}
    </div>
  )
}

const SongPostUIOverlay = ({
  song,
  isVideoFullscreen,
  setIsVideoFullscreen,
  isIntersecting,
  showComments,
  setShowComments,
  toggleAspectRatio,
  handleToggleVideoAspect,
}: ISongPostUIOverlayProps) => {
  const [toggleLyrics, setToggleLyrics] = useState<boolean>(false)
  return (
    <div
      className="song-post__item-uioverlay"
      style={{ visibility: isVideoFullscreen ? "hidden" : "visible" }}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          setIsVideoFullscreen((prev) => !prev)
        }
      }}
    >
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
        <SideButton
          type={toggleAspectRatio}
          text="Aspect Ratio"
          hasUser={false}
          onClick={() => handleToggleVideoAspect()}
          size={60}
        />
      </SideButtonMenu>

      <LyricsModal lyrics={song.lyrics} isOpen={toggleLyrics} />
      <div className="song-post__details--wrapper">
        <SongDetails song={song} />
        <MediaPlayer song={song} autoPlay={isIntersecting} />
      </div>
    </div>
  )
}

export default function SongPost({ song, style, isVideoFullscreen, setIsVideoFullscreen }: ISongPostProps) {
  const [showComments, setShowComments] = useState<boolean>(false)
  const itemRef = useRef<HTMLLIElement>(null)

  const { toggleVideoAspect, handleToggleVideoAspect } = useSongVideoControls(song.audio)
  const isIntersecting = useIntersectionObserver(itemRef, {
    threshold: 0.9,
    root: document.querySelector(".song-post__container"),
    rootMargin: "0px 0px 200px 0px",
  })

  const onClickHandler = () => {
    setIsVideoFullscreen((prev) => !prev)
  }

  return (
    <li id={song?._id} ref={itemRef} className="song-post__item" style={style}>
      <CommentMenu song={song} isOpen={showComments} onClose={setShowComments} />

      {isIntersecting && (
        <Video
          thumbnail={song.thumbnail}
          src={song.audio}
          onClick={onClickHandler}
          placeholder={song.video}
          toggleAspectRatio={toggleVideoAspect}
        />
      )}

      <SongPostUIOverlay
        song={song}
        isVideoFullscreen={isVideoFullscreen}
        setIsVideoFullscreen={setIsVideoFullscreen}
        isIntersecting={isIntersecting}
        showComments={showComments}
        setShowComments={setShowComments}
        toggleAspectRatio={toggleVideoAspect}
        handleToggleVideoAspect={handleToggleVideoAspect}
      />
    </li>
  )
}

// button on top right to toggle between fullscreen and hide ui
// landscape mode
// onClick should allow pausing
// easy muting

const useSongVideoControls = (id: string) => {
  const video = document.getElementById(id)

  const [isVideoLandscape, setIsVideoLandscape] = useState<boolean>(false)
  const [toggleVideoAspect, setToggleVideoAspect] = useState<"Landscape" | "Portrait">("Portrait")

  useLayoutEffect(() => {
    if (!video) return
    const castedVideo = video as HTMLVideoElement

    const isLandscapeRatio = castedVideo.videoWidth > castedVideo.videoHeight
    setIsVideoLandscape(isLandscapeRatio)
  }, [video])

  const handleToggleVideoAspect = () => {
    setToggleVideoAspect((prev) => (prev === "Landscape" ? "Portrait" : "Landscape"))
  }

  return {
    handleToggleVideoAspect,
    toggleVideoAspect,
  }
}

const Video = ({ thumbnail, src, onClick, placeholder, toggleAspectRatio }: VideoProps) => {
  return (
    <div
      className="song-post__video--container"
      style={{ backgroundImage: `url(${placeholder ? placeholder : ""})` }}
      onClick={onClick}
    >
      {thumbnail && (
        <video
          id={src}
          className={`video-pane-video`}
          style={{ objectFit: toggleAspectRatio === "Landscape" ? "contain" : "cover" }}
          src={src}
          poster={thumbnail}
          loop
          playsInline
        />
      )}
    </div>
  )
}
