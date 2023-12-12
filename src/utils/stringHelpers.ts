import { hashSync } from 'bcryptjs';
import { HASH_LENGTH } from '@/constants/general';
import { logException } from './logger';

export const capitalize = (sentence?: string): string => {
  if (!sentence) return '';
  return sentence.replace(/\b\w/g, (match) => match.toUpperCase());
};

export const bcryptGen = (username: string): string => {
  const salt = process.env.HASHING_SALT as string;
  if (!salt) {
    logException('Hashing salt not found');
    return '';
  }
  const hash = hashSync(username, salt);
  return hash.slice(-HASH_LENGTH);
};

export const extractFilenameWithoutExtension = (input: string): string => {
  const parts = input.split('/');
  const filenameWithExtension = parts[parts.length - 1];
  const filenameParts = filenameWithExtension.split('.');
  const filenameWithoutExtension = filenameParts[0];
  return filenameWithoutExtension || '';
};
