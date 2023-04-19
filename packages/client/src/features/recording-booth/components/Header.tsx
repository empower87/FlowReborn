import { useRef } from "react"
import { useNavigate } from "react-router-dom"
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
  const navigate = useNavigate()
  const { UIOpacity } = useSuggestionSettingsContext()
  return (
    <div className="recording__header--container" style={{ opacity: UIOpacity }}>
      <TitleBar title={<Title />} leftButton={<TitleBarButton type="Back" size={80} onClick={() => navigate(-1)} />} />
    </div>
  )
}
