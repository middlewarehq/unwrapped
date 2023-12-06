import archiver from 'archiver';
import { ImageFile } from '../types/images';

export async function archiveFiles(fileBuffers: ImageFile[]): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const bufferArray: Buffer[] = [];

    archive.on('data', (buffer: Buffer) => {
      bufferArray.push(buffer);
    });

    archive.on('end', () => {
      const zipBuffer = Buffer.concat(bufferArray);
      resolve(zipBuffer);
    });

    archive.on('error', (err) => reject(err));

    Promise.all(
      fileBuffers.map(({ fileName, data }) => {
        archive.append(data, { name: fileName });
      })
    );

    archive.finalize();
  });
}
