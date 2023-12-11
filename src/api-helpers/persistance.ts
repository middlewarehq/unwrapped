import { ImageFile } from '@/types/images';
import {
  deleteS3Directory,
  fetchImagesFromS3Directory,
  uploadImagesToS3
} from '../utils/persistence/s3';
import {
  deleteLocalDirectory,
  fetchImagesFromLocalDirectory,
  saveImagesToLocalDirectory
} from '../utils/persistence/file-system';

const awsCredentialExits =
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_REGION;

const bucketName = process.env.UNWRAPPED_PERSISTENCE_BUCKET_NAME;

export const saveCards = async (
  userLogin: string,
  imageFiles: ImageFile[]
): Promise<void> => {
  if (awsCredentialExits && bucketName) {
    await uploadImagesToS3(bucketName, userLogin, imageFiles);
  } else {
    await saveImagesToLocalDirectory(
      `${process.cwd()}/unwrapped-cards/${userLogin}/`,
      imageFiles
    );
  }
};

export const fetchSavedCards = async (
  userLogin: string
): Promise<ImageFile[]> => {
  if (awsCredentialExits && bucketName) {
    return await fetchImagesFromS3Directory(bucketName, userLogin);
  } else {
    return await fetchImagesFromLocalDirectory(
      `${process.cwd()}/unwrapped-cards/${userLogin}/`
    );
  }
};

export const deleteSaveCards = async (userLogin: string): Promise<void> => {
  if (awsCredentialExits && bucketName) {
    await deleteS3Directory(bucketName, userLogin);
  } else {
    await deleteLocalDirectory(
      `${process.cwd()}/unwrapped-cards/${userLogin}/`
    );
  }
};
