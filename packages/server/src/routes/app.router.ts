import { router } from "../utils/trpc/index.js"
import { authRouter } from "./auth.router.js"
import { commentsRouter } from "./comments.router.js"
import { followsRouter } from "./follows.router.js"
import { likesRouter } from "./likes.router.js"
import { songsRouter } from "./songs.router.js"
import { userRouter } from "./users.router.js"

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
