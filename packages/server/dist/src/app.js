import * as trpcExpress from "@trpc/server/adapters/express";
import cookieparser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { default as bodyParser, default as express } from "express";
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
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("directory-name", __dirname);
console.log(path.join(__dirname, "../../../client/build", "index.html"));
// const __dirname = path.resolve()
// dotenv.config({ path: path.join(__dirname, "./.env") })
dotenv.config();
export const appRouter = router({
    auth: authRouter,
    users: userRouter,
    songs: songsRouter,
    comments: commentsRouter,
    likes: likesRouter,
    follows: followsRouter,
});
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(cors({
    credentials: true,
    origin: customConfig.origin,
    optionsSuccessStatus: 200,
}));
app.use("/api/trpc", trpcExpress.createExpressMiddleware({ router: appRouter, createContext }));
app.use(express.static(path.join(__dirname, "../../../client/build")));
app.get("*", (req, res, next) => {
    if (req.originalUrl.startsWith("/api/"))
        return next();
    res.sendFile(path.join(__dirname, "../../../client/build/index.html"));
});
const MONGODB_URI = customConfig.dbUri;
mongoose
    .connect(MONGODB_URI)
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error("Error connecting to mongo", err));
const PORT = customConfig.port;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
// exports.module = app
//# sourceMappingURL=app.js.map