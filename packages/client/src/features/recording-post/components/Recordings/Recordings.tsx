import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"
import { UseFormReturn } from "react-hook-form"
import InputError from "src/components/errors/InputError"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { useSongDraftsContext } from "src/features/recording-booth/hooks/useSongDrafts"
import { INITIAL_ERROR_STATE, IPostSongFormInputs, useSongForm } from "../../hooks/useSongForm"
import Dropdown from "./Dropdown"

// type RecordingsProps = {
//   take: ISongTake
//   setTake: Dispatch<SetStateAction<ISongTake | undefined>>
//   takes: ISongTake[]
//   deleteTake: (_id: string) => void
//   methods: UseFormReturn<IPostSongFormInputs, any>
//   onSubmit: (e: any, _song: ISongTake) => Promise<void | null>
//   // title: JSX.Element
//   // caption: JSX.Element
// }

type InputProps = {
  name: "title" | "caption"
  placeholder: string
  methods: UseFormReturn<IPostSongFormInputs, any>
}

const Input = ({ name, placeholder, methods }: InputProps) => {
  return (
    <label htmlFor={name} className={`record__select-text--container ${name}`}>
      <input
        className="record__select-text"
        {...methods.register(name)}
        type="text"
        // name={name}
        autoComplete="off"
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        // onBlur={() => updateTakeValue()}
        placeholder={placeholder}
      />
    </label>
  )
}

export const Form = ({
  recordingType,
  setSaving,
}: {
  recordingType: "audio" | "video"
  setSaving: Dispatch<SetStateAction<boolean>>
}) => {
  const { handleSaveSong, methods, isSaving, error, setError } = useSongForm(recordingType)
  const { currentDraft } = useSongDraftsContext()

  useEffect(() => {
    setSaving(isSaving)
  }, [isSaving, setSaving])

  return (
    <>
      {error.showError && (
        <InputError
          isOpen={error.showError}
          onClose={() => setError(INITIAL_ERROR_STATE)}
          message={error.message}
          options={{ position: [6, 27], size: [40, 72] }}
        />
      )}
      <form
        id="post-song-form"
        className="record__recordings-details"
        onSubmit={methods.handleSubmit((data, e) => handleSaveSong(e, currentDraft))}
      >
        <Dropdown>
          <Input name="title" placeholder="Add a title" methods={methods} />
        </Dropdown>

        <div className="record__recordings-caption">
          <div className="record__recordings-caption--bs-outset">
            <Input name="caption" placeholder="Add a caption" methods={methods} />
          </div>
        </div>
      </form>
    </>
  )
}

export default function Recordings({ children }: { children: ReactNode }) {
  const widthRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!widthRef.current) return
    const height = widthRef.current.offsetHeight
    widthRef.current.style.width = `${height}px`
  }, [])

  return (
    <div className="record__recordings">
      <div className="record__recordings--bs-outset">
        <div className="record__recordings--bs-inset">
          <div className="record__recordings-user-photo" ref={widthRef}>
            <div className="record__recordings-user-photo--bs-outset">
              <div className="record__recordings-user-photo--bs-inset">
                <div className="record__recordings-user-photo--wrapper">
                  <UserPhoto photoUrl={user?.picture} username={user ? user.username : "U"} />
                </div>
              </div>
            </div>
          </div>

          <div className="record__recordings-content">
            {children}
            <div className="record__recordings-delete"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
