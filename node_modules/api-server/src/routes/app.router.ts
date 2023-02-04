import { router } from "../utils/trpc"
import { authRouter } from "./auth.router"
import { commentsRouter } from "./comments.router"
import { followsRouter } from "./follows.router"
import { likesRouter } from "./likes.router"
import { songsRouter } from "./songs.router"
import { userRouter } from "./users.router"

export const appRouter = router({
  auth: authRouter,
  users: userRouter,
  songs: songsRouter,
  comments: commentsRouter,
  likes: likesRouter,
  follows: followsRouter,
})

export type AppRouter = typeof appRouter

// export const appRouter = mergeRouters(authRouter, userRouter, songsRouter, commentsRouter, likesRouter, followsRouter)
// .merge('auth.', authRouter)
// .merge('users.', userRouter)
// .merge('songs.', songsRouter)
// .merge('comments.', commentsRouter)
// .merge('likes.', likesRouter)
// .merge('follows.', followsRouter)
