import { forwardRef, MouseEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import useMobileKeyboardHandler from "src/hooks/useMobileKeyboardHandler"
import { IComment } from "../../../../../../server/src/models/Comment"
import useComments from "../hooks/useComments"

type InputType = "Comment" | "Edit" | "Reply" | "Hide"

interface ITextAreaProps {
  type: InputType
  comment: IComment | undefined | null
}

interface ITextInputModalProps extends ITextAreaProps {
  songId: string
}

const Photo = () => {
  const { user } = useAuth()
  return (
    <div className="comment-input__input-photo">
      <div className="comment-input__input-photo--bs-inset">
        <div className="comment-input__input-photo--bs-outset">
          <div className="comment-input__input-photo--wrapper">
            <UserPhoto photoUrl={user?.picture} username={user ? user.username : "A"} />
          </div>
        </div>
      </div>
    </div>
  )
}

const Button = ({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  return (
    <div className="comment-input__header">
      <div className="comment-input__btn">
        <button className="comment-input__btn--submit" type="submit" onClick={onClick}>
          <Icon type={ButtonTypes.Forward} options={{ color: "White", size: 80 }} />
        </button>
      </div>
    </div>
  )
}

const TextArea = forwardRef(({ type, comment }: ITextAreaProps, ref: any) => {
  const { handleOnFocus } = useMobileKeyboardHandler()
  const [text, setText] = useState<string>("")
  const [placeholder, setPlaceholder] = useState<string>("")

  useEffect(() => {
    if (ref) ref.current.focus()
  }, [ref, type, comment])

  useEffect(() => {
    // TODO: Fix bug where on setting of different input type Textarea remains size of previous input
    if (type === "Edit" && ref.current) {
      const height = ref.current.scrollHeight
      const fontPixels = 16 * 0.95 + 1
      ref.current.style.height = `${height - fontPixels}px`
    }
  }, [type, comment, text])

  useEffect(() => {
    switch (type) {
      case "Edit":
        if (!comment) return
        setText(comment.text)
        setPlaceholder("")
        break
      case "Reply":
        if (!comment) return
        setText("")
        setPlaceholder(`Reply to ${comment.user.username}..`)
        break
      case "Comment":
        setText("")
        setPlaceholder("Leave A Comment..")
        break
    }
  }, [type, comment])

  const expandTextarea = useCallback(
    (_text: EventTarget & HTMLTextAreaElement) => {
      setText(_text.value)
      _text.style.height = "inherit"
      const fontPixels = 16 * 0.95 + 1
      _text.style.height = `${_text.scrollHeight - fontPixels}px`
    },
    [type, comment, text]
  )

  return (
    <div className="comment-input__input--container">
      <textarea
        className="comment-input__input"
        ref={ref}
        placeholder={`${placeholder}`}
        value={text}
        onFocus={() => handleOnFocus()}
        onChange={(e) => expandTextarea(e.target)}
      />
    </div>
  )
})

export default function TextBox({ type, songId, comment }: ITextInputModalProps) {
  const root = document.getElementById("root")!
  const { addComment, editComment } = useComments()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    if (!inputRef.current) return
    if (type === "Edit" && comment) {
      editComment(comment._id, inputRef.current.value)
    } else if (type === "Reply" && comment) {
      addComment(comment._id, inputRef.current.value)
    } else {
      addComment(songId, inputRef.current.value)
    }
    e.preventDefault()
  }

  if (type === "Hide") return null
  return ReactDOM.createPortal(
    <div
      className="CommentInputModal"
      style={type ? { position: "fixed", display: "flex" } : { position: "relative", display: "none" }}
    >
      <form className="comment-input__form">
        <Photo />
        <TextArea type={type} comment={comment} ref={inputRef} />
        <Button onClick={(e) => onSubmit(e)} />
      </form>
    </div>,
    root
  )
}
