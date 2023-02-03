import { Types } from "mongoose"
import z, { date, object, string } from "zod"

const GoogleUser = object({
  googleId: string(),
  userPhoto: string(),
  userSignUpDate: date(),
  given_name: string(),
  family_name: string(),
})
const GoogleUserClient = GoogleUser.omit({
  userSignUpDate: true,
}).extend({ userSignUpDate: z.string() })

const Socials = object({
  twitter: string().optional(),
  instagram: string().optional(),
  soundCloud: string().optional(),
})
export const UserSchemaFromClient = object({
  _id: string(),
  email: string().email(),
  google: GoogleUserClient.optional(),
  picture: string().optional(),
  firstName: string().optional(),
  lastName: string().optional(),
  about: string().optional(),
  location: string().optional(),
  socials: Socials.optional(),
  followers: string().array().default([]),
  following: string().array().default([]),
  createdOn: string().optional(),
  updatedOn: string().optional(),
})

export const UserSchema = object({
  // _id: string(),
  _id: z.instanceof(Types.ObjectId),
  username: string(),
  email: string().email(),
  google: GoogleUser.optional(),
  picture: string().optional(),
  firstName: string().optional(),
  lastName: string().optional(),
  about: string().optional(),
  location: string().optional(),
  socials: Socials.optional(),
  followers: string().array().default([]),
  following: string().array().default([]),
  createdOn: date().optional(),
  updatedOn: date().optional(),
})

const UpdateUserInput = UserSchema.omit({
  _id: true,
  username: true,
  email: true,
  google: true,
  followers: true,
  following: true,
})

export const UserInputSchema = z.object({ _id: z.string() })
export const UpdateUserInputSchema = UpdateUserInput.extend({
  username: string().optional(),
  email: string().email().optional(),
})

type UserSchemaType = z.infer<typeof UserSchema>
type GoogleUserType = z.infer<typeof GoogleUser>

export type UserInputType = z.infer<typeof UserInputSchema>
export type UpdateUserInputType = z.infer<typeof UpdateUserInputSchema>
