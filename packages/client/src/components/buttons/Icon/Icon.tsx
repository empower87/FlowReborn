import {
  addVideoIcon,
  checkIcon,
  closeIcon,
  commentIcon,
  deleteIcon,
  editIcon,
  expandIcon,
  followersIcon,
  followIcon,
  followingIcon,
  forwardIcon,
  fullscreenIcon,
  goBackIcon,
  homeIcon,
  landscapeIcon,
  lockedIcon,
  logOutIcon,
  micIcon,
  noVideoIcon,
  opacityIcon,
  pauseIcon,
  playIcon,
  plusIcon,
  portraitIcon,
  previousIcon,
  profileIcon,
  redoIcon,
  saveIcon,
  searchIcon,
  selectArrowDownIcon,
  selectArrowUpIcon,
  sendIcon,
  settingsIcon,
  shuffleIcon,
  songIcon,
  standardIcon,
  stopIcon,
  thumbsUpIcon,
  undoIcon,
  videoRecordIcon,
  volumeMutedIcon,
  volumeUpIcon,
} from "src/assets/images/_icons"

// export enum ButtonTypes {
//   AddVideo = "AddVideo",
//   Back = "Back",
//   Check = "Check",
//   Close = "Close",
//   Comment = "Comment",
//   Delete = "Delete",
//   Down = "Down",
//   Edit = "Edit",
//   Expand = "Expand",
//   Follow = "Follow",
//   Followers = "Followers",
//   Following = "Following",
//   Forward = "Forward",
//   Fullscreen = "Fullscreen",
//   Home = "Home",
//   Like = "Like",
//   Locked = "Locked",
//   Logout = "Logout",
//   Next = "Next",
//   NoVideo = "NoVideo",
//   Pause = "Pause",
//   Play = "Play",
//   Plus = "Plus",
//   Previous = "Previous",
//   Profile = "Profile",
//   Opacity = "Opacity",
//   Reply = "Reply",
//   Record = "Record",
//   Save = "Save",
//   Search = "Search",
//   Settings = "Settings",
//   Shuffle = "Shuffle",
//   Stop = "Stop",
//   Songs = "Songs",
//   Up = "Up",
//   Standard = "Standard",
//   Landscape = "Landscape",
//   Portrait = "Portrait",
//   VideoRecord = "VideoRecord",
//   VolumeUp = "VolumeUp",
//   VolumeMute = "VolumeMute",
//   Undo = "Undo",
//   Redo = "Redo",
// }
export type ButtonTypes =
  | "AddVideo"
  | "Back"
  | "Check"
  | "Close"
  | "Comment"
  | "Delete"
  | "Down"
  | "Edit"
  | "Expand"
  | "Follow"
  | "Followers"
  | "Following"
  | "Forward"
  | "Fullscreen"
  | "Home"
  | "Like"
  | "Locked"
  | "Logout"
  | "Next"
  | "NoVideo"
  | "Pause"
  | "Play"
  | "Plus"
  | "Previous"
  | "Profile"
  | "Opacity"
  | "Reply"
  | "Record"
  | "Save"
  | "Search"
  | "Settings"
  | "Shuffle"
  | "Stop"
  | "Songs"
  | "Up"
  | "Standard"
  | "Landscape"
  | "Portrait"
  | "VideoRecord"
  | "VolumeUp"
  | "VolumeMute"
  | "Undo"
  | "Redo"

const getButtonIcon = (type: ButtonTypes) => {
  switch (type) {
    case "Back":
      return goBackIcon
    case "Close":
      return closeIcon
    case "Edit":
      return editIcon
    case "Save":
      return saveIcon
    case "Delete":
      return deleteIcon
    case "Like":
      return thumbsUpIcon
    case "Follow":
      return followIcon
    case "Followers":
      return followersIcon
    case "Following":
      return followingIcon
    case "Comment":
      return commentIcon
    case "Reply":
      return commentIcon
    case "Home":
      return homeIcon
    case "Record":
      return micIcon
    case "Stop":
      return stopIcon
    case "Search":
      return searchIcon
    case "Profile":
      return profileIcon
    case "Shuffle":
      return shuffleIcon
    case "Locked":
      return lockedIcon
    case "Down":
      return selectArrowDownIcon
    case "Up":
      return selectArrowUpIcon
    case "Expand":
      return expandIcon
    case "Check":
      return checkIcon
    case "Forward":
      return sendIcon
    case "Previous":
      return previousIcon
    case "Next":
      return forwardIcon
    case "Standard":
      return standardIcon
    case "Landscape":
      return landscapeIcon
    case "Portrait":
      return portraitIcon
    case "Logout":
      return logOutIcon
    case "Songs":
      return songIcon
    case "VideoRecord":
      return videoRecordIcon
    case "Plus":
      return plusIcon
    case "Opacity":
      return opacityIcon
    case "Play":
      return playIcon
    case "Pause":
      return pauseIcon
    case "VolumeUp":
      return volumeUpIcon
    case "VolumeMute":
      return volumeMutedIcon
    case "Fullscreen":
      return fullscreenIcon
    case "Settings":
      return settingsIcon
    case "AddVideo":
      return addVideoIcon
    case "NoVideo":
      return noVideoIcon
    case "Undo":
      return undoIcon
    case "Redo":
      return redoIcon
  }
}

type IconOptions = {
  color: "White" | "Primary" | "Gray"
  size?: number
  margin?: string
}

export const Icon = ({ type, options }: { type: ButtonTypes; options: IconOptions }) => {
  const size = options?.size ? `${options.size}%` : undefined
  const icon = getButtonIcon(type)
  return (
    <div className="Icon__wrapper">
      <img
        className={`Icon ${options.color}`}
        style={{ height: size, width: size, margin: options?.margin }}
        src={icon}
        alt="icon"
      />
    </div>
  )
}
