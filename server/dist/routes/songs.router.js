"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.songsRouter = void 0;
const zod_1 = __importDefault(require("zod"));
const songs_controllers_1 = require("../controllers/songs.controllers");
const songs_schema_1 = require("../schema/songs.schema");
const trpc_1 = require("../utils/trpc");
exports.songsRouter = (0, trpc_1.router)({
    createSong: trpc_1.publicProcedure
        .input(songs_schema_1.CreateSongSchema)
        // .output(SongSchema)
        .mutation(({ ctx, input }) => (0, songs_controllers_1.createSongHandler)({ ctx, input })),
    deleteSong: trpc_1.publicProcedure.input(songs_schema_1.SongInputSchema).mutation(({ ctx, input }) => (0, songs_controllers_1.deleteSongHandler)({ ctx, input })),
    updateSong: trpc_1.publicProcedure.input(songs_schema_1.UpdateSongSchema).mutation(({ ctx, input }) => (0, songs_controllers_1.updateSongHandler)({ ctx, input })),
    usersLikedSongs: trpc_1.publicProcedure
        .input(songs_schema_1.SongInputSchema)
        // .output(z.array(SongSchemaPopulatedUser))
        .query(({ ctx, input }) => (0, songs_controllers_1.getUsersLikedSongs)({ ctx, input })),
    usersFollowersSongs: trpc_1.publicProcedure
        .input(songs_schema_1.GetByFollowersSchema)
        // .output(z.array(SongSchemaPopulatedUser))
        .query(({ ctx, input }) => (0, songs_controllers_1.getUsersFollowersSongs)({ ctx, input })),
    getSong: trpc_1.protectedProcedure
        .input(songs_schema_1.SongInputSchema)
        // .output(SongSchema)
        .query(({ input }) => {
        return (0, songs_controllers_1.getSongHandler)({ input });
    }),
    getSongPopulated: trpc_1.protectedProcedure
        .input(songs_schema_1.SongInputSchema)
        // .output(SongSchemaPopulatedUserAndComments)
        .query(({ input }) => {
        return (0, songs_controllers_1.getSongWithPopulatedUserAndCommentsHandler)({ input });
    }),
    getSongPopulatedUser: trpc_1.protectedProcedure
        .input(songs_schema_1.SongInputSchema)
        // .output(SongSchemaPopulatedUser)
        .query(async ({ ctx, input }) => {
        return await (0, songs_controllers_1.getSongWithPopulatedUserHandler)({ ctx, input });
    }),
    usersSongs: trpc_1.protectedProcedure
        .input(songs_schema_1.SongInputSchema)
        // .output(z.array(SongSchemaPopulatedUser))
        .query(({ ctx, input }) => (0, songs_controllers_1.getUsersSongsHandler)({ ctx, input })),
    allSongs: trpc_1.publicProcedure
        // .output(z.array(SongSchemaPopulatedUserAndComments))
        .query(() => (0, songs_controllers_1.getAllSongsHandler)()),
    search: trpc_1.publicProcedure
        .input(zod_1.default.string())
        // .output(z.object({ users: z.array(UserSchema), songs: z.array(SongSchemaPopulatedUserAndComments) }))
        .mutation(async ({ ctx, input }) => await (0, songs_controllers_1.searchHandler)({ ctx, input })),
});
