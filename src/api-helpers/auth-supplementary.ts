import { splitEvery } from 'ramda';

import { privateDecrypt, publicEncrypt } from 'crypto';

const CHUNK_SIZE = 127;

export const enc = (data?: string) => {
  const key = process.env.TOKEN_ENC_PUB_KEY;
  try {
    return data
      ? splitEvery(CHUNK_SIZE, data).map((chunk) =>
          publicEncrypt(key, Buffer.from(chunk)).toString('base64')
        )
      : null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const dec = (_chunks: string) => {
  const chunks = _chunks.split(',');
  const key = process.env.TOKEN_ENC_PRI_KEY;
  return chunks
    .map((chunk) => privateDecrypt(key, Buffer.from(chunk, 'base64')))
    .join('');
};
