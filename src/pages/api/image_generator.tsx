import { createImageUsingVercel } from '@/pages/api/image_gen/vercel_generator';
import '../../styles/globals.css';
export const config = {
  runtime: 'edge'
};

const data = {
  metric_name: 'Metric Name',
  metric_stat: 1234,
  metric_title: 'Metric Title',
  metric_username: 'Metric Username'
};

const generateUsingVercel = async () => {
  return createImageUsingVercel(data);
};

export default generateUsingVercel;
