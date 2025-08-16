import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import z from "zod"
import { Context, TRPCError } from "../utils/trpc/index.js"

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
const AWS_REGION = "us-west-1"
const AWS_ACCESS_KEY_ID = process.env.AWSAccessKeyId
const AWS_SECRET_ACCESS_KEY = process.env.AWSSecretKey

type SignedRequest = {
  options: any
  signedURL: any
  bucketURL: string
  currentSong: any
  fileBlob: any
}
const UploadInputObjectSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  fileBlob: z.any(),
})

export const UploadInputSchema = z.array(UploadInputObjectSchema)

// type UploadInputObjectType = z.infer<typeof UploadInputObjectSchema>
export type UploadInputType = z.infer<typeof UploadInputSchema>

export const uploadFileToAWS = async ({ ctx, input }: { ctx: Context; input: UploadInputType }) => {
  if (!ctx.user) throw TRPCError("INTERNAL_SERVER_ERROR", "you must be logged in")
  if (!AWS_BUCKET_NAME || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS S3 environment variables are not set")
  }

  const s3 = new S3Client({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  })

  let response = []

  for (let i = 0; i < input.length; i++) {
    const command = new PutObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: input[i].fileName,
      ContentType: input[i].fileType,
      ACL: "public-read",
    })
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 1000 })

    console.log(input[i], signedUrl, "I NEED TO SEE THIS NOT THE OLD ONE uploadFileToAWS")

    response.push({
      options: { headers: { "Content-Type": input[i].fileType } },
      signedUrl,
      url: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${input[i].fileName}`,
    })
  }
  return response
}
