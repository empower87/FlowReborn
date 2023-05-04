import { CSSProperties, ReactNode } from "react"
import { useInView } from "react-intersection-observer"
import { SideButtonMenu } from "src/components/ui/SideButtonMenu"
import { ISongPopulatedUserAndComments as ISong } from "src/types/ServerModelTypes"
import { Video } from "../video/Video"
import {
  CommentButtonWithCommentModal,
  FollowButton,
  LikeButton,
  LyricsButtonWithLyricsModal,
} from "./components/ActionButtons"
import SongPostDetails from "./components/SongPostDetails"

type SongPostProps = {
  song: ISong
  // isVideoFullscreen: boolean
  // setIsVideoFullscreen: Dispatch<SetStateAction<boolean>>
}

interface ISongPostProps extends SongPostProps {
  style: CSSProperties
}

type VideoProviderProps = {
  isVideo: boolean
  inView: boolean
  song: ISong
  songDetails: ReactNode
  sideBarActions: ReactNode
}

const INTERSECTION_OPTIONS = {
  // root: document.querySelector(".song-post__list"),
  threshold: 0.9,
}

const SongPostActionsBar = ({ children }: { children: ReactNode }) => {
  return (
    <div className="song-post__side-bar">
      <SideButtonMenu>{children}</SideButtonMenu>
    </div>
  )
}

export default function SongPost({ song, style }: ISongPostProps) {
  const [itemRef, inView] = useInView(INTERSECTION_OPTIONS)

  const isVideo = typeof song.isVideo !== "undefined" && song.isVideo === true ? true : false
  return (
    <li ref={itemRef} className="song-post__item" style={style}>
      <VideoProvider
        isVideo={isVideo}
        inView={inView}
        song={song}
        sideBarActions={
          <>
            <LikeButton data={song} />
            <CommentButtonWithCommentModal data={song} />
            <FollowButton data={song.user} />
            <LyricsButtonWithLyricsModal lyrics={song.lyrics} />
          </>
        }
        songDetails={<SongPostDetails song={song} />}
      />
    </li>
  )
}

const VideoProvider = ({ isVideo, inView, song, songDetails, sideBarActions }: VideoProviderProps) => {
  // const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <>
      <Video src={song.src} isVideo={isVideo} inView={inView} />

      <SongPostActionsBar>{sideBarActions}</SongPostActionsBar>

      <div className="song-post__details--wrapper">
        {songDetails}
        {/* <MediaProgressBarWrapper duration={song.duration} videoRef={videoRef} /> */}
      </div>
    </>
  )
}
