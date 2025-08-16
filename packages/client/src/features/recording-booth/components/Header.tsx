import { useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import TitleBar, { TitleBarButton } from "src/components/ui/TitleBar"
import { useSuggestionSettingsContext } from "../hooks/useSuggestionSettings"

type HeaderProps = {
  title: string
}
export default function Header({ title }: HeaderProps) {
  const location = useLocation()
  const currentPath = location.pathname
  const navigate = useNavigate()
  const { UIOpacity } = useSuggestionSettingsContext()

  const navigationHandler = useCallback(() => {
    if (currentPath.includes("recording-booth/post-recording")) {
      navigate("/recording-booth/confirm-recording")
    } else if (currentPath.includes("recording-booth/confirm-recording")) {
      navigate("/recording-booth")
    } else {
      navigate("/")
    }
  }, [navigate, currentPath])

  return (
    <div className="recording__header--container" style={{ opacity: UIOpacity }}>
      <TitleBar
        title={<p className="recording__title">{title}</p>}
        leftButton={<TitleBarButton type="Back" size={80} onClick={() => navigationHandler()} />}
      />
    </div>
  )
}
