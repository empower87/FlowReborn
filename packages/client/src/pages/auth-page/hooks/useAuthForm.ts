import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAuth } from "src/context/AuthContext"
import { AccessTitleType } from "../Auth"
import { LoginInputClientSchema, RegisterInputClientSchema } from "../utils/validation"

export interface IAuthFormInputs {
  username: string
  email?: string | undefined
  password: string
}

export default function useAuthForm(type: AccessTitleType) {
  const { login, register, error, setError } = useAuth()
  const [showError, setShowError] = useState<boolean>(false)
  const [accessTitle, setAccessTitle] = useState<AccessTitleType>("Log In")

  const methods = useForm<IAuthFormInputs>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: accessTitle === "Sign Up" ? zodResolver(RegisterInputClientSchema) : zodResolver(LoginInputClientSchema),
  })

  const onSubmitHandler: SubmitHandler<IAuthFormInputs> = (data: IAuthFormInputs) => {
    if (accessTitle === "Sign Up" && data && data.email) {
      register({ ...data, email: data.email })
    } else {
      login(data)
    }
  }

  const onResetFieldHandler = (_name: keyof IAuthFormInputs) => {
    methods.resetField(_name)
  }

  useEffect(() => {
    setAccessTitle(type)
  }, [type])

  useEffect(() => {
    if (error !== "") {
      setShowError(true)
    }
  }, [error])

  useEffect(() => {
    // methods.reset()
    methods.setValue("username", "")
    methods.setValue("password", "")
    methods.clearErrors()
    setError("")
    setShowError(false)
  }, [accessTitle])

  useEffect(() => {
    const errors = methods.formState.errors
    const touchedFields = methods.formState.touchedFields

    if (errors.username?.message && touchedFields.username === true) {
      setError(errors.username.message)
      methods.setFocus("username")
    } else if (errors.email?.message && touchedFields.email === true) {
      setError(errors.email.message)
      methods.setFocus("email")
    } else if (errors.password?.message && touchedFields.password === true) {
      setError(errors.password.message)
      methods.setFocus("password")
    }
  }, [methods.formState, error, type])

  return {
    methods,
    onSubmitHandler,
    onResetFieldHandler,
    error,
    showError,
    setShowError,
  }
}
