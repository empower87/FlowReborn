import { useCallback, useState } from "react"
import { useLocation } from "react-router-dom"
import { ISongTake } from "src/features/recording-booth/utils/types"
// import { ISong } from "../../../../server/src/models/Song"
import { ISongPopulatedUser as ISong } from "src/types/ServerModelTypes"
import { downIcon } from "../../assets/images/_icons"
import { Beat, beatList } from "../../constants/index"
import { EditLyricsAudioPlayer } from "./components/EditLyricsAudioPlayer"
import EditLyricsBeatSelect from "./components/EditLyricsBeatSelect"
import EditLyricsButtonMenu, { ActionButton } from "./components/EditLyricsButtonMenu"
import EditLyricsHeader from "./components/EditLyricsHeader"
import EditLyricsList from "./components/EditLyricsList"
import useEditLyrics, { useSongLyrics } from "./hooks/useEditLyrics"

type LocationPropTypes = {
  allSongs: ISong[] | ISongTake[]
  currentSong: ISong | ISongTake
}

export default function EditLyrics() {
  const location = useLocation()
  const state = location.state as LocationPropTypes
  const [currentBeat, setCurrentBeat] = useState<Beat>(beatList[0])
  const { songs, initialLyricsHistory } = useSongLyrics({ _songs: state.allSongs })
  const {
    currentSong,
    setCurrentSong,
    currentLyrics,
    setCurrentLyricsList,
    checkForEditedLyrics,
    onUndo,
    onRedo,
    onReset,
    onSave,
    canUndo,
    canRedo,
    onDeleteLyric,
    onSaveLyric,
    onAddLyric,
  } = useEditLyrics({
    _songs: songs,
    _initialLyrics: initialLyricsHistory,
    _currentSong: state.currentSong,
  })

  const mapMiniLyrics = useCallback(() => {
    return currentLyrics?.lyrics.map((each, index: number) => {
      return (
        <div className="display-each-container" key={each?.id}>
          <p className="bar-no">{index + 1}</p>
          {each?.array?.map((e, i) => {
            return (
              <p className="each-word" key={`${e}and${i}`}>
                {e}
              </p>
            )
          })}
        </div>
      )
    })
  }, [currentLyrics?.lyrics])

  const onAdd = () => {
    onAddLyric(currentLyrics.songId)
  }

  return (
    <div className="EditLyrics">
      <EditLyricsHeader currentSong={currentSong} setCurrentSong={setCurrentSong} allSongs={songs} />

      <EditLyricsList
        currentLyrics={currentLyrics}
        setLyricsHistory={setCurrentLyricsList}
        checkForEditedLyrics={checkForEditedLyrics}
        onDeleteLyric={onDeleteLyric}
        onSaveLyric={onSaveLyric}
      />

      <div className="section-3_controls">
        <div className="controls-container">
          <EditLyricsButtonMenu>
            <ActionButton type="Reset" onClick={onReset} />
            <ActionButton type="Undo" onClick={onUndo} isClickable={canUndo} color={"Gray"} size={70} />
            <ActionButton type="Redo" onClick={onRedo} isClickable={canRedo} color={"Gray"} size={70} />
            <ActionButton type="Plus" onClick={onAdd} color={"Primary"} size={70} />
            <ActionButton type="Save" onClick={onSave} />
          </EditLyricsButtonMenu>

          <EditLyricsAudioPlayer currentSong={currentSong} />
          <EditLyricsBeatSelect currentBeat={currentBeat} setCurrentBeat={setCurrentBeat} />
        </div>
      </div>

      <div className="section-4_display-lyrics">
        <div className="display-lyrics-container">{mapMiniLyrics()}</div>
        <div className="menu-down-container">
          <button className="menu-down-btn">
            <img className="button-icons" src={downIcon} alt="menu down" />
          </button>
        </div>
      </div>
    </div>
  )
}
