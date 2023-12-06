import { MetricData } from '@/pages/api/types/images';
import { ImageResponse } from '@vercel/og';

export const createImageUsingVercel = async (data: MetricData) => {
  const { metric_title, metric_username, metric_name, metric_stat } = data;
  const fontForImages = await fetch(
    new URL('public/assets/PressStart2P-Regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <main style={styles.intoWrapper}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto'
          }}
        >
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
};

const styles: Record<string, React.CSSProperties> = {
  intoWrapper: {
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
