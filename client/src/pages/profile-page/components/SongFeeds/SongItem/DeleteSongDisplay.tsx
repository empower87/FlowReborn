// import { ISong } from "../../../../../../../server/src/models/Song"
import { ISongPopulatedUser as ISong } from "src/types/ServerModelTypes"

type ButtonProps = {
  title: string
  onClick: any
}

const Button = ({ title, onClick }: ButtonProps) => {
  const classOne = title === "Cancel" ? "cancel-btn-container" : "confirm-btn-container"
  const classTwo = title === "Cancel" ? "cancel-btn_shadow-div-outset" : "confirm-btn_shadow-div-outset"

  return (
    <div className={classOne}>
      <button className={classTwo} onClick={() => onClick()}>
        {title}
      </button>
    </div>
  )
}

export default function ConfirmDeleteSong({ song }: { song: ISong }) {
  return (
    <div className="delete-container">
      <div className="delete-question-container">
        <p>
          Are you sure you want to delete <span>{song.title}</span>?
        </p>
      </div>
      <div className="delete-btn-container">
        <div className="delete-btn_shadow-div-inset">
          <div className="space-container"></div>
          <Button title="Cancel" onClick={() => console.log("lol")} />
          <Button title="Delete" onClick={() => console.log("lol")} />
        </div>
      </div>
    </div>
  )
}
