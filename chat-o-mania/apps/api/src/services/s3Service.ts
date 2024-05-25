import AWS from 'aws-sdk';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadToS3 = async (file: Express.Multer.File): Promise<string> => {
  console.log("inside uploadToS3");

  
  const filePath = path.join(__dirname, '../../uploads', file.filename);
  const fileContent = fs.readFileSync(filePath);

  const params:any = { 
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: fileContent,

  };

  try {
    const data = await s3.upload(params).promise();
    console.log("data.Location = ", data.Location);
    return data.Location; 
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error; 
  }
};
  