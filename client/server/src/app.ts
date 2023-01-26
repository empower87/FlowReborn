import * as trpcExpress from "@trpc/server/adapters/express"
import bodyParser from "body-parser"
import cookieparser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express, { Application, NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import path from "path"
import customConfig from "./config/default"
import { appRouter } from "./routes/app.router"
import { createContext } from "./utils/trpc"

dotenv.config({ path: path.join(__dirname, "./.env") })
const app: Application = express()

const MONGODB_URI = customConfig.dbUri
mongoose
  .connect(MONGODB_URI)
  .then((x: any) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err: any) => console.error("Error connecting to mongo", err))

app.use(cookieparser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(
  cors({
    credentials: true,
    origin: customConfig.origin,
    optionsSuccessStatus: 200,
  })
)
app.use("/api/trpc", trpcExpress.createExpressMiddleware({ router: appRouter, createContext }))
app.use(express.static(path.join(__dirname, "../../client/build")))

const PORT = customConfig.port

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"))
})

app.listen(PORT, () => console.log(`Listening to port ${PORT}`))
