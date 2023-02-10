import { Dispatch, PropsWithChildren, SetStateAction, useCallback } from "react"

type Fields = "Public" | "Personal" | "Social" | "Songs"

type SectionProps = PropsWithChildren<{
  title: Fields
  isExpanded: string
  onExpand: Dispatch<SetStateAction<string>>
  uploadPhoto?: JSX.Element
}>

export default function Section({ title, isExpanded, onExpand, uploadPhoto, children }: SectionProps) {
  const handleExpandCard = useCallback(
    (title: string) => {
      onExpand(title)
    },
    [onExpand]
  )

  return (
    <div className={`edit-section--shadow-inset ${title} ${isExpanded === title ? "expand-card" : "shrink-card"}`}>
      <div className="edit-section__header" onClick={() => handleExpandCard(title)}>
        <div className="edit-section__header--shadow-outset">
          <h3>{title}</h3>
        </div>
      </div>

      <div className="edit-section__error--container">{uploadPhoto}</div>

      <div className="edit-section__form--container">
        <div
          className="edit-section__form"
          style={title === "Songs" ? { borderRadius: "1.8em 1.8em 1.3em 1.3em" } : {}}
        >
          <ul className="edit-section__list">{children}</ul>
        </div>
      </div>
    </div>
  )
}
