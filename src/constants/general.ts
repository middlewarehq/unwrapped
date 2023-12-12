// Environment variables
export const DEV = 'development';

export const PROD = 'production';

export const websiteUrl = process.env.NEXTAUTH_URL;

// Card dimensions
export const CARD_WIDTH = '400px';

export const CARD_HEIGHT = '600px';

export const SCALE_FACTOR = 3;

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
  red: '#F49783',
  orange: '#FB8500',
  teal: '#58C3DC',
  purple: '#A870F7',
  indigo: '#596CD0',
  grey: '#B7B7B7',
  pink: '#EF90D4',
  pearlGreen: '#71C99A',
  lightGreen: '#1CB0B0',
  coralPink: '#E16666',
  babyBlue: '#67B8F3',
  yellow: '#E2A300',
  green: '#71CB7F',
  midnight: '#442773'
};
