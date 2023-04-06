import TitleBar from "src/components/ui/TitleBar"
import { RhymeSuggestionPanelLayout } from "./RecordInteractions/RhymeSuggestionPanels"

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
