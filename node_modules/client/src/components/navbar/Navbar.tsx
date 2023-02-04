import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ButtonTypes, Icon } from "../buttons/Icon/Icon"

type Props = {
  pageClass?: String
  isVisible?: Boolean
}

export default function Navbar({ pageClass, isVisible }: Props) {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname

  const navigateToPage = (to: string) => {
    navigate(to)
  }

  return (
    <div className={`Navbar ${pageClass}`}>
      <div className="navbar__upper">
        <div className="navbar__upper--bs-outset">
          <div className="navbar__upper--bs-inset">
            <NavbarButton onClick={navigateToPage} path={"/"} selected={path} size={80} />
            <NavbarButton onClick={navigateToPage} path={"/recording-booth"} selected={path} size={70} />
            <NavbarButton onClick={navigateToPage} path={"/search"} selected={path} size={80} />
            <NavbarButton
              onClick={navigateToPage}
              path={user?._id ? `/profile/${user?._id}` : "/auth"}
              selected={path}
              size={75}
            />
          </div>
        </div>
      </div>
      <div className="navbar__lower">
        <NavbarButtonTitle title="Home" />
        <NavbarButtonTitle title="Record" />
        <NavbarButtonTitle title="Search" />
        <NavbarButtonTitle title="Profile" />
      </div>
    </div>
  )
}

const getButtonType = (path: string) => {
  switch (path) {
    case "/":
      return ButtonTypes.Home
    case "/recording-booth":
      return ButtonTypes.Record
    case "/search":
      return ButtonTypes.Search
    default:
      return ButtonTypes.Profile
  }
}

const NavbarButtonTitle = ({ title }: { title: string }) => {
  return (
    <div className="navbar__lower-title">
      <p className="navbar__lower-title-text">{title}</p>
    </div>
  )
}

const NavbarButton = ({
  path,
  onClick,
  selected,
  size,
}: {
  path: string
  onClick: any
  selected: string
  size?: number
}) => {
  const type = getButtonType(path)
  const isSelected = path === selected ? "btn-selected" : ""

  return (
    <div className="navbar-btn-container">
      <button className={`navbar-btn_shadow-div-inset ${isSelected}`} onClick={() => onClick(path)}>
        <Icon type={ButtonTypes[type]} options={{ color: "Primary", size: size }} />
      </button>
    </div>
  )
}
