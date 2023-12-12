import jsPDF from 'jspdf';
import { rgbToHex, darkenHexColor } from '@/api-helpers/general';
import { UpdatedImageFile } from '@/types/images';
import toast from 'react-hot-toast';

interface DownloadImagesAsPdfProps {
  images: UpdatedImageFile[];
}

const IMAGE_HEIGHT = 600;
const IMAGE_WIDTH = 400;
const IMAGE_MARGIN = 20;

const PAGE_HEIGHT = IMAGE_HEIGHT + IMAGE_MARGIN + IMAGE_MARGIN;
const PAGE_WIDTH = IMAGE_WIDTH + IMAGE_MARGIN + IMAGE_MARGIN;

const downloadImagesAsPdf = async ({ images }: DownloadImagesAsPdfProps) => {
  const pdf = new jsPDF({
    unit: 'px',
    format: [PAGE_WIDTH, PAGE_HEIGHT],
    userUnit: 300,
    compress: true
  });
  const colorsCodesByImageOrder = await Promise.all(
    images.map((item) => item.data).map(getColorFromImage)
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
      imageUrl.data,
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
  await pdf.save('middleware-unwrapped.pdf', { returnPromise: true });
};

export const useImageDownloaderAsPdf = () => {
  return ({ images }: DownloadImagesAsPdfProps) =>
    toast.promise(
      downloadImagesAsPdf({ images }),
      {
        loading: 'Processing PDF',
        success: 'Downloaded',
        error: 'Error while processing'
      },
      {
        position: 'top-right',
        success: {
          duration: 3000
        }
      }
    );
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
