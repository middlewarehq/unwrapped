import Mixpanel from 'mixpanel';

import { flattenObj } from '@/utils/datatype';
import { objectEnum } from '@/utils/enum';

enum TrackEventEnum {
  FOLLOWUP_USER_EMAIL
}

export const TrackNodeEvents = objectEnum(TrackEventEnum);

const isDev = process.env.NEXT_PUBLIC_APP_ENVIRONMENT === 'development';

const mixpanel = Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL, {
  keepAlive: false,
  debug: isDev
});

export const nodeTrack = (ev: keyof typeof TrackNodeEvents, props: any = {}) =>
  mixpanel.track(ev, {
    ...flattenObj(props),
    appBuiltAt: process.env.NEXT_PUBLIC_BUILD_TIME,
    environment: process.env.NEXT_PUBLIC_APP_ENVIRONMENT,
    nodeEnv: process.env.NODE_ENV
  });
