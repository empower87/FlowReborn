import { User } from "../models/User.js"
import { FollowInputType } from "../schema/follows.schema.js"
import { ContextWithInput, TRPCError } from "../utils/trpc/index.js"

export const followHandler = async ({ ctx, input }: ContextWithInput<FollowInputType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user not authorized to comment")
  const { follower, following } = input

  const me = await User.findById(follower)
  const user = await User.findById(following)

  if (!me || !user) throw TRPCError("INTERNAL_SERVER_ERROR", "user not found")

  if (ctx.user.username === user.username) throw TRPCError("BAD_REQUEST", "you can not follow yourself")

  if (me.following.includes(following) || user.followers.includes(follower))
    throw TRPCError("BAD_REQUEST", "you already following this user")

  const updateMe = await me.updateOne({ $push: { following: following } })
  const updateUser = await user.updateOne({
    $push: { followers: follower },
  })

  return updateUser
}

export const unfollowHandler = async ({ ctx, input }: ContextWithInput<FollowInputType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user not authorized to comment")
  const { follower, following } = input

  const me = await User.findById(follower)
  const user = await User.findById(following)

  if (!me || !user) throw TRPCError("INTERNAL_SERVER_ERROR", "user not found")

  if (ctx.user.username === user.username) throw TRPCError("BAD_REQUEST", "you can not unfollow yourself")

  if (!me.following.includes(following) || !user.followers.includes(follower))
    throw TRPCError("BAD_REQUEST", "you already following this user")

  const updateMe = await me.updateOne({ $pull: { following: following } })
  const updateUser = await user.updateOne({
    $pull: { followers: follower },
  })

  return updateUser
}
