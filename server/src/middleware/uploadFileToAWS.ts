// var AWS = require('aws-sdk')
import AWS from "aws-sdk"
// import { Blob } from "buffer"
import z from "zod"
import { Context } from "../utils/trpc"

AWS.config.update({
  region: "us-west-1",
  accessKeyId: process.env.AWSAccessKeyId!,
  secretAccessKey: process.env.AWSSecretKey!,
})
const S3_BUCKET = process.env.Bucket!

type SignedRequest = {
  options: any
  signedURL: any
  bucketURL: string
  currentSong: any
  fileBlob: any
}

export const UploadInputSchema = z.array(
  z.object({
    fileName: z.string(),
    fileType: z.string(),
    fileBlob: z.any(),
  })
)
// export const UploadInputSchema = z.object({
//   fileName: z.string(),
//   fileType: z.string(),
// })
export type UploadInputType = z.infer<typeof UploadInputSchema>

export const uploadFileToAWS = async ({ ctx, input }: { ctx: Context; input: UploadInputType }) => {
  const s3 = new AWS.S3()
  // const { fileName, fileType } = input

  // for (let i = 0; i < input.length; i++) {
  //   const s3Params = {
  //     Bucket: S3_BUCKET,
  //     Key: input[i].fileName,
  //     Expires: 1000,
  //     ContentType: input[i].fileType,
  //     ACL: "public-read",
  //   }
  // }

  const params = (object: any) => {
    return {
      Bucket: S3_BUCKET,
      Key: object.fileName,
      Expires: 1000,
      ContentType: object.fileType,
      ACL: "public-read",
    }
  }
  const responses = await Promise.all(input.map((each) => s3.getSignedUrl("putObject", params(each))))

  let response = []

  for (let i = 0; i < responses.length; i++) {
    response.push({
      options: { headers: { "Content-Type": input[i].fileType } },
      signedUrl: responses[i],
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${input[i].fileName}`,
    })
  }
  console.log(responses, response, "HELLLLLLLOOOOOOOO")
  return response
  // const s3Params = {

  //   Bucket: S3_BUCKET,
  //   Key: fileName,
  //   Expires: 1000,
  //   ContentType: fileType,
  //   ACL: "public-read",
  // }

  // console.log(s3Params, fileName, fileType, "WHAT ARE THESE LOOKING?")

  // const signedUrl = s3.getSignedUrl("putObject", s3Params)
  // console.log(signedUrl, "aws signed url, potentially")
  // if (!signedUrl) throw TRPCError("INTERNAL_SERVER_ERROR", "AWS failed to sign url")

  // const signedRequest = {
  //   options: { headers: { "Content-Type": fileType } },
  //   signedUrl: signedUrl,
  //   url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
  // }

  // return signedRequest
}
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
