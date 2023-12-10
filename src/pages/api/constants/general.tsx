// Environment variables
export const DEV = 'development';

export const PROD = 'production';

export const websiteUrl = process.env.NEXTAUTH_URL;

// Card dimensions
export const CARD_WIDTH = '400px';

export const CARD_HEIGHT = '600px';

// Fonts
type FontStyles = {
  weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  name:
    | 'Black'
    | 'Bold'
    | 'ExtraBold'
    | 'ExtraLight'
    | 'Light'
    | 'Medium'
    | 'Regular'
    | 'SemiBold'
    | 'Thin';
};

export const INTER_FONT_STYLES: FontStyles[] = [
  { weight: 100, name: 'Thin' },
  { weight: 200, name: 'ExtraLight' },
  { weight: 300, name: 'Light' },
  { weight: 400, name: 'Regular' },
  { weight: 500, name: 'Medium' },
  { weight: 600, name: 'SemiBold' },
  { weight: 700, name: 'Bold' },
  { weight: 800, name: 'ExtraBold' },
  { weight: 900, name: 'Black' }
];

// Card colors
export const cardColorsMap = {
  red: '#AD4039',
  orange: '#FB8500',
  teal: '#219EBC',
  purple: '#A870F7',
  indigo: '#596CD0',
  grey: '#B7B7B7',
  pink: '#EF90D4',
  midnight: '#596CD0',
  lightGreen: '#1CB0B0',
  coralPink: '#E16666',
  yellow: '#E2A300'
};
