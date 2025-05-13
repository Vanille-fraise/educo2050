import ColorThief from 'colorthief/dist/color-thief.mjs';

// Helper function to convert RGB array to hex string
const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.round(x).toString(16); // Ensure x is an integer before toString
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

// Helper function to convert hex string to RGB object
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  if (!hex) return null;
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Function to ensure a color string is in hex format
export const ensureHex = (colorString: string): string => {
  if (colorString.startsWith("#")) {
    return colorString; // Already hex
  }
  if (colorString.startsWith("rgb")) {
    const rgbMatch = colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
    if (rgbMatch) {
      return rgbToHex(parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3]));
    }
  }
  // Add other conversions if needed, e.g., color names
  return colorString; // Return original if no conversion applied (or add error handling)
};

// Function to adjust brightness of a hex color
export const adjustHexColorBrightness = (hexColor: string, percent: number): string => {
  const ensuredHex = ensureHex(hexColor); // Ensure it's hex first
  const rgb = hexToRgb(ensuredHex);
  if (!rgb) return ensuredHex; // Return (potentially converted) color if RGB parsing fails

  const factor = percent / 100;
  let { r, g, b } = rgb;

  // Adjust RGB values, ensuring they stay within 0-255
  r = Math.max(0, Math.min(255, r + (255 * factor)));
  g = Math.max(0, Math.min(255, g + (255 * factor)));
  b = Math.max(0, Math.min(255, b + (255 * factor)));

  return rgbToHex(r, g, b);
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
  const ensuredHex = ensureHex(hexColor);
  const rgb = hexToRgb(ensuredHex);
  if (!rgb) return '#000000';

  // Calculate luminance (per WCAG formula)
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-procedure
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;

  // Return black for light backgrounds, white for dark backgrounds
  // The threshold 0.5 is a common starting point, can be adjusted
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
