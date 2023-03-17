import { ReactNode, RefObject, useRef } from "react"
import { useNavigate } from "react-router-dom"
import TitleBar, { TitleBarButton } from "src/components/ui/TitleBar"
import LyricsController from "./components/LyricsFeed"
import { ActionButtons, ConfirmButtonWithModal, RecordButton } from "./components/RecordInteractions/ActionButtons"
import SideSettingsMenu from "./components/settings/SideSettingsMenu"
import useRecordings from "./hooks/useRecordings"
import { SuggestionSettingsProvider } from "./hooks/useSuggestionSettings"

type RecordingsControllerProps = {
  videoRef: RefObject<HTMLVideoElement>
  uiOpacity: number
  // selectedBeat: Beat
  // recordingType: "audio" | "video"
  children: ReactNode
}

const RecordingsController = ({
  videoRef,
  uiOpacity,
  // selectedBeat,
  // recordingType,
  children,
}: RecordingsControllerProps) => {
  const { takes, currentTake, startRecording, stopRecording, isRecording, recordingType } = useRecordings(
    // selectedBeat,
    // recordingType,
    videoRef
  )
  const renderRef = useRef<number>(0)

  const navigate = useNavigate()

  const navigateToPostRecording = () => {
    navigate("/post-recording", {
      state: {
        currentTake: currentTake,
        songTakes: takes,
        recordingType: recordingType,
      },
    })
  }

  console.log(renderRef.current++, "<RecordingsController /> -- Render test -- Layout 1")
  return (
    <div className="recording-booth__body" style={{ opacity: uiOpacity }}>
      {children}
      <ActionButtons
        recordButton={
          <RecordButton isRecording={isRecording} startRecording={startRecording} stopRecording={stopRecording} />
        }
        postButton={
          takes.length > 0 ? <ConfirmButtonWithModal src={currentTake?.audio} onNext={navigateToPostRecording} /> : null
        }
      />
    </div>
  )
}

const Title = () => {
  const renderRef = useRef<number>(0)
  console.log(
    renderRef.current++,
    "<TITLE /> -- Render test -- SHOULD RERENDER BEING UNDER SETTINGS PROVIDER UNFORTUNATELY"
  )
  return <p className="recording__title">Recording Booth</p>
}

export default function RecordingBooth() {
  const navigate = useNavigate()

  const renderRef = useRef<number>(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lyricsRef = useRef<string[][]>([])

  // console.log(renderRef.current++, "<RecordingBooth /> -- Render test -- Layer 0")
  return (
    <div className="RecordingVideo">
      <div className="record__video--wrapper">
        <video id="video-recorded" ref={videoRef} className="record__video" autoPlay playsInline muted />
      </div>

      <SuggestionSettingsProvider>
        <TitleBar
          title={<Title />}
          leftButton={<TitleBarButton type="Back" size={80} onClick={() => navigate(-1)} />}
        />

        <RecordingsController uiOpacity={1} videoRef={videoRef}>
          <LyricsController lyricsRef={lyricsRef} settingsMenu={<SideSettingsMenu />} />
        </RecordingsController>
      </SuggestionSettingsProvider>
    </div>
  )
}
