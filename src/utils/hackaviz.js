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
