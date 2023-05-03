import { ReactNode, RefObject, useRef } from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import LyricsController from "./components/LyricsFeed"
import { ActionButtons, ConfirmButtonWithModal, RecordButton } from "./components/RecordInteractions/ActionButtons"
import SideSettingsMenu, { RecorderOptionButtons } from "./components/settings/SideSettingsMenu"
import useMediaRecorder from "./hooks/useMediaRecorder"
import { SongDraftsProvider } from "./hooks/useSongDrafts"
import { SuggestionSettingsProvider, useSuggestionSettingsContext } from "./hooks/useSuggestionSettings"

type RecordingsControllerProps = {
  videoRef: RefObject<HTMLVideoElement>
  children: ReactNode
}

const RecordingsController = ({ videoRef, children }: RecordingsControllerProps) => {
  const { selectedBeat, UIOpacity } = useSuggestionSettingsContext()

  const { isRecording, startRecording, stopRecording, mediaStreamConstraintsHandler } = useMediaRecorder({
    beat: selectedBeat.beat,
    videoRef: videoRef,
  })

  const renderRef = useRef<number>(0)

  console.log(renderRef.current++, "<RecordingsController /> -- Render test -- Layout 1")
  return (
    <div className="recording-booth__body" style={{ opacity: UIOpacity }}>
      {children}
      <SideSettingsMenu recorderConstraintButtons={<RecorderOptionButtons onClick={mediaStreamConstraintsHandler} />} />
      <ActionButtons
        recordButton={
          <RecordButton isRecording={isRecording} startRecording={startRecording} stopRecording={stopRecording} />
        }
        postButton={<ConfirmButtonWithModal />}
      />
    </div>
  )
}

export default function RecordingBooth() {
  const renderRef = useRef<number>(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  console.log(renderRef.current++, "<RecordingBooth /> -- Render test -- Layer 0")

  return (
    <div className="RecordingVideo">
      <div className="record__video--wrapper">
        <video id="video-recorded" ref={videoRef} className="record__video" autoPlay playsInline muted />
      </div>

      <SuggestionSettingsProvider>
        <SongDraftsProvider>
          <Header />

          <RecordingsController videoRef={videoRef}>
            <LyricsController />
          </RecordingsController>

          <Outlet />
        </SongDraftsProvider>
      </SuggestionSettingsProvider>
    </div>
  )
}
