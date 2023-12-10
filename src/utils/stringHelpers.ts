export const capitalize = (sentence?: string): string => {
  if (!sentence) return '';
  return sentence.replace(/\b\w/g, (match) => match.toUpperCase());
};
