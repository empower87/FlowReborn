"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
require("dotenv").config({ path: path_1.default.join(__dirname, "../../.env") });
const customConfig = {
    port: 5000,
    accessTokenExpiresIn: 15,
    refreshTokenExpiresIn: 60,
    origin: ["http://localhost:3000", "http://10.0.0.82:3000", "https://flow-reborn.onrender.com"],
    dbUri: process.env.MONGODB_URI,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN,
};
exports.default = customConfig;
