import { enc } from '@/api-helpers/auth-supplementary';
import { addMonths } from 'date-fns';
import NextAuth, {
  type AuthOptions,
  type Profile,
  type Account
} from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { type NextApiRequest, type NextApiResponse } from 'next/types';

const getRemainingCookies = (key: string, res: NextApiResponse) =>
  ((res.getHeader('set-cookie') || []) as string[]).filter(
    (cookie) => !cookie.startsWith(key)
  );

const unsafeCookieAttrs = ['Secure', 'Path=/'].join(';');
const cookieAttrs = `${unsafeCookieAttrs};HttpOnly`;
const cookieDeleteAttr = 'Expires=Thu, 01 Jan 1970 00:00:00 GMT';

export const GH_COOKIE_ATTR = 'ghct';

export const setCookie = (
  key: string,
  value: any,
  res: NextApiResponse,
  secure: boolean = true,
  expires?: string
) => {
  res.setHeader('set-cookie', [
    ...getRemainingCookies(key, res),
    `${key}=${String(value)};${secure ? cookieAttrs : unsafeCookieAttrs}${
      expires ? `;Expires=${expires}` : ''
    }`
  ]);
};

export const deleteCookie = (
  key: string,
  res: NextApiResponse,
  secure: boolean = true
) => {
  res.setHeader('set-cookie', [
    ...getRemainingCookies(key, res),
    `${key}=;${secure ? cookieAttrs : unsafeCookieAttrs};${cookieDeleteAttr}`
  ]);
};

export const nextAuthConfig = (
  req: NextApiRequest,
  res: NextApiResponse
): AuthOptions => ({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization:
        'https://github.com/login/oauth/authorize?scope=read:user+user:email+repo',
      name: 'github'
    })
  ],
  callbacks: {
    async signIn({ account }: { profile?: Profile; account: Account | null }) {
      switch (account?.provider?.split('-')[0]) {
        case 'github': {
          if (!account?.access_token) return false;
          const loginDate = new Date();
          setCookie(
            GH_COOKIE_ATTR,
            enc(account.access_token),
            res,
            true,
            addMonths(loginDate, 2).toUTCString()
          );
          return true;
        }
        default: {
          console.warn(
            `UNHANDLED_SIGN_IN_HANDLER: ${
              account?.provider || 'Unknown Provider'
            }`
          );
          return false;
        }
      }
    }
  }
});

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req?.url?.startsWith('/api/auth/signout')) {
    deleteCookie(GH_COOKIE_ATTR, res);
  }

  return await NextAuth(req, res, nextAuthConfig(req, res));
}
