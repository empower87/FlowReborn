"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToAWS = exports.UploadInputSchema = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const zod_1 = __importDefault(require("zod"));
const trpc_1 = require("../utils/trpc");
aws_sdk_1.default.config.update({
    region: "us-west-1",
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
});
const S3_BUCKET = process.env.Bucket;
const UploadInputObjectSchema = zod_1.default.object({
    fileName: zod_1.default.string(),
    fileType: zod_1.default.string(),
    fileBlob: zod_1.default.any(),
});
exports.UploadInputSchema = zod_1.default.array(UploadInputObjectSchema);
const uploadFileToAWS = async ({ ctx, input }) => {
    if (!ctx.user)
        throw (0, trpc_1.TRPCError)("INTERNAL_SERVER_ERROR", "you must be logged in");
    const s3 = new aws_sdk_1.default.S3();
    const params = (object) => {
        return {
            Bucket: S3_BUCKET,
            Key: object.fileName,
            Expires: 1000,
            ContentType: object.fileType,
            ACL: "public-read",
        };
    };
    const responses = await Promise.all(input.map((each) => s3.getSignedUrl("putObject", params(each))));
    let response = [];
    for (let i = 0; i < responses.length; i++) {
        response.push({
            options: { headers: { "Content-Type": input[i].fileType } },
            signedUrl: responses[i],
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${input[i].fileName}`,
        });
    }
    console.log(responses, response, "response / responses uploadFileToAWS");
    return response;
};
exports.uploadFileToAWS = uploadFileToAWS;
// export const uploadFileToAWS = async ({ ctx, input }: { ctx: Context; input: UploadInputType }) => {
//   const s3 = new AWS.S3()
//   const { fileName, fileType } = input
//   const s3Params = {
//     Bucket: S3_BUCKET,
//     Key: fileName,
//     Expires: 1000,
//     ContentType: fileType,
//     ACL: "public-read",
//   }
//   console.log(s3Params, fileName, fileType, "WHAT ARE THESE LOOKING?")
//   const signedUrl = s3.getSignedUrl("putObject", s3Params)
//   console.log(signedUrl, "aws signed url, potentially")
//   if (!signedUrl) throw TRPCError("INTERNAL_SERVER_ERROR", "AWS failed to sign url")
//   const signedRequest = {
//     options: { headers: { "Content-Type": fileType } },
//     signedUrl: signedUrl,
//     url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
//   }
//   return signedRequest
// }
