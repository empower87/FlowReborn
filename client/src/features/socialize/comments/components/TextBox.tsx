import { forwardRef, MouseEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import LoadingSpinner from "src/components/loading/LoadingSpinner"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import useMobileKeyboardHandler from "src/hooks/useMobileKeyboardHandler"
import { IComment } from "../../../../../../server/src/models/Comment"
import { InputTypes } from "../hooks/commentInputMenuReducer"
import useComments from "../hooks/useComments"

interface ITextAreaProps {
  type: InputTypes
  comment: IComment | undefined | null
}

interface ITextInputModalProps extends ITextAreaProps {
  // songId: string
  // dispatch: CommentDispatch
  // update: (type: "Comment" | "Edit" | "Delete", data: IComment | undefined) => void
  onClose: (e: MouseEvent<HTMLDivElement>) => void
  onSubmit: (e: MouseEvent<HTMLButtonElement>, text: string | undefined) => void
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

const Button = ({ onClick, isLoading }: { onClick: MouseEventHandler<HTMLButtonElement>; isLoading: boolean }) => {
  return (
    <div className="comment-input__header">
      <div className="comment-input__btn">
        <button className="comment-input__btn--submit" type="submit" onClick={onClick}>
          {isLoading ? <LoadingSpinner /> : <Icon type={ButtonTypes.Forward} options={{ color: "White", size: 80 }} />}
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
    if (type === "EDIT" && ref.current) {
      const height = ref.current.scrollHeight
      const fontPixels = 16 * 0.95 + 1
      ref.current.style.height = `${height - fontPixels}px`
    }
  }, [type, comment, text])

  useEffect(() => {
    switch (type) {
      case "EDIT":
        if (!comment) return
        setText(comment.text)
        setPlaceholder("")
        break
      case "REPLY":
        if (!comment) return
        setText("")
        setPlaceholder(`Reply to ${comment.user.username}..`)
        break
      case "OPEN_REPLY_MENU":
        if (!comment) return
        setText("")
        setPlaceholder(`Reply to ${comment.user.username}..`)
        break
      case "COMMENT":
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

export default function TextBox({ type, comment, onClose, onSubmit }: ITextInputModalProps) {
  const root = document.getElementById("root")!
  const { addComment, editComment, error, isLoading, data } = useComments()
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
  //   if (!inputRef.current) return
  //   if (type === "EDIT" && comment) {
  //     editComment(comment._id, inputRef.current.value)
  //     update("Edit", data)
  //   } else if (type === "REPLY" && comment) {
  //     addComment(comment._id, inputRef.current.value)
  //   } else {
  //     addComment(songId, inputRef.current.value)
  //     update("Comment", data)
  //   }
  //   e.preventDefault()
  // }

  // const onClose = (e: MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) {
  //     dispatch({ type: "HIDE" })
  //   }
  // }

  if (type === "HIDE") return null
  return ReactDOM.createPortal(
    <div className="CommentInputModal" onClick={(e) => onClose(e)}>
      <div className="comment-input__form--container">
        <form className="comment-input__form">
          <Photo />
          <TextArea type={type} comment={comment} ref={inputRef} />
          <Button onClick={(e) => onSubmit(e, inputRef.current?.value)} isLoading={isLoading} />
        </form>
      </div>
    </div>,
    root
  )
}
