import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useCallback } from 'react';
import { UpdatedImageFile } from '@/types/images';
import { logException } from '@/utils/logger';

interface DownloadImagesProps {
  images: UpdatedImageFile | UpdatedImageFile[];
}
const downloadSingleImage = (image: UpdatedImageFile) => {
  const fileName = image.fileName;
  fetch(image.data)
    .then((response) => response.blob())
    .then((blob) => saveAs(blob, fileName))
    .catch((error) => {
      logException('Error downloading image:', { originalException: error });
    });
};

const downloadMultipleImages = (images: UpdatedImageFile[]) => {
  const zip = new JSZip();
  const promises = images.map((image) => {
    const fileName = image.fileName;

    return fetch(image.data)
      .then((response) => response.blob())
      .then((blob) => zip.file(fileName, blob));
  });

  Promise.all(promises)
    .then(() => zip.generateAsync({ type: 'blob' }))
    .then((content) => saveAs(content, 'unwrapped-images.zip'))
    .catch((error) => {
      logException('Error zipping images:', { originalException: error });
    });
};

export const useImageDownloader = () => {
  const downloadImages = useCallback(({ images }: DownloadImagesProps) => {
    if (Array.isArray(images)) {
      downloadMultipleImages(images);
    } else {
      downloadSingleImage(images);
    }
  }, []);

  return downloadImages;
};
