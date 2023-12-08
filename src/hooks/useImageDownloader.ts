import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useCallback } from 'react';

interface DownloadImagesProps {
  images: string | string[];
}
const downloadSingleImage = (url: string) => {
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => saveAs(blob, fileName))
    .catch((error) => console.error('Error downloading image:', error));
};

const downloadMultipleImages = (urls: string[]) => {
  const zip = new JSZip();
  const promises = urls.map((url, index) => {
    const fileName = `image${index + 1}.jpg`;

    return fetch(url)
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
