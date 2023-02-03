import { useRef, useState } from "react"
// import { ISong } from "../../../../server/src/models"
import { ISong } from "src/types/ServerModelTypes"

type SongPostProps = {
  song: ISong
}

const SocialButtonMenu = () => {
  return <div className="post__social-btn-menu"></div>
}

const SongDetails = () => {
  // user photo, song title, caption, etc..
}

const MediaPlayer = () => {}

const LyricsModal = () => {}

export default function SongPost({ song }: SongPostProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loadVideo, setLoadVideo] = useState<string>("")

  return (
    <li id={song?._id} className="video-pane" style={{ backgroundImage: `url(${!song.thumbnail ? loadVideo : ""})` }}>
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
      </div>
    </li>
  )
}
