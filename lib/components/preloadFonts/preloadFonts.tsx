const fontFiles = [
  new URL(/* @vite-ignore */ '../../fonts/NewsonGLS-WEB-Regular.woff2', import.meta.url).href,
  new URL(/* @vite-ignore */ '../../fonts/NewsonGLS-WEB-Medium.woff2', import.meta.url).href,
  new URL(/* @vite-ignore */ '../../fonts/NewsonGLS-WEB-Semibold.woff2', import.meta.url).href,
  new URL(/* @vite-ignore */ '../../fonts/NewsonGLS-WEB-Bold.woff2', import.meta.url).href,
] as const;

export const PreloadFonts = () => {
  return (
    <>
      {fontFiles.map((href) => (
        <link
          as="font"
          crossOrigin="anonymous"
          href={href}
          key={href}
          rel="preload"
          type="font/woff2"
        />
      ))}
    </>
  );
};

PreloadFonts.displayName = 'PreloadFonts';

export default PreloadFonts;
