// import { IUser } from "../../../../../server/src/models"
import { IUser } from "src/types/ServerModelTypes"

export const INITIAL_STATE = {
  picture: "",
  username: "",
  about: "",
  location: "",
  email: "",
  firstName: "",
  lastName: "",
  socials: {
    instagram: "",
    twitter: "",
    soundCloud: "",
  },
}

type Action = {
  type: "CHANGE_INPUT" | "SET_USER" | "SET_FIELDS"
  payload: Payload
}
type Fields = "Public" | "Personal" | "Social" | "Songs"

type Payload = {
  input?: { key: string; value: string }
  user?: IUser
  byField?: { type: Fields; values: [string, string, string] }
}

const saveFields = (type: Fields, state: typeof INITIAL_STATE, values: [string, string, string]) => {
  switch (type) {
    case "Public":
      return { ...state, username: values[0], about: values[1], location: values[2] }
    case "Personal":
      return { ...state, email: values[0], firstName: values[1], lastName: values[2] }
    case "Social":
      return { ...state, socials: { instagram: values[0], twitter: values[1], soundCloud: values[2] } }
    default:
      return state
  }
}

export const editUserReducer = (state: typeof INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      if (!action.payload.input) return state
      return {
        ...state,
        [action.payload.input.key]: action.payload.input.value,
      }
    case "SET_USER":
      if (!action.payload.user) return state
      const { picture, username, about, location, email, firstName, lastName, socials } = action.payload.user
      return {
        picture: picture ?? "",
        username: username,
        about: about ?? "",
        location: location ?? "",
        email: email,
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        socials: {
          instagram: socials?.instagram ?? "",
          twitter: socials?.twitter ?? "",
          soundCloud: socials?.soundCloud ?? "",
        },
      }
    case "SET_FIELDS":
      if (!action.payload.byField) return state
      const params = action.payload.byField
      return saveFields(params.type, state, params.values)
    default:
      return state
  }
}
