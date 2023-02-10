import { UseFormReturn } from "react-hook-form"
import { ClearTextButton } from "src/components/buttons/ButtonClearText"
import useMobileKeyboardHandler from "src/hooks/useMobileKeyboardHandler"
import { IAuthFormInputs } from "./hooks/useAuthForm"

export default function AuthInput({
  name,
  methods,
  placeholder,
  onClickHandler,
  height,
}: {
  name: keyof IAuthFormInputs
  methods: UseFormReturn<IAuthFormInputs>
  placeholder: string
  onClickHandler: (name: keyof IAuthFormInputs) => void
  height?: string | undefined
}) {
  const { handleOnFocus } = useMobileKeyboardHandler()
  const { register, resetField, reset, formState, getFieldState, setFocus, clearErrors } = methods
  const { error, isDirty } = getFieldState(name, formState)

  // useEffect(() => {
  //   if (error && name) {
  //     setFocus(name)
  //   }
  // }, [formState, setFocus, name])

  // const onClickHandler = (_name: keyof IAuthFormInputs) => {
  // resetField(_name)
  // reset({ [_name]: "" })
  // clearErrors(_name)
  // }

  return (
    <div className="login-input-container" style={{ height: height }}>
      <div className={`login-input_shadow-div-outset ${name}`}>
        <div className="input-container">
          <input
            className={`login-input-field ${error ? "input-error" : ""}`}
            {...register(name)}
            placeholder={placeholder}
            autoComplete="off"
            type={name === "username" ? "text" : name}
            onFocus={() => handleOnFocus()}
          />
        </div>
        <ClearTextButton
          isTouched={isDirty}
          onClick={() => onClickHandler(name)}
          boxShadows={{
            outset: "1px 1px 3px #282828, -1px -1px 2px 0px #fbfbfb",
            inset: "inset 1px 1px 3px #282828, inset -1px -1px 2px 0px #ffffff",
          }}
          height={"100%"}
          position={[20, 20]}
        />
      </div>
    </div>
  )
}
