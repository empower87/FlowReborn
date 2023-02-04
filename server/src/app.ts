import * as trpcExpress from "@trpc/server/adapters/express"
import bodyParser from "body-parser"
import cookieparser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express, { Application, NextFunction, Request, Response } from "express"
// import mongoose from "mongoose"
import path from "path"
import customConfig from "./config/default"
// import { appRouter } from "./routes/app.router"
import { authRouter } from "./routes/auth.router"
import { commentsRouter } from "./routes/comments.router"
import { followsRouter } from "./routes/follows.router"
import { likesRouter } from "./routes/likes.router"
import { songsRouter } from "./routes/songs.router"
import { userRouter } from "./routes/users.router"
import { createContext, router } from "./utils/trpc"

export const appRouter = router({
  auth: authRouter,
  users: userRouter,
  songs: songsRouter,
  comments: commentsRouter,
  likes: likesRouter,
  follows: followsRouter,
})

export type AppRouter = typeof appRouter

const mongoose = require("mongoose")

dotenv.config({ path: path.join(__dirname, "./.env") })
const app: Application = express()

const MONGODB_URI = customConfig.dbUri
mongoose
  .connect(MONGODB_URI)
  .then((x: any) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err: any) => console.error("Error connecting to mongo", err))

app.use(
  cors({
    credentials: true,
    origin: customConfig.origin,
    optionsSuccessStatus: 200,
  })
)
app.use(cookieparser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"))
})

app.use(express.static(path.join(__dirname, "client/build")))
app.use("/api/trpc", trpcExpress.createExpressMiddleware({ router: appRouter, createContext }))

const PORT = customConfig.port

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
