import { useEffect, useReducer, useState } from "react"
import { useAuth } from "src/context/AuthContext"
import { editUserReducer, INITIAL_STATE } from "./editUserReducer"

export default function useEditUser() {
  const { user } = useAuth()
  const [state, dispatch] = useReducer(editUserReducer, INITIAL_STATE)
  const [isReset, setIsReset] = useState<boolean>(false)

  useEffect(() => {
    if (!user) return
    dispatch({ type: "SET_USER", payload: { user: { ...user } } })
  }, [user])

  const setSelectedFields = (type: string, fieldInputs: [string, string, string]) => {
    switch (type) {
      case "Public":
        dispatch({
          type: "SET_FIELDS",
          payload: {
            byField: {
              type: "Public",
              values: [...fieldInputs],
            },
          },
        })
        break
      case "Personal":
        dispatch({
          type: "SET_FIELDS",
          payload: {
            byField: {
              type: "Personal",
              values: [...fieldInputs],
            },
          },
        })
        break
      case "Social":
        dispatch({
          type: "SET_FIELDS",
          payload: {
            byField: {
              type: "Social",
              values: [...fieldInputs],
            },
          },
        })
        break
    }
  }

  const resetHandler = () => {
    if (!user) return
    dispatch({ type: "SET_USER", payload: { user: { ...user } } })
  }

  return { state, dispatch, setSelectedFields, resetHandler, isReset }
}
