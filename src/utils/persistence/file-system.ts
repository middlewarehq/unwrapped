import { ImagesWithBuffers } from '@/types/images';
import fs from 'fs/promises';
import path from 'path';
import { logException } from '../logger';

async function directoryExists(localDirectory: string): Promise<boolean> {
  try {
    const stats = await fs.stat(localDirectory);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

async function ensureDirectoryExists(localDirectory: string) {
  try {
    await fs.mkdir(localDirectory, { recursive: true });
    console.info(`Directory created: ${localDirectory}`);
  } catch (error: any) {
    if (error.code === 'EEXIST') {
      console.error(`Directory already exists: ${localDirectory}`);
    } else {
      logException(`Error creating directory: ${error.message}`, {
        originalException: error
      });
    }
  }
}

export const saveImagesToLocalDirectory = async (
  localDirectory: string,
  imageFiles: ImagesWithBuffers[]
): Promise<void> => {
  try {
    await ensureDirectoryExists(localDirectory);

    const savePromises = imageFiles.map(async (imageFile) => {
      const filePath = path.join(localDirectory, imageFile.fileName);
      await fs.writeFile(filePath, imageFile.data);
    });

    await Promise.all(savePromises);
  } catch (error: any) {
    logException(`Error saving images to local directory: ${error.message}`, {
      originalException: error
    });
    throw new Error(`Error saving images to local directory: ${error.message}`);
  }
};

export const fetchImagesFromLocalDirectory = async (
  localDirectory: string
): Promise<ImagesWithBuffers[]> => {
  try {
    await ensureDirectoryExists(localDirectory);
    const files = await fs.readdir(localDirectory);
    const images: ImagesWithBuffers[] = await Promise.all(
      files.map(async (fileName) => {
        const filePath = path.join(localDirectory, fileName);
        const data = await fs.readFile(filePath);
        return {
          fileName,
          data
        };
      })
    );

    return images;
  } catch (error: any) {
    logException(
      `Error fetching images from local directory: ${error.message}`,
      { originalException: error }
    );
    throw new Error(
      `Error fetching images from local directory: ${error.message}`
    );
  }
};

export const fetchImageFromLocalDirectory = async (
  filePath: string
): Promise<ImagesWithBuffers> => {
  try {
    const data = await fs.readFile(filePath);
    return {
      fileName: filePath,
      data
    };
  } catch (error: any) {
    logException(
      `Error fetching single image from local directory: ${error.message}`,
      { originalException: error }
    );
    throw new Error(
      `Error fetching single image from local directory: ${error.message}`
    );
  }
};

export const deleteLocalDirectory = async (
  localDirectory: string
): Promise<void> => {
  try {
    const directory_exists = await directoryExists(localDirectory);
    if (!directory_exists) return;

    await fs.rmdir(localDirectory, { recursive: true });
  } catch (error: any) {
    logException(`Error deleting local directory: ${error.message}`, {
      originalException: error
    });
    throw new Error(`Error deleting local directory: ${error.message}`);
  }
};
