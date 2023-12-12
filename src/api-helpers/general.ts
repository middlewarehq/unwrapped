export function arrayBufferToBuffer(arrayBuffer: ArrayBuffer): Buffer {
  const uint8Array = new Uint8Array(arrayBuffer);
  const nodeBuffer = Buffer.from(uint8Array);
  return nodeBuffer;
}

export const abbreviateNumber = (value: number): string => {
  if (value > 1000) {
    return String(Number((value / 1000).toFixed(2))) + 'K';
  }
  return String(value);
};

export type ParamsObject = { [key: string]: number | string };

export function generateParamUrl(
  baseURL: string,
  params: ParamsObject
): string {
  const paramString = Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return `${baseURL}?${paramString}`;
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number): string => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);

  return `#${hexR}${hexG}${hexB}`;
}

export function darkenHexColor(hex: string, factor: number): string {
  // Remove the '#' from the beginning of the hex code (if present)
  const cleanHex = hex.replace(/^#/, '');

  // Parse the hex values into RGB
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Apply darkness factor to each RGB component
  const darkenedR = Math.max(0, Math.round(r * (1 - factor)));
  const darkenedG = Math.max(0, Math.round(g * (1 - factor)));
  const darkenedB = Math.max(0, Math.round(b * (1 - factor)));

  // Convert the darkened RGB values back to hex
  const darkenedHex = ((darkenedR << 16) + (darkenedG << 8) + darkenedB)
    .toString(16)
    .padStart(6, '0');

  // Return the darkened hex color with the '#' prefix
  return `#${darkenedHex}`;
}
