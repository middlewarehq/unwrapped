declare type AnyFunction = (...args: any[]) => any | Promise<any>;
declare type AnyAsyncFunction = (...args: any[]) => Promise<any>;

declare type ID = string;
declare type Timestamp = string;
declare type DateString = string;

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    INTERNAL_API_BASE_URL: string;
    TOKEN_ENC_PUB_KEY: string;
    TOKEN_ENC_PRI_KEY: string;
    SENTRY_DSN: string;
  }
}
