import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useCallback } from 'react';

interface DownloadImagesProps {
  images: string | string[];
}

const useImageDownloader = () => {
  const downloadImages = useCallback(({ images }: DownloadImagesProps) => {
    const downloadSingleImage = (url: string) => {
      const fileName = url.substring(url.lastIndexOf('/') + 1);
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => saveAs(blob, fileName))
        .catch((error) => console.error('Error downloading image:', error));
    };

    const downloadMultipleImages = (urls: string[]) => {
      const zip = new JSZip();
      const promises: Promise<void | JSZip>[] = [];

      urls.forEach((url, index) => {
        const fileName = `middleware-unwrapped-${index + 1}.jpg`;

        promises.push(
          fetch(url)
            .then((response) => response.blob())
            .then((blob) => zip.file(fileName, blob))
        );
      });

      Promise.all(promises)
        .then(() => zip.generateAsync({ type: 'blob' }))
        .then((content) => saveAs(content, 'unwrapped-images.zip'))
        .catch((error) => console.error('Error zipping images:', error));
    };

    if (Array.isArray(images)) {
      downloadMultipleImages(images);
    } else {
      downloadSingleImage(images);
    }
  }, []);

  return downloadImages;
};

export default useImageDownloader;
