import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { ButtonTypes } from "../buttons/Icon/Icon"
import { BtnColorsEnum, RoundButton } from "../buttons/RoundButton/RoundButton"
import { LayoutTwo } from "../layouts/LayoutWrappers"

type Props = {
  pageClass?: String
  isVisible?: Boolean
}

export default function Navbar({ pageClass, isVisible }: Props) {
  const { user } = useAuth()
  const location = useLocation()
  const path = location.pathname

  return (
    <LayoutTwo classes={[`NavBar ${pageClass}`, "navbar_section"]}>
      <LayoutTwo classes={["navbar_shadow-div-outset", "navbar_shadow-div-inset"]}>
        <NavBarButton state={{}} path={"/"} selected={path} />
        <NavBarButton state={{}} path={"/recording-booth"} selected={path} />
        <NavBarButton state={{}} path={"/search"} selected={path} />
        <NavBarButton state={{}} path={user?._id ? `/profile/${user?._id}` : "/auth"} selected={path} />
      </LayoutTwo>
    </LayoutTwo>
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

const NavBarButton = ({ state = {}, path, selected }: { state: {}; path: string; selected: string }) => {
  const type = getButtonType(path)
  const isSelected = path === selected ? "btn-selected" : "btn-unselected"

  return (
    <Link to={path} className={`navbar-btn-container ${type}--navbar ${isSelected}`} state={state}>
      <div className="navbar-btn_shadow-div-inset">
        <RoundButton
          type={type}
          btnOptions={{ bgColor: BtnColorsEnum.Initial, offset: 8 }}
          iconOptions={{ color: "White", size: 75 }}
        />
      </div>
      <div className="navbar-btn-text">{type}</div>
    </Link>
  )
}
