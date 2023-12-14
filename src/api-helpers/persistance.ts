import { ImageFile, ImagesWithBuffers } from '@/types/images';
import {
  deleteS3Directory,
  fetchFileFromS3Directory,
  fetchImagesFromS3Directory,
  uploadImagesToS3
} from '../utils/persistence/s3';
import {
  deleteLocalDirectory,
  fetchImageFromLocalDirectory,
  fetchImagesFromLocalDirectory,
  saveImagesToLocalDirectory
} from '../utils/persistence/file-system';

const awsCredentialExists =
  process.env.AWS_ACCESS_KEY_ID &&
  process.env.AWS_SECRET_ACCESS_KEY &&
  process.env.AWS_REGION;

const bucketName = process.env.UNWRAPPED_PERSISTENCE_BUCKET_NAME;

export const saveCards = async (
  userLogin: string,
  imageFiles: ImagesWithBuffers[],
  isPublic: boolean = true
): Promise<void> => {
  if (awsCredentialExists && bucketName) {
    const prefix = isPublic ? `public/${userLogin}` : `${userLogin}`;
    await uploadImagesToS3(bucketName, prefix, imageFiles);
  } else {
    const prefix = isPublic
      ? `${process.cwd()}/unwrapped-cards/public/${userLogin}/`
      : `${process.cwd()}/unwrapped-cards/${userLogin}/`;
    await saveImagesToLocalDirectory(prefix, imageFiles);
  }
};

export const fetchSavedCards = async (
  userLogin: string,
  isPublic: boolean = true
): Promise<ImagesWithBuffers[]> => {
  if (awsCredentialExists && bucketName) {
    const prefix = isPublic ? `public/${userLogin}` : `${userLogin}`;
    return await fetchImagesFromS3Directory(bucketName, prefix);
  } else {
    const prefix = isPublic
      ? `${process.cwd()}/unwrapped-cards/public/${userLogin}/`
      : `${process.cwd()}/unwrapped-cards/${userLogin}/`;
    return await fetchImagesFromLocalDirectory(prefix);
  }
};

export const deleteSaveCards = async (
  userLogin: string,
  isPublic: boolean = true
): Promise<void> => {
  if (awsCredentialExists && bucketName) {
    const prefix = isPublic ? `public/${userLogin}` : `${userLogin}`;
    await deleteS3Directory(bucketName, prefix);
  } else {
    const prefix = isPublic
      ? `${process.cwd()}/unwrapped-cards/public/${userLogin}/`
      : `${process.cwd()}/unwrapped-cards/${userLogin}/`;
    await deleteLocalDirectory(prefix);
  }
};

export const fetchSavedCard = async (
  userLogin: string,
  cardName: string,
  isPublic: boolean = true
): Promise<ImageFile> => {
  if (awsCredentialExists && bucketName) {
    const prefix = isPublic
      ? `public/${userLogin}/${cardName}.png`
      : `${userLogin}/${cardName}.png`;
    return await fetchFileFromS3Directory(bucketName, prefix);
  } else {
    const prefix = isPublic
      ? `${process.cwd()}/unwrapped-cards/public/${userLogin}/${cardName}.png`
      : `${process.cwd()}/unwrapped-cards/${userLogin}/${cardName}.png`;
    return await fetchImageFromLocalDirectory(prefix);
  }
};
