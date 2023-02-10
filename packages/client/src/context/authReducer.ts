import { IUser } from "../../../server/src/models"

type State = {
  user: IUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

type Action = {
  type: string
  payload: {
    data: IUser
    token: string
  }
}

export const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.data,
      }
      break
    case "REFRESH":
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: state.token || action.payload.token ? true : false,
      }
    default:
      return state
  }
}
