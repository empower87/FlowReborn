import { IUser, User } from "../models/User"
import { UpdateUserInputType, UserInputType } from "../schema/user.schema"
import { Context, ContextWithInput, TRPCError } from "../utils/trpc"

export const getMeHandler = async ({ ctx }: { ctx: Context }) => {
  const user = ctx.user
  if (!user) throw TRPCError("INTERNAL_SERVER_ERROR", "you must be logged in")
  const getUser: IUser | null = await User.findOne({ username: user.username })
  if (!getUser) throw TRPCError("INTERNAL_SERVER_ERROR", "couldn't complete request")
  return getUser
}

export const getUserHandler = async ({ ctx, input }: ContextWithInput<UserInputType>) => {
  const user: IUser | null = await User.findOne({ _id: input._id })
  if (!user) throw TRPCError("BAD_REQUEST", "user not found")
  return user
}

export const updateUserHandler = async ({ ctx, input }: ContextWithInput<UpdateUserInputType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user is not authorized for this action")
  const user = await User.findOneAndUpdate({ username: ctx.user.username }, { $set: { ...input } }, { new: true })
  if (!user) throw TRPCError("BAD_REQUEST", "user not found")
  console.log(user, "this should have changed")
  return user
}
