import { useParams } from "react-router-dom"
import Navbar from "src/components/navbar/Navbar"
import SongFeeds from "./components/SongFeeds/SongFeeds"
import UserData from "./components/UserData/UserData"
import UserHeader from "./components/UserData/UserHeader"
import useProfileUser from "./hooks/useProfileUser"

function Profile() {
  const { id } = useParams()
  const { thisUser, isLoading } = useProfileUser(id)

  if (!thisUser || isLoading) return <p>loading..</p>
  return (
    <div className="Profile">
      <div className="section-1_profile">
        <UserHeader username={thisUser.username} picture={thisUser.picture} id={thisUser ? thisUser._id : ""} />
        <UserData user={thisUser} />
      </div>
      <SongFeeds user={thisUser} />
      <Navbar pageClass={"NavBarProfile"} />
    </div>
  )
}

export default Profile
