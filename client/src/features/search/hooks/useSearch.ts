import { useCallback, useState } from "react"
import { trpc } from "src/utils/trpc"
// import { ISong } from "../../../../../server/src/models/Song"
// import { IUser } from "../../../../../server/src/models/User"
import { ISearch, ISongPopulatedUserAndComments as ISong, IUser } from "src/types/ServerModelTypes"

type SearchResultsType = {
  users: IUser[]
  songs: ISong[]
}

const useSearch = () => {
  const search = trpc.songs.search.useMutation()
  const [searchValue, setSearchValue] = useState<string>("")
  const [searchResults, setSearchResults] = useState<ISearch>({
    users: [],
    songs: [],
  })

  const clearSearchResults = useCallback(() => {
    setSearchResults({ users: [], songs: [] })
  }, [])

  const getSearchResults = useCallback((query: string) => {
    search.mutate(query, {
      onSuccess: (data) => {
        console.log(data, "SEARCH DATA INC")
        setSearchResults({ ...data })
      },
    })
  }, [])

  return { searchResults, getSearchResults, clearSearchResults }
}
export default useSearch
