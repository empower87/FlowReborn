import { forwardRef, useEffect, useState } from "react"
import ButtonClearText from "src/components/buttons/ButtonClearText"
import useDebounce from "src/hooks/useDebounce"
import useMobileKeyboardHandler from "src/hooks/useMobileKeyboardHandler"

type SearchInputProps = {
  getResults: (query: string) => void
  clearResults: () => void
}

export const SearchInput = forwardRef(
  ({ getResults, clearResults }: SearchInputProps, ref: any) => {
    const { handleOnFocus } = useMobileKeyboardHandler()
    const [searchValue, setSearchValue] = useState<string>("")
    const debouncedSearch = useDebounce(searchValue, 300)

    useEffect(() => {
      if (searchValue !== "") {
        getResults(debouncedSearch)
      } else {
        clearResults()
      }
    }, [debouncedSearch])

    useEffect(() => {
      if (ref) ref.current.focus()
    }, [ref])

    return (
      <div className="search-field-input-container">
        <input
          className="search-field-input"
          ref={ref}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          inputMode="search"
          style={{ marginRight: `${searchValue ? "0%" : "2%"}` }}
          placeholder="&#xf002; Search for a user"
          onFocus={() => handleOnFocus()}
        />
        <ButtonClearText
          inset={true}
          shadowColors={["#525252", "#c7c7c7", "#525252", "#c7c7c7"]}
          value={searchValue}
          setValue={setSearchValue}
        />
      </div>
    )
  }
)
