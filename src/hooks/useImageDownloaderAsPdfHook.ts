import jsPDF from 'jspdf';
import { useCallback } from 'react';

interface DownloadImagesAsPdfProps {
  images: string[];
}

export const useImageDownloaderAsPdf = () => {
  const downloadImagesAsPdf = useCallback(
    async ({ images }: DownloadImagesAsPdfProps) => {
      const pdf = new jsPDF({
        unit: 'px',
        format: [440, 640]
      });
      const colorsCodesByImageOrder = await Promise.all(
        images.map(getColorFromImage)
      );

      images.forEach(async (imageUrl, index) => {
        if (index !== 0) {
          pdf.addPage();
        }
        const color = colorsCodesByImageOrder[index].split(',');

        pdf.setFillColor(
          parseInt(color![0]),
          parseInt(color![1]),
          parseInt(color![2])
        );
        pdf.rect(0, 0, 440, 640, 'F');
        pdf.addImage(imageUrl, 'JPEG', 20, 20, 400, 600);
      });
      pdf.save('middleware-unwrapped.pdf');
    },
    []
  );

  return downloadImagesAsPdf;
};

async function getColorFromImage(imageUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Enable CORS if the image is hosted on a different domain

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext('2d');
      if (!context) {
        reject('Unable to get 2D context for canvas');
        return;
      }

      context.drawImage(img, 0, 0);
      const pixelData = context.getImageData(1, 1, 1, 1).data;
      resolve(`${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}`);
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = imageUrl;
  });
}
