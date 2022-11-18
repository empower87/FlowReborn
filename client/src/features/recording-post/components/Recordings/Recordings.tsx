import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import { UseFormReturn } from "react-hook-form"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { ISongTake } from "src/features/recording-booth/utils/types"
import { IPostSongFormInputs } from "../../hooks/useSongForm"
import Dropdown from "./Dropdown"

type RecordingsProps = {
  take: ISongTake
  setTake: Dispatch<SetStateAction<ISongTake | undefined>>
  takes: ISongTake[]
  deleteTake: (_id: string) => void
  methods: UseFormReturn<IPostSongFormInputs, any>
  onSubmit: (e: any, _song: ISongTake) => Promise<void | null>
  // title: JSX.Element
  // caption: JSX.Element
}

type InputProps = {
  name: "title" | "caption"
  placeholder: string
  methods: UseFormReturn<IPostSongFormInputs, any>
}

const Input = ({ name, placeholder, methods }: InputProps) => {
  // const [value, setValue] = useState<string>("")

  // useEffect(() => {
  //   console.log(take, value, "lol")
  //   if (take && take[name] !== "") {
  //     setValue(take[name])
  //   }
  // }, [take])

  // const updateTakeValue = () => {
  //   if (value !== "") {
  //     setTake((prev) => {
  //       if (prev) {
  //         return {
  //           ...prev,
  //           [name]: value,
  //         }
  //       }
  //     })
  //     setValue("")
  //   }
  // }

  return (
    <label htmlFor={name} className={`record__select-text--container ${name}`}>
      <input
        className="record__select-text"
        {...methods.register(name)}
        type="text"
        name={name}
        autoComplete="off"
        // value={value}
        // onChange={(e) => setValue(e.target.value)}
        // onBlur={() => updateTakeValue()}
        placeholder={placeholder}
      />
    </label>
  )
}

export default function Recordings({ take, setTake, takes, deleteTake, methods, onSubmit }: RecordingsProps) {
  const widthRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!widthRef.current) return
    const height = widthRef.current.offsetHeight
    widthRef.current.style.width = `${height}px`
  }, [widthRef.current])

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
            <form
              id="post-song-form"
              className="record__recordings-details"
              onSubmit={methods.handleSubmit((data, e) => onSubmit(e, take))}
            >
              <Dropdown take={take} setTake={setTake} takes={takes}>
                <Input name="title" placeholder="Add a title" methods={methods} />
              </Dropdown>

              <div className="record__recordings-caption">
                <div className="record__recordings-caption--bs-outset">
                  <Input name="caption" placeholder="Add a caption" methods={methods} />
                </div>
              </div>
            </form>
            <div className="record__recordings-delete"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
