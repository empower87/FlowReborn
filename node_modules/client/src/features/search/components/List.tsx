// import { ISong } from "../../../../../server/src/models/Song"
// import { IUser } from "../../../../../server/src/models/User"
import { ISearch } from "src/types/ServerModelTypes"
import { SearchItem } from "./Item"

interface SearchListProps extends ISearch {
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
          const artist = song.user
          return (
            <SearchItem
              key={`${song._id}_${index}`}
              id={song._id}
              type="song"
              index={index}
              artist={artist}
              song={song}
              onClick={onClick}
            />
          )
        })}
    </ul>
  )
}
