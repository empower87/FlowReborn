import dotenv from "dotenv"
// import { fileURLToPath } from "url"

// const __filename = fileURLToPath(import.meta.url)

// const __dirname = path.resolve()
// dotenv.config({ path: path.join(__dirname, "../../.env") })
dotenv.config()
// dotenv.config()
// require("dotenv").config({ path: path.join(__dirname, "../../.env") })

const customConfig = {
  port: 5000,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  origin: ["http://localhost:3000", "https://flow-reborn.onrender.com"],
  dbUri: process.env.MONGODB_URI as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN as string,
}
// const customConfig = {
//   port: 5000,
//   accessTokenExpiresIn: 15,
//   refreshTokenExpiresIn: 60,
//   origin: ["http://localhost:3000", "https://flow-reborn.vercel.app"],
//   dbUri: process.env.MONGODB_URI as string,
//   accessTokenPrivateKey: process.env.ACCESS_TOKEN as string,
//   refreshTokenPrivateKey: process.env.REFRESH_TOKEN as string,
// }

export default customConfig
