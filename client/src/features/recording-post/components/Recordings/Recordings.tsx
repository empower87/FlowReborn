import { Dispatch, forwardRef, SetStateAction, useEffect, useRef, useState } from "react"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import { ISongTake } from "src/features/recording-booth/utils/types"
import Dropdown from "./Dropdown"

type RecordingsProps = {
  take: ISongTake
  setTake: Dispatch<SetStateAction<ISongTake | undefined>>
  takes: ISongTake[]
  deleteTake: (_id: string) => void
  title: JSX.Element
  caption: JSX.Element
}

type InputProps = {
  name: "title" | "caption"
  placeholder: string
  take: ISongTake | undefined
  setTake: Dispatch<SetStateAction<ISongTake | undefined>>
}

export const Input = forwardRef(({ name, placeholder, take, setTake }: InputProps, ref: any) => {
  const [value, setValue] = useState<string>("")

  useEffect(() => {
    console.log(take, value, "lol")
    if (take && take[name] !== "") {
      setValue(take[name])
    }
  }, [take])

  const updateTakeValue = () => {
    if (value !== "") {
      setTake((prev) => {
        if (prev) {
          return {
            ...prev,
            [name]: value,
          }
        }
      })
      setValue("")
    }
  }

  return (
    <label htmlFor={name} className={`record__select-text--container ${name}`}>
      <input
        className="record__select-text"
        type="text"
        name={name}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => updateTakeValue()}
        placeholder={placeholder}
      />
    </label>
  )
})

export default function Recordings({ take, setTake, takes, deleteTake, title, caption }: RecordingsProps) {
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
            <div className="record__recordings-details">
              <Dropdown take={take} setTake={setTake} takes={takes}>
                {title}
              </Dropdown>

              <div className="record__recordings-caption">
                <div className="record__recordings-caption--bs-outset">{caption}</div>
              </div>
            </div>
            <div className="record__recordings-delete"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
