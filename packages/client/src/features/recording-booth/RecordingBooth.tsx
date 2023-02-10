import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header, { Title } from "./components/Header"
import LyricsFeed from "./components/LyricsFeed"
import { ActionButton, ActionButtons, RecordButton } from "./components/RecordInteractions/ActionButtons"
import RhymeSuggestionPanels from "./components/RecordInteractions/RhymeSuggestionPanels"
import SideSettingsMenu from "./components/settings/SideSettingsMenu"
import ViewFullscreenVideo from "./components/ViewFullscreenVideo"
import useRecordings from "./hooks/useRecordings"
import useSuggestionSettings from "./hooks/useSuggestionSettings"

export default function RecordingBooth() {
  const navigate = useNavigate()
  const { state, dispatch } = useSuggestionSettings()
  const { selectedBeat, recordingType } = state
  const { takes, currentTake, startRecording, stopRecording, isRecording, minutes, seconds, videoRef } = useRecordings(
    selectedBeat,
    recordingType
  )
  const [showFullscreenVideo, setShowFullscreenVideo] = useState<boolean>(false)

  const navigateToPostRecording = () => {
    navigate("/post-recording", {
      state: {
        currentTake: currentTake,
        songTakes: takes,
        recordingType: recordingType,
      },
    })
  }

  return (
    <div className="RecordingVideo">
      <div className="record__video--wrapper">
        <video id="video-recorded" ref={videoRef} className="record__video" autoPlay playsInline muted />
      </div>

      <ViewFullscreenVideo
        src={currentTake?.audio}
        isOpen={showFullscreenVideo}
        onClose={setShowFullscreenVideo}
        onNext={navigateToPostRecording}
      />

      <Header
        type="Close"
        opacity={state.UIOpacity}
        onClose={() => navigate(-1)}
        title={<Title isRecording={isRecording} minutes={minutes} seconds={seconds} />}
      />

      <div className="recording-booth__body" style={{ opacity: state.UIOpacity }}>
        <div className="recording-video__actions--container">
          <div className="record__lyrics--container">
            <LyricsFeed
              // songLyrics={currentTake?.lyrics ? currentTake.lyrics : null}
              isRecording={isRecording}
            />
          </div>
          <SideSettingsMenu state={state} dispatch={dispatch} />
        </div>

        <RhymeSuggestionPanels categoryList={state.rhymeSuggestionPanels} numofRhymes={state.numOfRhymeSuggestions}>
          <ActionButtons
            recordButton={
              <RecordButton isRecording={isRecording} startRecording={startRecording} stopRecording={stopRecording} />
            }
            postButton={
              takes.length > 0 ? (
                <ActionButton type="Check" size={110} onClick={() => setShowFullscreenVideo(true)} />
              ) : (
                <></>
              )
            }
          />
        </RhymeSuggestionPanels>
      </div>
    </div>
  )
}
