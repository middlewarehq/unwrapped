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
        duration: 6000,
        icon: '🤔',
        id: 'no-images-found'
      }),
    []
  );
  const invalidUrlToast = useCallback(
    () =>
      toast.error('Invalid URL', {
        duration: 6000,
        icon: '😢',
        id: 'invalid-url'
      }),
    []
  );
  const unauthenticatedToast = useCallback(
    () =>
      toast.error(
        "Seems like you aren't authenticated. Taking you back home.",
        {
          id: 'unauthenticated'
        }
      ),
    []
  );

  const somethingWentWrongToast = useCallback(
    () =>
      toast.error('Something went wrong. Please try again.', {
        id: 'something-went-wrong'
      }),
    []
  );

  return {
    InvalidEmailToast,
    emailIsRequiredToast,
    noImagesToast,
    invalidUrlToast,
    unauthenticatedToast,
    somethingWentWrongToast
  };
};
