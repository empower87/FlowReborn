import { useEffect } from "react"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { IUser } from "../../../../../../server/src/models/User"
import useSongsFeed from "../../hooks/useSongFeeds"
import SongItem from "./SongItem/Item"
import NoSongsItem from "./SongItem/NoSongsItem"

type FeedType = "Songs" | "Follow" | "Like"

type FeedButtonProps = {
  type: FeedType
  selected: FeedType
  length: number
  onClick: (value: FeedType) => void
  size?: number
}

const FeedButton = ({ type, selected, length, onClick, size }: FeedButtonProps) => {
  return (
    <div className="profile-songs__feed-btn--container">
      <button
        className={`profile-songs__feed-btn ${type} ${type === selected ? "Selected" : ""}`}
        onClick={() => onClick(type)}
      >
        <div className="profile-songs__feed-btn-icon">
          <Icon type={ButtonTypes[type]} options={{ color: "Primary", size: size }} />
          <p className="profile-songs__feed-btn-count">{length}</p>
        </div>
      </button>
    </div>
  )
}

export default function SongFeeds({ user }: { user: IUser }) {
  const { state, dispatch, isLoading } = useSongsFeed(user)

  const toggleFeedHandler = (toggle: FeedType) => {
    dispatch({ type: "SHOW_LIST", payload: { list: [], displayed: toggle } })
  }

  useEffect(() => {
    dispatch({ type: "SHOW_LIST", payload: { list: [], displayed: "Songs" } })
  }, [isLoading])

  return (
    <div className="section-2_profile">
      <div className="section-2a_songs">
        <div className="section-2a_songs-container">
          <ul className="profile-songs__list">
            {isLoading ? (
              <p>loading...</p>
            ) : state.displayedSongs.length === 0 ? (
              <NoSongsItem />
            ) : (
              state.displayedSongs.map((song, index) => {
                return <SongItem key={`${song._id}_${index}`} song={song} profileUser={user} />
              })
            )}
          </ul>
        </div>
      </div>

      <div className="profile-songs__feed-toggle">
        <div className="profile-songs__feed-toggle--bs-inset">
          <FeedButton
            type="Songs"
            selected={state.isDisplayed}
            length={state.songsLength}
            onClick={toggleFeedHandler}
            size={80}
          />
          <FeedButton
            type="Follow"
            selected={state.isDisplayed}
            length={state.followLength}
            onClick={toggleFeedHandler}
            size={130}
          />
          <FeedButton
            type="Like"
            selected={state.isDisplayed}
            length={state.likeLength}
            onClick={toggleFeedHandler}
            size={75}
          />
        </div>
      </div>
    </div>
  )
}
