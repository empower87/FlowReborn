import z from "zod"
import {
  createSongHandler,
  deleteSongHandler,
  getAllSongsHandler,
  getSongHandler,
  getUsersFollowersSongs,
  getUsersLikedSongs,
  getUsersSongsHandler,
  searchHandler,
  updateSongHandler,
} from "../controllers/songs.controllers"
import { CreateSongSchema, GetByFollowersSchema, SongInputSchema, UpdateSongSchema } from "../schema/songs.schema"
import { createRouter, TRPCError } from "../utils/trpc"

export const songsRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.user) {
      throw TRPCError("UNAUTHORIZED", "you must be logged in to access this resource")
    }
    return next()
  })
  .mutation("create-song", {
    input: CreateSongSchema,
    resolve: async ({ ctx, input }) => createSongHandler({ ctx, input }),
  })
  .mutation("delete-song", {
    input: SongInputSchema,
    resolve: async ({ ctx, input }) => deleteSongHandler({ ctx, input }),
  })
  .mutation("update-song", {
    input: UpdateSongSchema,
    resolve: async ({ ctx, input }) => updateSongHandler({ ctx, input }),
  })
  .query("users-liked-songs", {
    input: SongInputSchema,
    resolve: async ({ ctx, input }) => await getUsersLikedSongs({ ctx, input }),
  })
  .query("users-followers-songs", {
    input: GetByFollowersSchema,
    resolve: async ({ ctx, input }) => await getUsersFollowersSongs({ ctx, input }),
  })
  .query("get-song", {
    input: SongInputSchema,
    resolve: async ({ ctx, input }) => await getSongHandler({ ctx, input }),
  })
  .query("users-songs", {
    input: SongInputSchema,
    resolve: async ({ ctx, input }) => await getUsersSongsHandler({ ctx, input }),
  })
  .query("all-songs", {
    resolve: async () => await getAllSongsHandler(),
  })
  .mutation("search", {
    input: z.string(),
    resolve: async ({ ctx, input }) => await searchHandler({ ctx, input }),
  })

export type SongsRouter = typeof songsRouter
