import ColorThief from 'colorthief/dist/color-thief.mjs';

// Helper function to convert RGB array to hex string
const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

export const getDominantColor = (imageUrl: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const dominantRgb = colorThief.getColor(img);
        if (dominantRgb) {
          const hexColor = rgbToHex(dominantRgb[0], dominantRgb[1], dominantRgb[2]);
          resolve(hexColor);
        } else {
          resolve(null);
        }
      } catch (error) {
        console.error('Error getting dominant color:', error);
        resolve(null);
      }
    };
    img.onerror = (error) => {
      console.error('Error loading image for color extraction:', error);
      resolve(null);
    };
    img.src = imageUrl;
  });
};

// Function to get contrasting text color
export const getContrastTextColor = (hexColor: string | undefined): string => {
  if (!hexColor) return '#000000'; // Default to black if no color provided

  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate luminance (per WCAG formula)
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // Return black for light backgrounds, white for dark backgrounds
  // The threshold 0.5 is a common starting point, can be adjusted
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};