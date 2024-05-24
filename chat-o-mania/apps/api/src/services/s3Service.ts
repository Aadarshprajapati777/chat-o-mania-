import AWS from 'aws-sdk';
import { Request } from 'express';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  const params:any = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer
  };

  const data = await s3.upload(params).promise();
  return data.Location;
};
