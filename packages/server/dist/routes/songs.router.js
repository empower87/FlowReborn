import z from "zod";
import { createSongHandler, deleteSongHandler, getAllSongsHandler, getSongHandler, getSongWithPopulatedUserAndCommentsHandler, getSongWithPopulatedUserHandler, getUsersFollowersSongs, getUsersLikedSongs, getUsersSongsHandler, searchHandler, updateSongHandler, } from "../controllers/songs.controllers.js";
import { CreateSongSchema, GetByFollowersSchema, SongInputSchema, UpdateSongSchema } from "../schema/songs.schema.js";
import { protectedProcedure, publicProcedure, router } from "../utils/trpc/index.js";
export const songsRouter = router({
    createSong: publicProcedure
        .input(CreateSongSchema)
        // .output(SongSchema)
        .mutation(({ ctx, input }) => createSongHandler({ ctx, input })),
    deleteSong: publicProcedure.input(SongInputSchema).mutation(({ ctx, input }) => deleteSongHandler({ ctx, input })),
    updateSong: publicProcedure.input(UpdateSongSchema).mutation(({ ctx, input }) => updateSongHandler({ ctx, input })),
    usersLikedSongs: publicProcedure
        .input(SongInputSchema)
        // .output(z.array(SongSchemaPopulatedUser))
        .query(({ ctx, input }) => getUsersLikedSongs({ ctx, input })),
    usersFollowersSongs: publicProcedure
        .input(GetByFollowersSchema)
        // .output(z.array(SongSchemaPopulatedUser))
        .query(({ ctx, input }) => getUsersFollowersSongs({ ctx, input })),
    getSong: protectedProcedure
        .input(SongInputSchema)
        // .output(SongSchema)
        .query(({ input }) => {
        return getSongHandler({ input });
    }),
    getSongPopulated: protectedProcedure
        .input(SongInputSchema)
        // .output(SongSchemaPopulatedUserAndComments)
        .query(({ input }) => {
        return getSongWithPopulatedUserAndCommentsHandler({ input });
    }),
    getSongPopulatedUser: protectedProcedure
        .input(SongInputSchema)
        // .output(SongSchemaPopulatedUser)
        .query(async ({ ctx, input }) => {
        return await getSongWithPopulatedUserHandler({ ctx, input });
    }),
    usersSongs: protectedProcedure
        .input(SongInputSchema)
        // .output(z.array(SongSchemaPopulatedUser))
        .query(({ ctx, input }) => getUsersSongsHandler({ ctx, input })),
    allSongs: publicProcedure
        // .output(z.array(SongSchemaPopulatedUserAndComments))
        .query(() => getAllSongsHandler()),
    search: publicProcedure
        .input(z.string())
        // .output(z.object({ users: z.array(UserSchema), songs: z.array(SongSchemaPopulatedUserAndComments) }))
        .mutation(async ({ ctx, input }) => await searchHandler({ ctx, input })),
});
//# sourceMappingURL=songs.router.js.map