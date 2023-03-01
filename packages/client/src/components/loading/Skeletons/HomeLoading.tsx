import { NavbarLoading } from "./NavbarLoading"

const HeaderButtonLoading = () => {
  return (
    <div className="each-feed_shadow-div-inset">
      <div className="each-feed_shadow-div-outset">
        <div className="each-feed_shadow-div-inset-2"></div>
      </div>
    </div>
  )
}

export const HomeLoadingSkeleton = () => {
  return (
    <div className="Home Loading">
      <div className="section-1a_toggle-feed">
        <div className="toggle-feed-container">
          <HeaderButtonLoading />
          <HeaderButtonLoading />
          <HeaderButtonLoading />
        </div>
      </div>

      <NavbarLoading />
    </div>
  )
}
