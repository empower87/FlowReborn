type Props = {
  addClass?: string, 
  margin?: number,
  isLoading?: boolean,
}
export default function Loading({ addClass, margin, isLoading } : Props) {
  return (
    <div 
      className={`Loading ${addClass}`}
      style={isLoading === true ? {opacity: "1"} : {opacity: "0"}}
    >
      <div className="loading-background" style={{marginTop: `${margin}`}}>
        <div className="loading_shadow-div-inset">
          <div className="loading_shadow-div-outset">
            <div className="loading-circle_shadow-div-inset">
              <div className="loading-circle_shadow-div-outset">
                <div className="loading-bubble-container">
                  <div className="bubble-traveller"></div>
                  <div className="loading-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}