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

  const getSearchResults = useCallback(
    (query: string) => {
      search.mutate(query, {
        onSuccess: (data) => {
          console.log(data, "Search data results...")
          setSearchResults({ ...data })
        },
        onError: (error) => {
          console.error("Error fetching search results: ", error)
        },
      })
    },
    [search]
  )

  return { searchResults, getSearchResults, clearSearchResults }
}

export default useSearch
