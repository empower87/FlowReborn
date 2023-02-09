import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, "../../.env") })
// dotenv.config()
// require("dotenv").config({ path: path.join(__dirname, "../../.env") })

const customConfig = {
  port: 5000,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  origin: ["http://localhost:3000", "http://10.0.0.82:3000", "https://flow-reborn.onrender.com"],
  dbUri: process.env.MONGODB_URI as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN as string,
}

export default customConfig
