import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const internal = axios.create({
  baseURL: process.env.INTERNAL_API_BASE_URL
});

export const handleRequest = <T = any>(
  url: string,
  params: AxiosRequestConfig<any> = { method: 'get' }
): Promise<T> =>
  internal({
    url,
    ...params,
    headers: {
      'Content-Type': 'application/json',
      'x-timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  })
    .then(handleThen)
    .catch(handleCatch);

export const handleThen = (r: AxiosResponse) => r.data;

export const handleCatch = (r: { response: AxiosResponse }) => {
  throw r.response;
};
