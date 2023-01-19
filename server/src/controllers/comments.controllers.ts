import { Comment, IComment, ISong, IUser, Song } from "../models/index"
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
  const comment = await Comment.create(input)

  let songPush = await Song.findOne({ _id: input.parent })
  let commentPush = await Comment.findOne({ _id: input.parent })

  if (songPush) {
    songPush.update({ $push: { comments: comment } }, { new: true }).exec()
    await songPush.save()
    console.log(songPush, "SONGPUSH: MUST HAVE ADDED A COMMENT")
    return songPush
  } else if (commentPush) {
    commentPush.update({ $push: { replies: comment } }, { new: true }).exec()
    await commentPush.save()
    console.log(commentPush, "COMMENTPUSH: MUST HAVE REPLIED TO A COMMENT")

    return commentPush
  }
}

export const editCommentHandler = async ({ ctx, input }: ContextWithInput<EditCommentType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user not authorized to comment")
  const getComment = await Comment.findById(input._id)

  if (getComment && getComment.text === input.text) return TRPCError("BAD_REQUEST", "comment hasn't been edited")
  const updatedComment = await Comment.findByIdAndUpdate(input._id, {
    $set: { text: input.text, editedOn: new Date() },
  })
  // const updatedSong = await Song.findByIdAndUpdate(
  //   { _id: input.parent, "comments._id": input._id },
  //   { $set: { updatedComment } },
  //   { new: true }
  // )
  //   .populate<{ user: IUser }>("user")
  //   .populate<{ comments: ISong["comments"] }>({ path: "comments", populate: "user" })
  return updatedComment
}

export const deleteCommentHandler = async ({ ctx, input }: ContextWithInput<DeleteCommentType>) => {
  if (!ctx.user) throw TRPCError("UNAUTHORIZED", "user not authorized to comment")
  const deletedComment = await Comment.findOneAndDelete({ _id: input._id })

  const song = await Song.findById(input.parent)
  if (song) {
    song
      .update({ $pull: { comments: { _id: input._id } } }, { new: true })
      .populate<{ user: IUser }>("user")
      .populate<{ comments: ISong["comments"] }>({ path: "comments", populate: "user" })
    console.log(song, "ok so it was a comment")
    return song
  } else {
    const comment = await Comment.findByIdAndUpdate(
      input.parent,
      { $pull: { replies: { _id: input._id } } },
      { new: true }
    )
      .populate<{ user: IUser }>("user")
      .populate<{ replies: IComment["replies"] }>({ path: "replies", populate: "user" })
    if (comment) {
      const id = comment.parent._id ? comment.parent._id : (comment.parent as unknown as string)
      const updateSong = await Song.findById(id).populate<{ comments: ISong["comments"] }>("comments")
      if (updateSong) {
        const updatedComments = updateSong.comments.map((each) => {
          if (each._id === comment?._id) {
            return comment
          } else {
            return each
          }
        })
        console.log(updateSong, updatedComments, "DID WE FIND THE PARENT SONG?????")
        updateSong.update({ comments: updatedComments }, { new: true })
      }
      console.log(comment, updateSong, "ok so it was a reply")
      return updateSong
    }
  }
  // const updatedSong = await Song.findByIdAndUpdate(
  //   input.parent,
  //   { $pull: { comments: { _id: input._id } } },
  //   { new: true }
  // )
  //   .populate<{ user: IUser }>("user")
  //   .populate<{ comments: ISong["comments"] }>({ path: "comments", populate: "user" })
  // return updatedSong
}
