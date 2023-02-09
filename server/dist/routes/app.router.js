"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../utils/trpc");
const auth_router_1 = require("./auth.router");
const comments_router_1 = require("./comments.router");
const follows_router_1 = require("./follows.router");
const likes_router_1 = require("./likes.router");
const songs_router_1 = require("./songs.router");
const users_router_1 = require("./users.router");
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    users: users_router_1.userRouter,
    songs: songs_router_1.songsRouter,
    comments: comments_router_1.commentsRouter,
    likes: likes_router_1.likesRouter,
    follows: follows_router_1.followsRouter,
});
// export const appRouter = mergeRouters(authRouter, userRouter, songsRouter, commentsRouter, likesRouter, followsRouter)
// .merge('auth.', authRouter)
// .merge('users.', userRouter)
// .merge('songs.', songsRouter)
// .merge('comments.', commentsRouter)
// .merge('likes.', likesRouter)
// .merge('follows.', followsRouter)
