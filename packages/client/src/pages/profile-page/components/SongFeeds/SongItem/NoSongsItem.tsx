export default function NoSongsItem() {
  return (
    <li className="profile-songs__item">
      <div className="profile-songs__body">
        <div className="profile-songs__header">
          <div className="profile-songs__header--shadow-outset">
            <div className="profile-songs__title">
              <p className="profile-songs__title-text" style={{ fontWeight: "bold", fontSize: "14px" }}>
                User hasn't saved any Flows
              </p>
            </div>
          </div>
        </div>

        <div className="profile-songs__lyrics">
          <div className="profile-songs__lyrics--shadow-outset">
            <div className="profile-songs__lyrics-text"></div>
          </div>
        </div>
      </div>
      <div className="profile-songs__action-btns--container">
        <div className="buttons-inner"></div>
      </div>
    </li>
  )
}
