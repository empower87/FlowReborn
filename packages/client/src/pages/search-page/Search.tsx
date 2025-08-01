import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { BtnColorsEnum, RoundButton } from "src/components/buttons/RoundButton/RoundButton"
import { LayoutTwo } from "src/components/layouts/LayoutWrappers"
import Navbar from "src/components/navbar/Navbar"
import { SearchInput } from "src/features/search/components/Input"
import { SearchList } from "src/features/search/components/List"
import useSearch from "src/features/search/hooks/useSearch"

// type LocationPropTypes = {
//   returnValue: string
// }

function Search() {
  const navigate = useNavigate()
  const { searchResults, getSearchResults, clearSearchResults } = useSearch()
  const searchInputRef = useRef<HTMLInputElement>(null)
  // const renderRef = useRef<number>(0)

  const navigateOnClick = (id: string, type: string) => {
    if (type === "song") navigate(`/songScreen/${id}`, { state: { currentSong: id } })
    else navigate(`/profile/${id}`)
  }

  const onClose = () => {
    navigate(-1)
  }

  return (
    <div id="Search" className="Search">
      <div className="search-inner" id="SearchInner">
        <LayoutTwo classes={["section-1_search-field", "search-field_shadow-div-outset"]}>
          <form className="search-field-form" onSubmit={(e) => e.preventDefault()}>
            <div className="search-back-btn-container">
              <RoundButton
                type="Back"
                btnOptions={{
                  offset: 10,
                  bgColor: BtnColorsEnum.Primary,
                }}
                iconOptions={{ color: "White", size: 75 }}
                onClick={() => onClose()}
              />
            </div>
            <SearchInput getResults={getSearchResults} clearResults={clearSearchResults} ref={searchInputRef} />
          </form>
        </LayoutTwo>

        <div className="section-2_search-results" id="SearchResults">
          <div className="results-1_recent"></div>
          <LayoutTwo classes={["results-2_suggestions", "suggestions_shadow-div-inset"]}>
            <SearchList users={searchResults.users} songs={searchResults.songs} onClick={navigateOnClick} />
          </LayoutTwo>
        </div>
      </div>
      <Navbar variant="light-variant" />
    </div>
  )
}

export default Search
