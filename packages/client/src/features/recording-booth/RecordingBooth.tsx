import { ReactNode, RefObject, useRef } from "react"
import TitleBar from "src/components/ui/TitleBar"
import Header from "./components/Header"
import LyricsController from "./components/LyricsFeed"
import { ActionButtons, ConfirmButtonWithModal, RecordButton } from "./components/RecordInteractions/ActionButtons"
import { RhymeSuggestionPanelLayout } from "./components/RecordInteractions/RhymeSuggestionPanels"
import SideSettingsMenu from "./components/settings/SideSettingsMenu"
import useMediaRecorder from "./hooks/useMediaRecorder"
import { SongDraftsProvider, useSongDraftsContext } from "./hooks/useSongDrafts"
import { SuggestionSettingsProvider, useSuggestionSettingsContext } from "./hooks/useSuggestionSettings"

type RecordingsControllerProps = {
  videoRef: RefObject<HTMLVideoElement>
  children: ReactNode
}

const RecordingsController = ({ videoRef, children }: RecordingsControllerProps) => {
  const { allDrafts } = useSongDraftsContext()

  const { selectedBeat, UIOpacity, recordingType } = useSuggestionSettingsContext()

  const { isRecording, startRecording, stopRecording } = useMediaRecorder({
    beat: selectedBeat.beat,
    type: recordingType,
    videoRef: videoRef,
  })

  // const { takes, currentTake, startRecording, stopRecording, isRecording, recordingType } = useRecordings(
  //   videoRef,
  //   setSongDraftHandler
  // )

  const renderRef = useRef<number>(0)

  console.log(renderRef.current++, "<RecordingsController /> -- Render test -- Layout 1")
  return (
    <div className="recording-booth__body" style={{ opacity: UIOpacity }}>
      {children}
      <ActionButtons
        recordButton={
          <RecordButton isRecording={isRecording} startRecording={startRecording} stopRecording={stopRecording} />
        }
        postButton={allDrafts.length > 0 ? <ConfirmButtonWithModal /> : null}
      />
    </div>
  )
}

export default function RecordingBooth() {
  // const navigate = useNavigate()

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
        <SongDraftsProvider>
          <Header />
          <RecordingsController videoRef={videoRef}>
            <LyricsController lyricsRef={lyricsRef} settingsMenu={<SideSettingsMenu />} />
          </RecordingsController>
        </SongDraftsProvider>
      </SuggestionSettingsProvider>
    </div>
  )
}

export const RecordingBoothLoading = () => {
  return (
    <div className="RecordingVideo">
      <div className="record__video--wrapper"></div>

      <div className="recording__header--container">
        <TitleBar title={<p className="recording__title">loading..</p>} />
      </div>

      <div className="recording-booth__body">
        <div className="recording-video__actions--container">
          <div className="record__lyrics--container">
            <div className="lyrics__feed--container"></div>
          </div>
          <div className="recording-booth__side-menu">
            <div className="recording-booth__side-menu--bs-inset">
              <ul className="recording-booth__side-menu-list">
                <li className="recording-booth__side-menu-item">
                  <button className={`recording-booth__side-menu-btn `}></button>
                </li>
                <li className="recording-booth__side-menu-item">
                  <button className={`recording-booth__side-menu-btn `}></button>
                </li>
                <li className="recording-booth__side-menu-item">
                  <button className={`recording-booth__side-menu-btn `}></button>
                </li>
                <li className="recording-booth__side-menu-item">
                  <button className={`recording-booth__side-menu-btn `}></button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="suggestions">
          <div className="suggestions__transitionGroup">
            <RhymeSuggestionPanelLayout
              queryWord={<></>}
              buttons={<></>}
              rhymeName={<></>}
              text={
                <div className="rhyme-actions__suggestions-type-scroller">
                  <p className="rhyme-actions__scroll-text"></p>
                </div>
              }
            />
            <RhymeSuggestionPanelLayout
              queryWord={<></>}
              buttons={<></>}
              rhymeName={<></>}
              text={
                <div className="rhyme-actions__suggestions-type-scroller">
                  <p className="rhyme-actions__scroll-text"></p>
                </div>
              }
            />
            <RhymeSuggestionPanelLayout
              queryWord={<></>}
              buttons={<></>}
              rhymeName={<></>}
              text={
                <div className="rhyme-actions__suggestions-type-scroller">
                  <p className="rhyme-actions__scroll-text"></p>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
