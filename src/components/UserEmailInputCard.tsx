import { handleRequest } from '@/utils/axios';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import LogoSvg from '@/assets/logo.svg';
import toast from 'react-hot-toast';
import { secondsInDay } from 'date-fns/constants';
import { getDurationString } from '@/utils/datetime';
import { UserImprovementMetrics } from '@/types/api-responses';
import { logException } from '@/utils/logger';

const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

enum InvalidEmailEnum {
  INVALID_EMAIL = 'INVALID_EMAIL',
  EMAIL_REQUIRED = 'EMAIL_REQUIRED'
}

const InvalidEmailMessage = {
  [InvalidEmailEnum.INVALID_EMAIL]: 'Invalid Email!',
  [InvalidEmailEnum.EMAIL_REQUIRED]: 'Email is required'
};

export const UserEmailInputCard = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isInvalidEmail, setIsInvalidEmail] = useState<InvalidEmailEnum | null>(
    null
  );
  const [isEmailSubmitted, setIsEmailSubmitted] = useState<boolean>(false);
  const [saveUsernameAndFullName, setSaveUsernameAndFullName] =
    useState<boolean>(true);

  const markUserEmailAsInvalid = useCallback(
    (isInvalidEmailType: InvalidEmailEnum) => {
      setIsInvalidEmail(isInvalidEmailType);
      return toast.error(InvalidEmailMessage[isInvalidEmailType]);
    },
    []
  );

  const addUserEmail = useCallback(() => {
    if (!userEmail.length) {
      return markUserEmailAsInvalid(InvalidEmailEnum.EMAIL_REQUIRED);
    }
    if (!emailRegex.test(userEmail)) {
      return markUserEmailAsInvalid(InvalidEmailEnum.INVALID_EMAIL);
    }
    return handleRequest<{ success: string }>('/api/followup-user-email', {
      method: 'POST',
      data: {
        email: userEmail,
        saveUsername: saveUsernameAndFullName,
        saveFullName: saveUsernameAndFullName
      }
    })
      .then(() => {
        setIsEmailSubmitted(true);
        toast.success('Success');
      })
      .catch((err) => {
        logException(err);
        toast.error(
          "Whoops. Something went wrong and we couldn't sign you up. Try again?"
        );
        setIsEmailSubmitted(false);
      });
  }, [markUserEmailAsInvalid, saveUsernameAndFullName, userEmail]);

  const updateEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsInvalidEmail(null);
    setUserEmail(e.target.value);
  }, []);

  const [totalTimeWaited, setTotalTime] = useState(0);
  const [state, setState] = useState<'done' | 'inflight'>('inflight');

  const showGenericMessage = useMemo(() => {
    const threshold = secondsInDay * 4;

    return totalTimeWaited < threshold;
  }, [totalTimeWaited]);

  useEffect(() => {
    setState('inflight');
    handleRequest<UserImprovementMetrics>('/api/github/improvement_metrics')
      .then((r) => {
        setTotalTime(r.first_response_time_sum);
      })
      .catch(logException)
      .finally(() => {
        setState('done');
      });
  }, []);

  return (
    <div className=" w-full h-full flex flex-col content-start p-6 text-black">
      {state === 'inflight' ? (
        <div className="flex flex-col h-fit my-auto">
          <p className="text-xl">Please wait...</p>
          <p>
            We&apos;re just <i>wrapping up</i> a few more things
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold text-gray-900 text-left mb-2 lg:mb-4">
              Amazing year, right? 🎉
            </span>
            {showGenericMessage ? (
              <>
                <span className="text-sm text-gray-900 text-left">
                  An average dev can spend
                </span>
                <span className="font-medium text-xl text-left">upto 30%</span>
                <span className="text-sm text-gray-900 text-left mb-2">
                  of their time waiting for reviews
                </span>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-900 text-left">
                  This year, you&apos;ve waited for reviews for:
                </span>
                <span className="font-medium text-xl py-1 text-left">
                  {getDurationString(totalTimeWaited, { longForm: true })}
                </span>
              </>
            )}
            <span className="text-sm text-gray-900 text-left mb-4">
              Think that&apos;s a lot?
              <br />
              Great! We&apos;ve got you covered
            </span>
            <span className="text-sm font-medium text-gray-900 text-left">
              Our AI tool cuts PR wait time by suggesting reviewers and
              identifying org bottlenecks
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-4 mt-auto">
            <div className="flex flex-col text-left">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 text-left"
              >
                Want to <span className="font-bold">be involved</span>, or get{' '}
                <span className="font-bold">early access</span>? Join the beta
                waitlist!
              </label>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`email-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500  ${
                    isInvalidEmail && 'border-2 border-red-500'
                  } `}
                  placeholder="name@company.com"
                  required
                  value={userEmail}
                  onChange={updateEmail}
                  disabled={isEmailSubmitted}
                />
                <div className="inline-flex items-center">
                  <label
                    className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="remember"
                  >
                    <input
                      type="checkbox"
                      className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                      id="remember"
                      checked={saveUsernameAndFullName}
                      onChange={(e) =>
                        setSaveUsernameAndFullName(e.target.checked)
                      }
                      disabled={isEmailSubmitted}
                    />
                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="mt-px font-medium text-gray-800 cursor-pointer select-none"
                    htmlFor="remember"
                  >
                    <p className="flex items-center font-sans text-sm antialiased leading-normal">
                      Save my github username and full name
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <button
              className="block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={addUserEmail}
              disabled={isEmailSubmitted}
            >
              {isEmailSubmitted ? (
                'Submitted'
              ) : showGenericMessage ? (
                'Keep me updated'
              ) : (
                <span>✨&nbsp;&nbsp;Join the waitlist!&nbsp;&nbsp;✨</span>
              )}
            </button>
          </div>
        </>
      )}
      <div className="mt-3">
        <LogoSvg />
      </div>
    </div>
  );
};
