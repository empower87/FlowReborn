import { LayoutTwo } from "src/components/layouts/LayoutWrappers"

type DetailsProps = {
  buttons: JSX.Element
  details: JSX.Element
  audioPlayer: JSX.Element
}

export default function DetailsLayout({ buttons, details, audioPlayer }: DetailsProps) {
  return (
    <div className="section-1c_song-details">
      <LayoutTwo classes={["song-details-1_actions", "actions_shadow-div-outset"]}>
        <LayoutTwo classes={["actions_shadow-div-inset", "action-btns-container"]}>{buttons}</LayoutTwo>
      </LayoutTwo>

      <LayoutTwo classes={["song-details-2_song-data", "song-data-container"]}>
        {details}
        {audioPlayer}
      </LayoutTwo>
    </div>
  )
}
