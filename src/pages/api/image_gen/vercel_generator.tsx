import { MetricData } from '@/pages/api/types/images';
import { ImageResponse } from '@vercel/og';

export const createImageUsingVercel = (data: MetricData) => {
  const { metric_title, metric_username, metric_name, metric_stat } = data;
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
          <br />
          <br />
          <br />
          <p style={styles.metricName}>{metric_name}</p>
          <h1 style={styles['stat']}>{metric_stat}</h1>
          <p style={styles.times}>times</p>
        </div>
      </main>
    ),
    {
      width: 800,
      height: 600
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
    width: '800px'
  },
  introContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto'
  },
  metricName: {
    fontSize: '30px',
    marginBottom: '-20px'
  },
  stat: {
    fontSize: '80px'
  },
  times: {
    marginTop: '-30px'
  }
};
