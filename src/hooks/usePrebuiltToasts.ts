import { useCallback } from 'react';
import toast from 'react-hot-toast';

export const usePrebuiltToasts = () => {
  const InvalidEmailToast = useCallback(
    () =>
      toast.error('Invalid email address', {
        id: 'invalid-email'
      }),
    []
  );
  const emailIsRequiredToast = useCallback(
    () =>
      toast.error('Email is required', {
        id: 'email-is-required'
      }),
    []
  );
  const noImagesToast = useCallback(
    () =>
      toast.error('No images found', {
        duration: 10000,
        icon: '🤔',
        id: 'no-images-found'
      }),
    []
  );
  const invalidUrlToast = useCallback(
    () =>
      toast.error('Invalid URL', {
        duration: 10000,
        icon: '😢',
        id: 'invalid-url'
      }),
    []
  );

  return {
    InvalidEmailToast,
    emailIsRequiredToast,
    noImagesToast,
    invalidUrlToast
  };
};
