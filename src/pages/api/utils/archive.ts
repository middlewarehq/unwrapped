import * as fs from 'fs';
import archiver from 'archiver';

export async function archiveFiles(
  filePaths: string[],
  outputZipPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Create a writable stream for the zip file
    const output = fs.createWriteStream(outputZipPath);

    // Create an archiver object with the desired format (zip in this case)
    const archive = archiver('zip', {
      zlib: { level: 9 } // Set compression level
    });

    // Pipe the output stream to the archive
    archive.pipe(output);

    // Add files to the archive
    filePaths.forEach((filePath) => {
      const fileName = filePath.split('/').pop(); // Extract the file name from the path
      archive.file(filePath, { name: fileName as string });
    });

    // Finalize the archive (write the zip file)
    archive.finalize();

    // Listen for events on the archive
    output.on('close', () => {
      console.log(`${archive.pointer()} total bytes`);
      console.log(
        'Archiver has been finalized, and the output file descriptor has closed.'
      );
      resolve();
    });

    output.on('end', () => {
      console.log('Data has been drained');
    });

    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('File not found:', err);
      } else {
        reject(err);
      }
    });

    archive.on('error', (err) => {
      reject(err);
    });
  });
}
