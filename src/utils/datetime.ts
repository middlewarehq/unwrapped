import { secondsToMinutes, secondsToHours } from 'date-fns';
import pluralize from 'pluralize';

export const getDurationString = (
  secs?: number,
  options: {
    placeHolderTxtForNullValue?: string;
    /** How many parts of the time to show? At least 1 will always be shown. Max will be shown in the time. */
    segments?: number;
    /** If time is less than 60s, it'll return `< 1m`, else it'll return `42s` or something */
    showLt60AsSecs?: boolean;
    longForm?: boolean;
  } = {}
) => {
  options = Object.assign(
    { segments: 2, showLt60AsSecs: true } as typeof options,
    options
  );

  const segments = Number(options?.segments);
  const longForm = Boolean(options?.longForm);

  if (!secs || secs < 0) return options.placeHolderTxtForNullValue || null;
  if (secs < 60)
    return options?.showLt60AsSecs ? `${Math.ceil(secs)}s` : '< 1m';

  const mins = secondsToMinutes(secs);
  if (!mins) return null;
  const remainingSecs = Math.floor(secs % 60);
  const remainingSecsText = longForm
    ? `${remainingSecs} ${pluralize('second', remainingSecs)}`
    : 's';

  if (mins < 60)
    return [`${mins}${longForm ? ` ${pluralize('minute', mins)}` : 'm'}`]
      .concat(segments > 1 && remainingSecs ? remainingSecsText : '')
      .filter(Boolean)
      .join(longForm ? ', ' : ' ');

  const hours = secondsToHours(secs);
  const remainingMins = Math.floor(mins % 60);
  const remainingMinsText = longForm
    ? `${remainingMins} ${pluralize('minute', remainingMins)}`
    : 'm';

  if (hours < 24)
    return [`${hours}${longForm ? ` ${pluralize('hour', hours)}` : 'h'}`]
      .concat(segments > 1 && remainingMins ? remainingMinsText : '')
      .concat(segments > 2 && remainingSecs ? remainingSecsText : '')
      .filter(Boolean)
      .join(longForm ? ', ' : ' ');

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;
  const remainingHoursText = longForm
    ? `${remainingHours} ${pluralize('hour', remainingHours)}`
    : 'h';

  if (days < 7) {
    return [`${days}${longForm ? ` ${pluralize('day', days)}` : 'd'}`]
      .concat(segments > 1 && remainingHours ? remainingHoursText : '')
      .concat(segments > 2 && remainingMins ? remainingMinsText : '')
      .concat(segments > 3 && remainingSecs ? remainingSecsText : '')
      .filter(Boolean)
      .join(longForm ? ', ' : ' ');
  }

  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  const remainingDaysText = longForm
    ? `${remainingDays} ${pluralize('day', remainingDays)}`
    : 'h';

  return [`${weeks}${longForm ? ` ${pluralize('week', weeks)}` : 'w'}`]
    .concat(segments > 1 && remainingDays ? remainingDaysText : '')
    .concat(segments > 2 && remainingHours ? remainingHoursText : '')
    .concat(segments > 3 && remainingMins ? remainingMinsText : '')
    .concat(segments > 4 && remainingSecs ? remainingSecsText : '')
    .filter(Boolean)
    .join(longForm ? ', ' : ' ');
};
