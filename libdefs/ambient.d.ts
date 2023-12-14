declare type AnyFunction = (...args: any[]) => any | Promise<any>;
declare type AnyAsyncFunction = (...args: any[]) => Promise<any>;

declare type ID = string;
declare type Timestamp = string;
declare type DateString = string;

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_APP_ENVIRONMENT: 'production' | 'development';
    NEXT_PUBLIC_APP_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    INTERNAL_API_BASE_URL: string;
    TOKEN_ENC_PUB_KEY: string;
    TOKEN_ENC_PRI_KEY: string;
    SENTRY_DSN: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    UNWRAPPED_PERSISTENCE_BUCKET_NAME: string;
    NEXT_PUBLIC_MIXPANEL: string;
    ZAPIER_WEBHOOK_URL: string;
    NEXT_PUBLIC_GA: string;
    GLOBAL_GH_PAT: string;
  }
}
