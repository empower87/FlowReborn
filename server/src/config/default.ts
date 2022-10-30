import path from "path"
require("dotenv").config({ path: path.join(__dirname, "../../.env") })

const customConfig = {
  port: 5000,
  accessTokenExpiresIn: 15,
  refreshTokenExpiresIn: 60,
  origin: ["http://localhost:3000", "http://10.0.0.82:3000", "https://iron-flow.herokuapp.com"],

  dbUri: process.env.MONGODB_URI as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN as string,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN as string,
}

export default customConfig
