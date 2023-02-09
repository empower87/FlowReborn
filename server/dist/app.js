import * as trpcExpress from "@trpc/server/adapters/express";
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import customConfig from "./config/default.js";
// import { appRouter } from "./routes/app.router"
import { authRouter } from "./routes/auth.router.js";
import { commentsRouter } from "./routes/comments.router.js";
import { followsRouter } from "./routes/follows.router.js";
import { likesRouter } from "./routes/likes.router.js";
import { songsRouter } from "./routes/songs.router.js";
import { userRouter } from "./routes/users.router.js";
import { createContext, router } from "./utils/trpc/index.js";
// const mongoose = require("mongoose")
dotenv.config({ path: path.join(__dirname, "./.env") });
export const appRouter = router({
    auth: authRouter,
    users: userRouter,
    songs: songsRouter,
    comments: commentsRouter,
    likes: likesRouter,
    follows: followsRouter,
});
const app = express();
app.use(cookieparser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
}));
app.use("/api/trpc", trpcExpress.createExpressMiddleware({ router: appRouter, createContext }));
const MONGODB_URI = customConfig.dbUri;
mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../client/build")));
app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});
const PORT = customConfig.port;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
//# sourceMappingURL=app.js.map