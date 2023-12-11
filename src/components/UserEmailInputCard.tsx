import { handleRequest } from '@/utils/axios';
import React, { ChangeEvent, useCallback, useState } from 'react';
import LogoSvg from '@/assets/logo.svg';
import toast from 'react-hot-toast';

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
      return toast.error(InvalidEmailMessage[isInvalidEmailType], {
        position: 'top-right'
      });
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
        toast.success('Success', {
          position: 'top-right'
        });
      })
      .catch(() => setIsEmailSubmitted(false));
  }, [markUserEmailAsInvalid, saveUsernameAndFullName, userEmail]);

  const updateEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsInvalidEmail(null);
    setUserEmail(e.target.value);
  }, []);

  return (
    <div className=" w-full h-full flex flex-col flex justify-between content-start p-6 dark:text-black">
      <div className="flex  justify-between  font-medium">
        <span>@shivam-bit</span>
        <span>unwrapped</span>
      </div>
      <h5 className="text-xl font-medium text-gray-900 dark:text-black text-left">
        Want to stay informed on how your growth journey is coming along?
      </h5>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col text-left">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black text-left"
          >
            Let us know which email to reach on, and we’ll take care of the rest
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
                  onChange={(e) => setSaveUsernameAndFullName(e.target.checked)}
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
                className="mt-px font-light text-gray-700 cursor-pointer select-none"
                htmlFor="remember"
              >
                <p className="flex items-center font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                  Save my github username and full name
                </p>
              </label>
            </div>
          </div>
        </div>

        <button
          className="mt-2 block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={addUserEmail}
          disabled={isEmailSubmitted}
        >
          {isEmailSubmitted ? 'Submitted' : 'Keep me updated'}
        </button>
      </div>
      <LogoSvg />
    </div>
  );
};
