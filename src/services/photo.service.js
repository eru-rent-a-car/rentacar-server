const { promisify } = require('util');

const s3 = require('../configs/aws');

exports.savePhotoToAWS = async (vehicle, file) => {
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `vehicles/${vehicle.id}/${file.name}`,
    Body: Buffer.from(file.data),
    ACL: 'public-read',
  };

  const uploadAsync = promisify(s3.upload).bind(s3);

  try {
    const data = await uploadAsync(uploadParams);
    return data.Location;
  } catch (error) {
    throw error;
  }
};
