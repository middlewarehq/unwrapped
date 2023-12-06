import { MetricData, ImageFile } from '@/pages/api/types/images';
import { ImageResponse } from '@vercel/og';
import { arrayBufferToBuffer } from '@/pages/api/utils/general';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';

export const createImageUsingVercel = async (
  data: MetricData
): Promise<ImageFile> => {
  const { metric_title, metric_username, metric_name, metric_stat } = data;
  const fontForImages = fs.readFileSync(
    path.join(process.cwd(), 'public', 'assets', 'PressStart2P-Regular.ttf')
  );

  const fileName = uuid() + '.png';

  const generatedImage = new ImageResponse(
    (
      <main style={styles.intoWrapper}>
        <div style={styles.introWrapper}>
          <h1>{metric_title}</h1>
          <p>{metric_username}</p>
          <p style={styles.metricName}>{metric_name}</p>
          <h1 style={styles.stat}>{metric_stat}</h1>
          <p style={styles.times}>times</p>
        </div>
      </main>
    ),
    {
      width: 800,
      height: 600,
      fonts: [
        {
          name: 'Pixel',
          data: fontForImages,
          style: 'normal'
        }
      ]
    }
  );
  let imageCopy = generatedImage.clone();
  const imageArrayBuffer = await generatedImage.arrayBuffer();
  const imageBuffer = arrayBufferToBuffer(imageArrayBuffer);
  return {
    data: imageBuffer,
    fileName,
    image: imageCopy
  };
};

const styles: Record<string, React.CSSProperties> = {
  introWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '600px',
    width: '800px',
    fontFamily: 'Pixel',
    color: 'grey',
    background: 'white'
  },
  introContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto'
  },
  metricName: {
    fontSize: '30px',
    marginTop: '50px',
    marginBottom: '20px'
  },
  stat: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  times: {
    marginTop: '-30px'
  }
};
