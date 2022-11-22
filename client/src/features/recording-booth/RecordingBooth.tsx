import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header, { Title } from "./components/Header"
import LyricsFeed from "./components/LyricsFeed"
import { BottomButtons, RecordButton } from "./components/RecordInteractions/RecordButtons"
import RhymeSuggestionPanels from "./components/RecordInteractions/RhymeSuggestionPanels"
import SideSettingsMenu from "./components/settings/SideSettingsMenu"
import useRecordings from "./hooks/useRecordings"
import useSuggestionSettings from "./hooks/useSuggestionSettings"

export default function RecordingBooth() {
  const navigate = useNavigate()
  const { state, dispatch } = useSuggestionSettings()
  const { selectedBeat, recordingType } = state
  const {
    takes,
    currentTake,
    setCurrentTake,
    startRecording,
    stopRecording,
    deleteTake,
    isRecording,
    minutes,
    seconds,
    videoRef,
  } = useRecordings(selectedBeat, recordingType)

  const [showPostRecording, setShowPostRecording] = useState<boolean>(false)

  const navigateToPostRecording = () => {
    navigate("/post-recording", {
      state: {
        isOpen: showPostRecording,
        onClose: setShowPostRecording,
        currentTake: currentTake,
        setCurrenTake: setCurrentTake,
        onDelete: deleteTake,
        songTakes: takes,
        recordingType: recordingType,
      },
    })
  }
  return (
    <div className="RecordingVideo">
      {/* <PostRecording
        isOpen={showPostRecording}
        onClose={setShowPostRecording}
        onDelete={deleteTake}
        currentTake={currentTake}
        setCurrentTake={setCurrentTake}
        songTakes={takes}
        recordingType={recordingType}
      /> */}
      <div className="record__video--wrapper">
        <video id="video-recorded" ref={videoRef} className="record__video" autoPlay playsInline muted />
      </div>

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
          <BottomButtons songTakes={takes} showPostRecording={setShowPostRecording} goToPost={navigateToPostRecording}>
            <RecordButton isRecording={isRecording} startRecording={startRecording} stopRecording={stopRecording} />
          </BottomButtons>
        </RhymeSuggestionPanels>
      </div>
    </div>
  )
}
