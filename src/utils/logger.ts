import { captureException } from '@sentry/nextjs';
import { toString } from 'ramda';

type CaptureCtx = Parameters<typeof captureException>[1];

type CaptureExc = ReturnType<typeof captureException>;

export function logException(exc: string, message?: string): CaptureExc;

export function logException(exc: Error, message?: string): CaptureExc;

export function logException(exc: string, context?: CaptureCtx): CaptureExc;

export function logException(exc: Error, context?: CaptureCtx): CaptureExc;

export function logException(
  exc: string | Error,
  msgOrCtx?: string | CaptureCtx,
  ctx?: CaptureCtx
): CaptureExc | void {
  const message = typeof msgOrCtx === 'string' ? msgOrCtx : undefined;
  const context = typeof msgOrCtx === 'object' ? msgOrCtx : ctx;
  const name = (() => {
    try {
      return typeof exc === 'string'
        ? exc
        : exc instanceof Error
          ? exc.message
          : toString(exc);
    } catch (e) {
      return 'Something went wrong (even while trying to process the error)';
    }
  })();
  const stack = (() => {
    try {
      return exc instanceof Error ? exc.stack : undefined;
    } catch (e) {
      return 'Something went wrong (even while trying to process the error)';
    }
  })();

  const err = new Error(message || name);
  err.name = name;
  if (stack) err.stack = stack;

  if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT !== 'production')
    return console.error(err);

  return captureException(err, {
    ...context,
    extra: {
      // @ts-ignore because sentry wasn't exporting the correct types to make this possible otherwise
      ...context?.extra,
      internal_original_exception: exc,
      ...(exc instanceof Error
        ? {
            internal_original_exception_name: exc.name,
            internal_original_exception_message: exc.message,
            internal_original_exception_stack: exc.stack,
            stack
          }
        : {})
    }
  });
}
