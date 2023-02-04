export default function LoadingHome() {
  return (
    <div className="LoadingHome">
      <div className="loading-home__header"></div>
      <div className="loading-home__video"></div>
      <div className="loading-home__body">
        <div className="body__social-buttons"></div>
        <div className="body__song-details"></div>
        <LoadingNavbar />
      </div>
    </div>
  )
}

function LoadingNavbar() {
  return <div className="skeleton-navbar"></div>
}

export function LoadingSongPage() {
  return (
    <div className="LoadingSong">
      <div className="loading-song__header">
        <div className="loading-song__header--bs-outset">
          <div className="loading-song__header--bs-inset">
            <div className="song-header__button--container">
              <div className="song-header__button"></div>
            </div>
            <div className="song-header__details">
              <div className="song-header__details--bs-outset"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="loading-song__video"></div>
      <div className="loading-song__body">
        <div className="song-body__play">
          <div className="song-body__play--bs-inset">
            <div className="song-body__play--bs-outset">
              <div className="song-body__play-btn">
                <div className="song-body__navigate">
                  <div className="song-body__navigate-btn"></div>
                </div>
                <div className="song-body__play-btn--container">
                  <div className="song-body__play-btn--bs-inset"></div>
                </div>
                <div className="song-body__navigate">
                  <div
                    className="song-body__navigate-btn"
                    style={{ borderRadius: '0.2em 1.3em 0.2em 0.2em' }}
                  ></div>
                </div>
              </div>

              <div className="song-body__play-slider">
                <div className="song-body__play-slider--bs-inset">
                  <div className="song-body__play-slider--bs-outset"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="song-body__social-buttons">
          <div className="song-body__social-buttons--bs-outset">
            <div className="song-body__social-buttons--bs-inset">
              <div className="song-body__social-button">
                <div
                  className="song-body__social-button--bs-outset"
                  style={{ borderRadius: '0.25em 0.25em 0.25em 1.5em' }}
                ></div>
              </div>
              <div className="song-body__social-button">
                <div className="song-body__social-button--bs-outset"></div>
              </div>
              <div className="song-body__social-button">
                <div
                  className="song-body__social-button--bs-outset"
                  style={{ borderRadius: '0.25em 0.25em 1.5em 0.25em' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
