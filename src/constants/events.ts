import mixpanel from 'mixpanel-browser';

import { flattenObj } from '@/utils/datatype';
import { objectEnum } from '@/utils/enum';

enum TrackEventEnum {
  WINDOW_FOCUS,
  WINDOW_BLUR,
  WINDOW_UNLOAD,
  CREATE_UNWRAPPED_IMAGES_CLICKED,
  UNWRAP_YOUR_YEAR_CLICKED,
  LOGIN_CLICKED,
  SIGN_OUT_CLICKED,
  ZIP_DOWNLOAD_CLICKED,
  PDF_DOWNLOAD_CLICKED,
  LINKEDIN_SHARE_CLICKED,
  SINGLE_IMAGE_SHARE_CLICKED,
  NEXT_IMAGE_CLICKED,
  PREV_IMAGE_CLICKED,
  SEE_HOW_WE_MANAGE_YOUR_TRUST_CLICKED,
  SEE_HOW_2023_WAS_FOR_TOP_DEVS_CLICKED,
  SINGLE_IMAGE_PUBLIC_LINK_COPIED
}

export const ALLOW_TRACKING_KEY = 'ALLOW_TRACKING';

export const TrackEvents = objectEnum(TrackEventEnum);

export const track = (ev: keyof typeof TrackEvents, props: any = {}) => {
  const allowTracking = localStorage.getItem(ALLOW_TRACKING_KEY) === 'true';
  if (!allowTracking) return;
  mixpanel.track(ev, flattenObj(props));
};
