import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useCallback } from 'react';
import { UpdatedImageFile } from '@/types/images';

interface DownloadImagesProps {
  images: UpdatedImageFile | UpdatedImageFile[];
}
const downloadSingleImage = (image: UpdatedImageFile) => {
  const fileName = image.fileName;
  fetch(image.data)
    .then((response) => response.blob())
    .then((blob) => saveAs(blob, fileName))
    .catch((error) => console.error('Error downloading image:', error));
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
    .catch((error) => console.error('Error zipping images:', error));
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
