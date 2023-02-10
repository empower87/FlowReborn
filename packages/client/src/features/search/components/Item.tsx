import { searchIcon } from "src/assets/images/_icons"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
// import { ISong } from "../../../../../server/src/models/Song"
// import { IUser } from "../../../../../server/src/models/User"
import { ISongPopulatedUserAndComments as ISong, IUser } from "src/types/ServerModelTypes"

type Id = IUser["_id"] | ISong["_id"]

type SearchItemProps = {
  id: Id
  type: string
  index: number
  onClick: (id: Id, type: string) => void
  artist: IUser
  song?: ISong
}

const ArtistData = ({ artist }: { artist: IUser }) => {
  return (
    <div className="data-container">
      <div className="data-1_titles">
        <p className="data-title">{artist.username}</p>

        <p className="data-type">Artist</p>
      </div>
      <div className="data-2_caption">
        <p>{artist.email}</p>
      </div>
    </div>
  )
}

const SongData = ({ song }: { song: ISong }) => {
  return (
    <div className="data-container">
      <div className="data-1_titles">
        <p className="data-title">{song.title}</p>

        <p className="data-type">
          Song {String.fromCodePoint(8226)} {song.user.username}
        </p>
      </div>
      <div className="data-2_caption">
        <p>{song.caption}</p>
      </div>
    </div>
  )
}

export const SearchItem = ({ id, type, index, artist, song, onClick }: SearchItemProps) => {
  return (
    <li className="suggestions-result-list">
      <button className="result-link-container" onClick={() => onClick(id, type)}>
        <div className="result-1_data">
          <div className="data_shadow-div-outset">
            <div className="search-icon-container">
              <img className="button-icons" src={searchIcon} alt="search icon" />
            </div>
            {song ? <SongData song={song} /> : <ArtistData artist={artist} />}
          </div>
        </div>

        <div className="result-2_picture">
          <div className="search-prof-inset">
            <div className="search-prof-outset">
              <div className="search-results-link">
                <div className="prof-pic">
                  <UserPhoto photoUrl={artist.picture} username={artist.username} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </li>
  )
}
