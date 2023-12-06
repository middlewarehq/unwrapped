import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import '../../styles/globals.css';
export const config = {
  runtime: 'edge'
};

const data = {
  metric_title: 'Development Metrics',
  metric_username: '@john_dev',
  metric_name: 'Master Bug Slayer',
  metric_stat: 532
};

const generateUsingVercel = async () => {
  return (await createImageUsingVercel(data, 'browser')).image;
};

export default generateUsingVercel;
