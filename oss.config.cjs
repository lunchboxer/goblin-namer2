require('dotenv').config()

module.exports = {
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  region: process.env.OSS_REGION,
  bucket: process.env.OSS_BUCKET,
}
