import { signIn } from 'next-auth/react';

export default function Home() {
  return (
    <div className="items-center justify-center p-4 min-h-screen w-full flex flex-col gap-4">
      <h1 className="text-4xl">Hello, world!</h1>
      <h2 className="text-xl font-semibold">
        This is <span className="text-violet-300">Middleware</span> Unwrapped
      </h2>
      <span className="text-[10em] font-black text-violet-800">2023</span>
      <span>To get started</span>
      <button
        className="bg-indigo-800 text-white px-4 py-2 rounded-md"
        onClick={() => {
          signIn('github', { callbackUrl: '/stats-summary' });
        }}
      >
        Login with Github
      </button>
      <span className="mt-4 text-sm text-gray-400">Note: Coming soon</span>
    </div>
  );
}
