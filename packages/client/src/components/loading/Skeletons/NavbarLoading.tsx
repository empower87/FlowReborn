const NavbarButtonLoading = () => {
  return (
    <div className="navbar-btn-container">
      <div className="navbar-btn_shadow-div-inset"></div>
    </div>
  )
}

export const NavbarLoading = () => {
  return (
    <div className="Navbar">
      <div className="navbar__upper">
        <div className="navbar__upper--bs-outset">
          <div className="navbar__upper--bs-inset">
            <NavbarButtonLoading />
            <NavbarButtonLoading />
            <NavbarButtonLoading />
            <NavbarButtonLoading />
          </div>
        </div>
      </div>
      <div className="navbar__lower">
        {/* <NavbarButtonTitle title="" />
        <NavbarButtonTitle title="" />
        <NavbarButtonTitle title="" />
        <NavbarButtonTitle title="" /> */}
      </div>
    </div>
  )
}
