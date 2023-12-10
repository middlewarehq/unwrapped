import jsPDF from 'jspdf';
import { useCallback } from 'react';
import { rgbToHex, darkenHexColor } from '@/pages/api/utils/general';

interface DownloadImagesAsPdfProps {
  images: string[];
}

const IMAGE_HEIGHT = 600;
const IMAGE_WIDTH = 400;
const IMAGE_MARGIN = 20;

const PAGE_HEIGHT = IMAGE_HEIGHT + IMAGE_MARGIN + IMAGE_MARGIN;
const PAGE_WIDTH = IMAGE_WIDTH + IMAGE_MARGIN + IMAGE_MARGIN;

export const useImageDownloaderAsPdf = () => {
  const downloadImagesAsPdf = useCallback(
    async ({ images }: DownloadImagesAsPdfProps) => {
      const pdf = new jsPDF({
        unit: 'px',
        format: [PAGE_WIDTH, PAGE_HEIGHT],
        userUnit: 300
      });
      const colorsCodesByImageOrder = await Promise.all(
        images.map(getColorFromImage)
      );

      images.forEach(async (imageUrl, index) => {
        if (index !== 0) {
          pdf.addPage();
        }
        const color = colorsCodesByImageOrder[index].split(',');
        const hexCode = rgbToHex(
          parseInt(color![0]),
          parseInt(color![1]),
          parseInt(color![2])
        );
        const darkenHexCode = darkenHexColor(hexCode, 0.2);
        pdf.setFillColor(hexCode);
        pdf.setDrawColor(darkenHexCode);
        pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, 'F');
        pdf.addImage(
          imageUrl,
          'JPEG',
          IMAGE_MARGIN,
          IMAGE_MARGIN,
          IMAGE_WIDTH,
          IMAGE_HEIGHT
        );
        pdf.setLineWidth(10);
        pdf.roundedRect(
          IMAGE_MARGIN,
          IMAGE_MARGIN,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          10,
          10,
          'S'
        );
        pdf.clip();
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
