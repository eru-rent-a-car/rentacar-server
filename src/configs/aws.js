const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
require('dotenv').config();

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'eu-west-3',
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      console.log('file uploaded: ', file.originalname);
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

module.exports = { upload, s3 };
