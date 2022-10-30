import { model, Model, Schema } from "mongoose"

export interface IUser {
  _id: string
  email: string
  username: string
  google?: {
    googleId: string
    userPhoto: string
    userSignUpDate: Date
    given_name: string
    family_name: string
  }
  picture?: string
  firstName?: string
  lastName?: string
  about?: string
  location?: string
  socials?: {
    twitter: string
    instagram: string
    soundCloud: string
  }
  followers: string[]
  following: string[]
  createdOn?: Date
  updatedOn?: Date
}

interface IUserDocument extends IUser {
  password: string
}

const UserSchema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    picture: String,
    firstName: String,
    lastName: String,
    about: String,
    location: String,
    google: {
      googleId: String,
      userPhoto: String,
      userSignUpDate: Date,
      given_name: String,
      family_name: String,
    },
    socials: {
      twitter: String,
      instagram: String,
      soundCloud: String,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: { createdAt: "createdOn", updatedAt: "updatedOn" } }
)

type UserModelType = Model<IUserDocument>

export const User = model<IUserDocument, UserModelType>("User", UserSchema)
