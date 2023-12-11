export const isObj = (o: any) => o?.constructor === Object;

export const flattenObj = (obj: any, parentKey = '', map = {}) => {
  if (!isObj(obj)) return obj;

  for (let key in obj) {
    if (isObj(obj[key])) flattenObj(obj[key], `${parentKey}${key}__`, map);
    // @ts-ignore
    else map[`${parentKey}${key}`] = obj[key];
  }

  return map;
};
