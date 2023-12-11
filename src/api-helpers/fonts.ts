import fs from 'fs';
import path from 'path';

export const getFontsForImageGeneration = async (
  env?: 'browser' | 'node'
): Promise<ArrayBuffer[] | Buffer[]> => {
  // fetch works in browser only, not in node, vice-versa with fs
  console.log({ env });
  if (env === 'browser') {
    const fonts = await Promise.all([
      fetch(
        new URL('public/assets/fonts/Inter-Thin.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('public/assets/fonts/Inter-ExtraLight.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('public/assets/fonts/Inter-Light.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('public/assets/fonts/Inter-Regular.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('public/assets/fonts/Inter-Medium.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('public/assets/fonts/Inter-SemiBold.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('public/assets/fonts/Inter-Bold.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('public/assets/fonts/Inter-ExtraBold.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer()),
      fetch(
        new URL('public/assets/fonts/Inter-Black.ttf', import.meta.url)
      ).then((res) => res.arrayBuffer())
    ]);

    return fonts;
  } else {
    console.log(
      11111,
      path.join(process.cwd(), 'public', 'assets', 'fonts', 'Inter-Thin.ttf')
    );
    const Thin = fs.readFileSync(
      path.join(process.cwd(), 'public', 'assets', 'fonts', 'Inter-Thin.ttf')
    );
    const ExtraLight = fs.readFileSync(
      path.join(
        process.cwd(),
        'public',
        'assets',
        'fonts',
        'Inter-ExtraLight.ttf'
      )
    );
    const Light = fs.readFileSync(
      path.join(process.cwd(), 'public', 'assets', 'fonts', 'Inter-Light.ttf')
    );
    const Regular = fs.readFileSync(
      path.join(process.cwd(), 'public', 'assets', 'fonts', 'Inter-Regular.ttf')
    );
    const Medium = fs.readFileSync(
      path.join(process.cwd(), 'public', 'assets', 'fonts', 'Inter-Medium.ttf')
    );
    const SemiBold = fs.readFileSync(
      path.join(
        process.cwd(),
        'public',
        'assets',
        'fonts',
        'Inter-SemiBold.ttf'
      )
    );
    const Bold = fs.readFileSync(
      path.join(process.cwd(), 'public', 'assets', 'fonts', 'Inter-Bold.ttf')
    );
    const ExtraBold = fs.readFileSync(
      path.join(
        process.cwd(),
        'public',
        'assets',
        'fonts',
        'Inter-ExtraBold.ttf'
      )
    );
    const Black = fs.readFileSync(
      path.join(process.cwd(), 'public', 'assets', 'fonts', 'Inter-Black.ttf')
    );

    return [
      Black,
      Bold,
      ExtraBold,
      ExtraLight,
      Light,
      Medium,
      Regular,
      SemiBold,
      Thin
    ];
  }
};
