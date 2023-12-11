import { ALLOW_TRACKING_KEY } from '@/constants/events';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useLocalStorage } from 'usehooks-ts';

export const useTrackingConsent = () => {
  const [trackingAllowed, setTrackingAllowed] = useLocalStorage<Boolean | null>(
    ALLOW_TRACKING_KEY,
    null
  );

  const updatedTrackingState = useCallback(
    (allowed: boolean) => {
      toast.dismiss(ALLOW_TRACKING_KEY);
      setTrackingAllowed(allowed);
    },
    [setTrackingAllowed]
  );

  return useCallback(() => {
    if (trackingAllowed || trackingAllowed !== null) return;
    return toast.custom(
      (t) => {
        return (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-3xl w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col md:flex-row ring-1 ring-black ring-opacity-5 `}
            style={{ backgroundColor: '#16161a' }}
          >
            <div className="flex-1  p-4">
              This website uses analytics to ensure you get the best experience.
            </div>
            <div className="flex gap-5 items-center cursor-pointer p-2 justify-around">
              <button
                className="text-indigo-600 text-sm focus:outline-none hover:underline"
                style={{ color: '#7f5af0' }}
                onClick={() => updatedTrackingState(false)}
              >
                Decline
              </button>
              <button
                className="bg-indigo-500 px-2 py-1 text-white rounded-md text-sm hover:bg-indigo-700 focus:outline-none"
                style={{ backgroundColor: '#7f5af0' }}
                onClick={() => updatedTrackingState(true)}
              >
                Allow Analytics
              </button>
            </div>
          </div>
        );
      },
      {
        duration: 20000,
        id: ALLOW_TRACKING_KEY,
        position: 'bottom-center'
      }
    );
  }, [trackingAllowed, updatedTrackingState]);
};
