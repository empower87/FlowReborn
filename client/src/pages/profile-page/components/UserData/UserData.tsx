import { IUser } from "../../../../../../server/src/models/User"
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
