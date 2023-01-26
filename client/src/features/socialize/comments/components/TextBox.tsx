import { forwardRef, MouseEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { ButtonTypes, Icon } from "src/components/buttons/Icon/Icon"
import { InputErrorNoModal } from "src/components/errors/InputError"
import LoadingSpinner from "src/components/loading/LoadingSpinner"
import { UserPhoto } from "src/components/user-photo/UserPhoto"
import { useAuth } from "src/context/AuthContext"
import useMobileKeyboardHandler from "src/hooks/useMobileKeyboardHandler"
import { IComment } from "../../../../../../server/src/models/Comment"
import { InputTypes } from "../hooks/commentInputMenuReducer"
import { ErrorType } from "../hooks/useComments"

interface ITextAreaProps {
  inputType: InputTypes
  comment: IComment | undefined | null
}

interface ITextInputModalProps extends ITextAreaProps {
  onClose: (type: "HIDE_INPUT") => void
  onSubmit: (text: string | undefined) => void
  isLoading: boolean
  error: ErrorType
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

const TextArea = forwardRef(({ inputType, comment }: ITextAreaProps, ref: any) => {
  const { handleOnFocus } = useMobileKeyboardHandler()
  const [text, setText] = useState<string>(inputType === "OPEN_EDIT_INPUT" && comment ? comment?.text : "")
  const placeholder =
    inputType === "OPEN_COMMENT_INPUT"
      ? "Leave a comment..."
      : inputType === "OPEN_EDIT_INPUT"
      ? ""
      : `Reply to ${comment?.user.username}...`

  useEffect(() => {
    if (ref) ref.current.focus()
  }, [ref, inputType, comment])

  useEffect(() => {
    // TODO: Fix bug where on setting of different input type Textarea remains size of previous input
    if (inputType === "OPEN_EDIT_INPUT" && ref.current) {
      const height = ref.current.scrollHeight
      const fontPixels = 16 * 0.95 + 1
      ref.current.style.height = `${height - fontPixels}px`
    }
  }, [inputType, comment, text])

  const expandTextarea = useCallback(
    (_text: EventTarget & HTMLTextAreaElement) => {
      setText(_text.value)
      _text.style.height = "inherit"
      const fontPixels = 16 * 0.95 + 1
      _text.style.height = `${_text.scrollHeight - fontPixels}px`
    },
    [inputType, comment, text]
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

export default function TextBox({ inputType, comment, onClose, onSubmit, isLoading, error }: ITextInputModalProps) {
  const root = document.getElementById("root")!
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isError, setIsError] = useState<boolean>(false)

  const handleCloseInput = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose("HIDE_INPUT")
    }
  }

  const handleOnSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    onSubmit(inputRef.current?.value)
    e.preventDefault()
  }

  useEffect(() => {
    if (error.target) {
      setIsError(true)
      setTimeout(() => {
        setIsError(false)
      }, 5000)
    } else {
      setIsError(false)
    }
  }, [isLoading, error])

  if (inputType === "HIDE_INPUT") return null
  return ReactDOM.createPortal(
    <div className="CommentInputModal" onClick={(e) => handleCloseInput(e)}>
      <div className="comment-input__form--container">
        <form className="comment-input__form">
          <div className={`comment-input__error ${isError ? "show-error" : ""}`}>
            <InputErrorNoModal
              isOpen={isError}
              onClose={setIsError}
              message={error.message}
              options={{ position: [2, 1.5], size: [36, 97] }}
            />
          </div>
          <div className="comment-input__body">
            <Photo />
            <TextArea inputType={inputType} comment={comment} ref={inputRef} />
            <Button onClick={(e) => handleOnSubmit(e)} isLoading={isLoading} />
          </div>
        </form>
      </div>
    </div>,
    root
  )
}
