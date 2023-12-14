import { ImagesWithBuffers } from '@/types/images';
import { S3 } from 'aws-sdk';
import { logException } from '../logger';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadImagesToS3 = async (
  bucketName: string,
  prefix: string,
  imageFiles: ImagesWithBuffers[]
): Promise<void> => {
  const uploadPromises = imageFiles.map(async (imageFile) => {
    const uploadParams = {
      Bucket: bucketName,
      Key: `${prefix}/${imageFile.fileName}`,
      Body: imageFile.data,
      Prefix: prefix
    };

    try {
      await s3.upload(uploadParams).promise();
    } catch (error: any) {
      logException(`Error uploading image to S3: ${error.message}`, {
        originalException: error
      });
      throw new Error(`Error uploading image to S3: ${error.message}`);
    }
  });

  await Promise.all(uploadPromises);
};

export const fetchImagesFromS3Directory = async (
  bucketName: string,
  directory: string
): Promise<ImagesWithBuffers[]> => {
  const listObjectsParams = {
    Bucket: bucketName,
    Prefix: directory
  };

  try {
    const data = await s3.listObjectsV2(listObjectsParams).promise();

    const images: ImagesWithBuffers[] = await Promise.all(
      (data.Contents || []).map(async (item) => {
        const imageBuffer = await s3
          .getObject({ Bucket: bucketName, Key: item.Key || '' })
          .promise();
        return {
          fileName: item.Key || '',
          data: imageBuffer.Body as Buffer
        };
      })
    );

    return images;
  } catch (error: any) {
    logException(`Error fetching images from S3: ${error.message}`, {
      originalException: error
    });
    throw new Error(`Error fetching images from S3: ${error.message}`);
  }
};

export const fetchFileFromS3Directory = async (
  bucketName: string,
  key: string
): Promise<ImagesWithBuffers> => {
  try {
    const imageBuffer = await s3
      .getObject({ Bucket: bucketName, Key: key })
      .promise();

    return {
      fileName: key,
      data: imageBuffer.Body as Buffer
    };
  } catch (error: any) {
    logException(`Error fetching file from S3: ${error.message}`, {
      originalException: error
    });
    throw new Error(`Error fetching file from S3: ${error.message}`);
  }
};

export const deleteS3Directory = async (
  bucketName: string,
  directory: string
): Promise<void> => {
  const listObjectsParams = {
    Bucket: bucketName,
    Prefix: directory
  };

  try {
    const data = await s3.listObjectsV2(listObjectsParams).promise();

    if (data.Contents && data.Contents.length > 0) {
      const deleteObjectsParams = {
        Bucket: bucketName,
        Delete: {
          Objects: data.Contents.map((item) => ({ Key: item.Key || '' }))
        }
      };

      await s3.deleteObjects(deleteObjectsParams).promise();
    }
  } catch (error: any) {
    logException(`Error deleting directory from S3: ${error.message}`, {
      originalException: error
    });
    throw new Error(`Error deleting directory from S3: ${error.message}`);
  }
};
