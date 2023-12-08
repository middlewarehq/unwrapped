import jsPDF from 'jspdf';
import { useCallback } from 'react';

interface DownloadImagesAsPdfProps {
  images: string[];
}

export const useImageDownloaderAsPdf = () => {
  const downloadImagesAsPdf = useCallback(
    ({ images }: DownloadImagesAsPdfProps) => {
      const pdf = new jsPDF();
      images.forEach((imageUrl, index) => {
        if (index !== 0) {
          pdf.addPage();
        }
        pdf.addImage(imageUrl, 'JPEG', 10, 10, 190, 0);
      });
      pdf.save('middleware-unwrapped.pdf');
    },
    []
  );

  return downloadImagesAsPdf;
};
