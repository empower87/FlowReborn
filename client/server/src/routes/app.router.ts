import { createRouter } from '../utils/trpc'
import { authRouter } from './auth.router'
import { userRouter } from './users.router'
import { songsRouter } from './songs.router'
import { commentsRouter } from './comments.router'
import { likesRouter } from './likes.router'
import { followsRouter } from './follows.router'

export const appRouter = createRouter()
  .merge('auth.', authRouter)
  .merge('users.', userRouter)
  .merge('songs.', songsRouter)
  .merge('comments.', commentsRouter)
  .merge('likes.', likesRouter)
  .merge('follows.', followsRouter)

export type AppRouter = typeof appRouter
