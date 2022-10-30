import { SubmitHandler, UseFormReturn } from "react-hook-form"
import InputError from "src/components/errors/InputError"
import { AccessTitleType } from "./Auth"
import AuthInput from "./AuthInput"
import useAuthForm, { IAuthFormInputs } from "./hooks/useAuthForm"

type AuthFormProps = {
  accessTitle: AccessTitleType
  methods: UseFormReturn<IAuthFormInputs, any>
  onSubmit: SubmitHandler<IAuthFormInputs>
  onReset: (name: keyof IAuthFormInputs) => void
}

const AuthForm = ({ accessTitle, methods, onSubmit, onReset }: AuthFormProps) => {
  return (
    <div className="user-login-3_form">
      <form className="login-form" onSubmit={methods.handleSubmit(onSubmit)}>
        {accessTitle === "Sign Up" ? (
          <div className="user-form-container">
            <AuthInput methods={methods} onClickHandler={onReset} name="username" placeholder="Username" />
            <AuthInput methods={methods} onClickHandler={onReset} name="email" placeholder="Email" />
            <AuthInput methods={methods} onClickHandler={onReset} name="password" placeholder="Password" />
          </div>
        ) : (
          <div className="user-form-container">
            <AuthInput
              methods={methods}
              onClickHandler={onReset}
              name="username"
              placeholder="Username"
              height={"40%"}
            />
            <AuthInput
              methods={methods}
              onClickHandler={onReset}
              name="password"
              placeholder="Password"
              height={"40%"}
            />
          </div>
        )}

        <div className="form__enter-btn--container">
          <button
            className="form__enter-btn"
            type="submit"
            onMouseDown={(e) => e.preventDefault()}
            onKeyDown={(e) => e.preventDefault()}
          >
            <h4>{accessTitle}</h4>
          </button>
        </div>
      </form>
    </div>
  )
}

export default function AuthFormProvider({ accessTitle }: Pick<AuthFormProps, "accessTitle">) {
  const { onSubmitHandler, onResetFieldHandler, methods, error, showError, setShowError } = useAuthForm(accessTitle)

  return (
    <>
      <InputError
        isOpen={showError}
        onClose={setShowError}
        message={error}
        options={{ position: [26, 13], size: [40, 74] }}
      />
      <AuthForm accessTitle={accessTitle} methods={methods} onSubmit={onSubmitHandler} onReset={onResetFieldHandler} />
    </>
  )
}
