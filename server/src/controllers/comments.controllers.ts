import { Comment, IComment, IUser, Song } from "../models/index"
import { CreateCommentType, DeleteCommentType, EditCommentType, GetCommentByIdType } from "../schema/comments.schema"
import { ContextWithInput, TRPCError } from "../utils/trpc"

export const getComment = async ({ ctx, input }: ContextWithInput<GetCommentByIdType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user not authorized to get comment")

  const getComment = await Comment.findOne({ _id: input._id })
    .populate<{ user: IUser }>("user")
    .populate<{ replies: IComment["replies"] }>({ path: "replies", populate: "user" })
  console.log(getComment, "is this hydrated???")

  return getComment
}

export const createCommentHandler = async ({ ctx, input }: ContextWithInput<CreateCommentType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user not authorized to comment")
  const createdComment = await Comment.create(input)

  if (!createdComment) throw TRPCError("INTERNAL_SERVER_ERROR", "couldn't create comment in database")

  if (input.parent === input.songId) {
    const updateSong = await Song.findByIdAndUpdate(
      input.songId,
      { $push: { comments: createdComment } },
      { new: true }
    )
    return createdComment
  } else {
    const updateComment = await Comment.findByIdAndUpdate(
      input.parent,
      { $push: { replies: createdComment } },
      { new: true }
    )
      .populate<{ user: IUser }>("user")
      .populate<{ replies: IComment["replies"] }>({ path: "replies", populate: "user" })
    return updateComment
  }
}

export const editCommentHandler = async ({ ctx, input }: ContextWithInput<EditCommentType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user not authorized to comment")
  const getComment = await Comment.findById(input._id)

  if (!getComment) throw TRPCError("NOT_FOUND", "comment not found. Bad/invalid request data")
  if (getComment.text === input.text) return TRPCError("BAD_REQUEST", "comment hasn't been edited")

  getComment.update({ $set: { text: input.text, editedOn: new Date() } }, { new: true }).exec()
  await getComment.save()

  // if (getComment.parent._id === input.songId) {
  //   return getComment
  // } else {
  //   const getParentComment = await Comment.findById(getComment.parent._id)
  //     .populate<{ user: IUser }>("user")
  //     .populate<{ replies: IComment["replies"] }>({ path: "replies", populate: "user" })
  //   return getParentComment
  // }
  return getComment
}

export const deleteCommentHandler = async ({ ctx, input }: ContextWithInput<DeleteCommentType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user not authorized to comment")

  var ObjectId = require("mongoose").Types.ObjectId
  const deletedComment = Comment.findOneAndDelete({ _id: input._id })

  if (input.parent === input.songId) {
    const song = await Song.findByIdAndUpdate(
      input.songId,
      { $pull: { comments: new ObjectId(input._id) } },
      { new: true }
    )

    return deletedComment
  } else {
    const updatedComment = await Comment.findByIdAndUpdate(
      input.parent,
      { $pull: { replies: new ObjectId(input._id) } },
      { new: true }
    )

    return updatedComment
  }
}
