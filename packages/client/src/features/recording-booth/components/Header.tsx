import { useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import TitleBar, { TitleBarButton } from "src/components/ui/TitleBar"
import { useSuggestionSettingsContext } from "../hooks/useSuggestionSettings"

const Title = () => {
  const renderRef = useRef<number>(0)
  console.log(
    renderRef.current++,
    "<TITLE /> -- Render test -- SHOULD RERENDER BEING UNDER SETTINGS PROVIDER UNFORTUNATELY"
  )
  return <p className="recording__title">Recording Booth</p>
}

export default function Header() {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const { UIOpacity } = useSuggestionSettingsContext()

  const navigationHandler = () => {
    if (currentPath.includes("post-recording")) {
      navigate(-1)
    } else {
      navigate("/")
    }
  }

  return (
    <div className="recording__header--container" style={{ opacity: UIOpacity }}>
      <TitleBar
        title={<Title />}
        leftButton={<TitleBarButton type="Back" size={80} onClick={() => navigationHandler()} />}
      />
    </div>
  )
}
