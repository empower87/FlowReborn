import { Dispatch, forwardRef, SetStateAction, useEffect, useRef, useState } from "react"
import ButtonClearText from "src/components/buttons/ButtonClearText"
import { ISongTake } from "src/features/recording-booth/utils/types"

type FormProps = {
  currentSong: ISongTake
}

type InputProps = {
  type: string
  error: { path: string; message: string; showError: boolean }
  setError: Dispatch<SetStateAction<{ path: string; message: string; showError: boolean }>>
}

export default function Form({ currentSong }: FormProps) {
  // const { handleSaveSong, error, setError } = useSongForm("audio")
  const captionRef = useRef<HTMLInputElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState<boolean>(false)

  // useEffect(() => {
  //   if (error.showError) {
  //     setShowError(true)
  //   } else {
  //     setShowError(false)
  //   }
  // }, [error])

  return (
    <div className="SaveSongDisplay">
      {/* <form className="song-inputs-container">
        <InputError
          isOpen={showError}
          onClose={setShowError}
          message={error?.message}
          options={{ position: [24, 9], size: [35, 81] }}
        />
        <div className="section-title">
          <h2>Upload Your Flow</h2>
        </div>

        <div className="section-inputs">
          <Input type="title" error={error} setError={setError} ref={titleRef} />
          <Input type="caption" error={error} setError={setError} ref={captionRef} />
        </div>

        <div className="buttons-container">
          <div className="buttons-container_shadow-div-inset">
            <button
              className="save-song-button--submit"
              type="submit"
              // onClick={(e) => handleSaveSong(e, currentSong, titleRef.current, captionRef.current)}
            >
              Save
            </button>
          </div>
        </div>
      </form> */}
    </div>
  )
}

const Input = forwardRef(({ type, error, setError }: InputProps, ref: any) => {
  const [value, setValue] = useState<string>("")

  useEffect(() => {
    if (error.path === type || type === "title") ref.current.focus()
  }, [error])

  return (
    <div className="input-container">
      <div className="input-field-container">
        <input
          className={`input-field`}
          style={error.path === type ? { border: "3px solid #ff6e6e" } : {}}
          ref={ref}
          type="text"
          name={type}
          placeholder={type}
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            if (error.showError) setError({ path: "", message: "", showError: false })
          }}
        />
      </div>

      <ButtonClearText
        inset={true}
        shadowColors={["#282828", "#bcbaba", "#282828", "#a7a7a7"]}
        value={value}
        setValue={setValue}
      />
    </div>
  )
})
