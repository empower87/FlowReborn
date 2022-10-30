var AWS = require('aws-sdk')
require('dotenv').config()
import { Request, Response, NextFunction } from 'express'

AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
})
const S3_BUCKET = process.env.Bucket

type SignedRequest = {
  options: any
  signedURL: any
  bucketURL: string
  currentSong: any
  fileBlob: any
}

interface ISignedRequest extends Request {
  signedRequest: SignedRequest
}

module.exports = function sign_s3(req: ISignedRequest, res: Response, next: NextFunction) {
  const s3 = new AWS.S3()
  const fileName = req.body.fileName
  const fileType = req.body.fileType
  const currentSong = req.body.currentSong
  const fileBlob = req.body.fileBlob

  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 3000,
    ContentType: fileType,
    ACL: 'public-read',
  }
  console.log(fileBlob, 'IF THIS IS EMPTY WTF')

  s3.getSignedUrl('putObject', s3Params, async (err: any, data: any) => {
    if (err) {
      console.log(err)
      res.json({ success: false, error: err, message: 'AWS failed to sign URL' })
    } else {
      // req.signedRequest = {}
      req.signedRequest.options = { headers: { 'Content-Type': fileType } }
      req.signedRequest.signedURL = data
      req.signedRequest.bucketURL = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      req.signedRequest.currentSong = currentSong
      req.signedRequest.fileBlob = fileBlob
      next()
    }
  })
}
