import archiver from 'archiver';
import { ImageFile } from '@/pages/api/image_gen/index';

export async function archiveFiles(fileBuffers: ImageFile[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const buffers: Buffer[] = [];

    archive.on('data', (buffer: Buffer) => {
      buffers.push(buffer);
    });

    archive.on('end', () => {
      const zipBuffer = Buffer.concat(buffers);
      resolve(zipBuffer);
    });

    archive.on('error', (err) => reject(err));

    fileBuffers.forEach(({ fileName, data }) => {
      archive.append(data, { name: fileName });
    });

    archive.finalize();
  });
}
