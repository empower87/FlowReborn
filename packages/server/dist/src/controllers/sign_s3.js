var AWS = require("aws-sdk");
require("dotenv").config();
AWS.config.update({
    region: "us-west-1",
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
});
const S3_BUCKET = process.env.Bucket;
module.exports = function sign_s3(req, res, next) {
    const s3 = new AWS.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    const currentSong = req.body.currentSong;
    const fileBlob = req.body.fileBlob;
    if (!S3_BUCKET) {
        throw new Error("S3_BUCKET environment variable is not set");
    }
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 3000,
        ContentType: fileType,
        ACL: "public-read",
    };
    console.log(fileBlob, "IF THIS IS EMPTY WTF");
    s3.getSignedUrl("putObject", s3Params, async (err, data) => {
        if (err) {
            console.log(err);
            res.json({ success: false, error: err, message: "AWS failed to sign URL" });
        }
        else {
            // req.signedRequest = {}
            req.signedRequest.options = { headers: { "Content-Type": fileType } };
            req.signedRequest.signedURL = data;
            req.signedRequest.bucketURL = `${S3_BUCKET}/${fileName}`;
            req.signedRequest.currentSong = currentSong;
            req.signedRequest.fileBlob = fileBlob;
            next();
        }
    });
};
export {};
//# sourceMappingURL=sign_s3.js.map