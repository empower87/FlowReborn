"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = (0, zod_1.object)({
    username: (0, zod_1.string)().trim().min(5),
    password: (0, zod_1.string)(),
});
exports.RegisterSchema = (0, zod_1.object)({
    username: (0, zod_1.string)().trim().min(5),
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6),
});
