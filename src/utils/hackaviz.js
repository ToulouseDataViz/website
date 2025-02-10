const localPluralRules = new Intl.PluralRules('fr-FR', { type: 'ordinal' });
const ordinalSuffixes = new Map([
  ['one', 'ère'],
  ['other', 'e'],
]);
export const formatOrdinals = n => {
  const rule = localPluralRules.select(n);
  const suffix = ordinalSuffixes.get(rule);
  return `${n}${suffix}`;
};
export const getLocaleMonth = date => {
  return new Intl.DateTimeFormat('fr-FR', {
    timeStyle: undefined,
    weekday: undefined,
    year: undefined,
    month: 'long',
    day: undefined,
  }).format(date);
};
export const getLocaleYear = date => {
  return new Intl.DateTimeFormat('fr-FR', {
    timeStyle: undefined,
    weekday: undefined,
    year: 'numeric',
    month: undefined,
    day: undefined,
  }).format(date);
};
export const getLocaleDate = date => {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: undefined,
  }).format(date);
};

/**
 * Get diff in days 
 * https://stackoverflow.com/a/15289883
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns Get diff in days 
 */
export function dateDiffInDays(startDate, endDate) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return Math.ceil((utc2 - utc1) / _MS_PER_DAY);
}