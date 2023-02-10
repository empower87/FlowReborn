import { IUser } from "src/types/ServerModelTypes"
import Buttons from "./Buttons"
import Fields from "./Fields"

export default function UserData({ user }: { user: IUser }) {
  return (
    <div className="section-1b_user-data">
      <Buttons thisUser={user} />
      <Fields user={user} />
    </div>
  )
}
