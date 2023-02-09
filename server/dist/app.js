"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpcExpress = __importStar(require("@trpc/server/adapters/express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose"
const path_1 = __importDefault(require("path"));
const default_1 = __importDefault(require("./config/default"));
// import { appRouter } from "./routes/app.router"
const auth_router_1 = require("./routes/auth.router");
const comments_router_1 = require("./routes/comments.router");
const follows_router_1 = require("./routes/follows.router");
const likes_router_1 = require("./routes/likes.router");
const songs_router_1 = require("./routes/songs.router");
const users_router_1 = require("./routes/users.router");
const trpc_1 = require("./utils/trpc");
const mongoose = require("mongoose");
dotenv_1.default.config({ path: path_1.default.join(__dirname, "./.env") });
exports.appRouter = (0, trpc_1.router)({
    auth: auth_router_1.authRouter,
    users: users_router_1.userRouter,
    songs: songs_router_1.songsRouter,
    comments: comments_router_1.commentsRouter,
    likes: likes_router_1.likesRouter,
    follows: follows_router_1.followsRouter,
});
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
    origin: default_1.default.origin,
    optionsSuccessStatus: 200,
}));
app.use("/api/trpc", trpcExpress.createExpressMiddleware({ router: exports.appRouter, createContext: trpc_1.createContext }));
const MONGODB_URI = default_1.default.dbUri;
mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build/")));
app.get("*", (req, res, next) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/build/index.html"));
});
const PORT = default_1.default.port;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
module.exports = app;
