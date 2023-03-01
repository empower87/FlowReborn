export const ResizeBar = ({ text, onClick }: { text?: JSX.Element; onClick?: () => void }) => {
  return (
    <div className="resize-bar__title--shadow-outset">
      {text}
      <div className="resize-bar__header-toggle-fullscreen">
        <div className="resize-bar__header-toggle-fullscreen--bs-inset">
          <button className="resize-bar__header-toggle-fullscreen-btn" onClick={onClick}></button>
        </div>
      </div>
    </div>
  )
}
