import { ISong } from "../../../../../server/src/models/Song"
import { IUser } from "../../../../../server/src/models/User"
import { SearchItem } from "./Item"

type SearchListProps = {
  users: IUser[]
  songs: ISong[]
  onClick: (id: string, type: string) => void
}

export const SearchList = ({ users, songs, onClick }: SearchListProps) => {
  return (
    <ul className="suggestions_shadow-div-outset">
      {users &&
        users.map((user, index) => {
          return (
            <SearchItem
              key={`${user._id}_${index}`}
              id={user._id}
              type="artist"
              index={index}
              artist={user}
              onClick={onClick}
            />
          )
        })}
      {songs &&
        songs.map((song, index) => {
          return (
            <SearchItem
              key={`${song._id}_${index}`}
              id={song._id}
              type="song"
              index={index}
              artist={song.user}
              song={song}
              onClick={onClick}
            />
          )
        })}
    </ul>
  )
}
