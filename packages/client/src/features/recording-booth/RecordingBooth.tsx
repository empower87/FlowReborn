import { ReactNode, RefObject, useRef, useState } from "react"
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
  const [recordDisabled, setRecordDisabled] = useState(false)

  const handleStartRecording = async () => {
    setRecordDisabled(true)
    await startRecording()
    setTimeout(() => setRecordDisabled(false), 1500)
  }

  const handleStopRecording = async () => {
    setRecordDisabled(true)
    await stopRecording()
    setTimeout(() => setRecordDisabled(false), 1000)
  }

  return (
    <div className="recording-booth__body" style={{ opacity: UIOpacity }}>
      {children}
      <SideSettingsMenu recorderConstraintButtons={<RecorderOptionButtons onClick={mediaStreamConstraintsHandler} />} />
      <ActionButtons
        recordButton={
          <RecordButton
            isRecording={isRecording}
            isDisabled={recordDisabled}
            startRecording={handleStartRecording}
            stopRecording={handleStopRecording}
          />
        }
        postButton={<ConfirmButtonWithModal />}
      />
    </div>
  )
}

export default function RecordingBooth() {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <div className="RecordingVideo">
      <div className="record__video--wrapper">
        <video id="video-recorded" ref={videoRef} className="record__video" autoPlay playsInline muted />
      </div>

      <SuggestionSettingsProvider>
        <SongDraftsProvider>
          <Header title={"Recording Booth"} />

          <RecordingsController videoRef={videoRef}>
            <LyricsController />
          </RecordingsController>

          <Outlet />
        </SongDraftsProvider>
      </SuggestionSettingsProvider>
    </div>
  )
}
