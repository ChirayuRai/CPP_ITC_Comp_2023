const aws = require('aws-sdk')
require('dotenv').config('.env')
// For some reason this name generation only works as one line so here we are
const imageName = require('crypto').randomBytes(32).toString("hex")

const reigon = process.env.AWS_REIGON
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const bucketName = process.env.AWS_BUCKET_NAME

const s3 = new aws.S3({
  reigon,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

async function generateUploadURL() {

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  });

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  return uploadURL;

}

exports.generateUploadURL = generateUploadURL;
