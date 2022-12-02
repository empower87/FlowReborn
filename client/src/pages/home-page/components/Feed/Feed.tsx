import { ISong } from "../../../../../../server/src/models"
import SongPost from "./SongPost"

type FeedProps = {
  songs: ISong[]
}

export const Feed = ({ songs }: FeedProps) => {
  return (
    <ul className="video-scroll-container">
      {/* <Loading isLoading={isLoading} /> */}
      {songs?.map((item, index) => {
        return <SongPost key={`${item._id}_${index}`} song={item} />
      })}
    </ul>
  )
}
