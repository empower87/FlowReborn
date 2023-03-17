import { CSSProperties, ReactNode, useLayoutEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import AudioSlider from "src/components/audio/AudioSlider"
import { SideButton, SideButtonMenu } from "src/components/ui/SideButtonMenu"
import useAudioPlayer from "src/hooks/useAudioPlayer"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"
import {
  CommentButtonWithCommentModal,
  FollowButton,
  FullscreenButton,
  LikeButton,
  LyricsButtonWithLyricsModal,
} from "./components/ActionButtons"
import SongPostDetails from "./components/SongPostDetails"
import { MediaProgressBar, PlaybackButtonContainer, Video } from "./components/VideoPlayer"

type SongPostProps = {
  song: ISong
  // isVideoFullscreen: boolean
  // setIsVideoFullscreen: Dispatch<SetStateAction<boolean>>
}

interface ISongPostProps extends SongPostProps {
  style: CSSProperties
}

const INTERSECTION_OPTIONS = {
  // root: document.querySelector(".song-post__list"),
  threshold: 0.9,
}

const SongPostActionsBar = ({ children }: { children: ReactNode }) => {
  return <SideButtonMenu>{children}</SideButtonMenu>
}

export default function SongPost({ song, style }: ISongPostProps) {
  const [itemRef, inView] = useInView(INTERSECTION_OPTIONS)

  const onClickHandler = () => {
    // setIsVideoFullscreen((prev) => !prev)
    console.log("LOL CLICKED DUMB BUTTON")
  }

  return (
    <li ref={itemRef} className="song-post__item" style={style}>
      <VideoProvider
        inView={inView}
        song={song}
        sideBarActions={
          <>
            <LikeButton data={song} />
            <CommentButtonWithCommentModal data={song} />
            <FollowButton data={song.user} />
            <LyricsButtonWithLyricsModal lyrics={song.lyrics} />
            <FullscreenButton onClick={onClickHandler} />
          </>
        }
        songDetails={<SongPostDetails song={song} />}
      />
    </li>
  )
}

const VideoProvider = ({
  inView,
  song,
  songDetails,
  sideBarActions,
}: {
  inView: boolean
  song: ISong
  songDetails: ReactNode
  sideBarActions: ReactNode
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toggleVideoAspect, handleToggleVideoAspect } = useSongVideoControls(song.audio)

  const {
    slider,
    time: { current, end },
    isPlaying,
    setIsPlaying,
    setPlayHandler,
  } = useAudioPlayer({
    ref: videoRef,
    duration: song.duration,
    bgColor: "#eeb2cb",
    video: song.audio,
  })

  if (!inView && isPlaying) setIsPlaying(false)

  return (
    <>
      <Video
        ref={videoRef}
        thumbnail={song.thumbnail}
        src={song.audio}
        onClick={setPlayHandler}
        placeholder={song.video}
        toggleAspectRatio={toggleVideoAspect}
      />

      <PlaybackButtonContainer isPlaying={isPlaying} setIsPlaying={setPlayHandler} />

      <SongPostActionsBar>
        {sideBarActions}
        <SideButton
          type={toggleVideoAspect}
          text="Aspect Ratio"
          hasUser={false}
          onClick={() => handleToggleVideoAspect()}
          size={60}
        />
      </SongPostActionsBar>

      <div className="song-post__details--wrapper">
        {songDetails}
        <MediaProgressBar current={current} end={end}>
          <AudioSlider addClass="" {...slider} />
        </MediaProgressBar>
      </div>
    </>
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

// const FullscreenVideoModal = ({ isOpen, children }: { isOpen: boolean; children: ReactNode }) => {
//   const root = document.getElementById("root")!

//   if (!isOpen) return null
//   return ReactDOM.createPortal(<div className="fullscreen-video-modal">{children}</div>, root)
// }
