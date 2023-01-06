import { ReactNode } from "react"

export const CommentList = ({ children }: { children: ReactNode }) => {
  return (
    <div className="comments__list--shadow-outset">
      <div className="comments__list--shadow-inset">
        <ul className="comments__list">{children}</ul>
      </div>
    </div>
  )
}
