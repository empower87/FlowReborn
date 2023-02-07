import { useCallback, useState } from "react"
import { ISearch } from "src/types/ServerModelTypes"
import { trpc } from "src/utils/trpc"

const useSearch = () => {
  const search = trpc.songs.search.useMutation()
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
