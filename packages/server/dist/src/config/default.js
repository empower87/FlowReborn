import dotenv from "dotenv";
// import { fileURLToPath } from "url"
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.resolve()
// dotenv.config({ path: path.join(__dirname, "../../.env") })
dotenv.config();
// dotenv.config()
// require("dotenv").config({ path: path.join(__dirname, "../../.env") })
const customConfig = {
    port: 5000,
    accessTokenExpiresIn: 15,
    refreshTokenExpiresIn: 60,
    origin: ["http://localhost:3000", "https://flow-reborn.vercel.app"],
    dbUri: process.env.MONGODB_URI,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN,
};
export default customConfig;
//# sourceMappingURL=default.js.map