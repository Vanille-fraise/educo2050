import React, { useEffect, useState } from 'react';
import { adjustHexColorBrightness, ensureHex } from '../utils/colorUtils';

const Background: React.FC = () => {
  const offsetVariation = 0.05; // 5% variation

  // Define initial offsets as constants
  const INITIAL_CIRCLE1_OFFSET = { x: -30, y: -81 };
  const INITIAL_CIRCLE2_OFFSET = { x: -30, y: 0 };

  const [gradientStyle, setGradientStyle] = useState({});
  const [circle1Offset, setCircle1Offset] = useState(INITIAL_CIRCLE1_OFFSET);
  const [circle2Offset, setCircle2Offset] = useState(INITIAL_CIRCLE2_OFFSET);

  useEffect(() => {
    const updateGradient = () => {
      if (typeof window !== 'undefined') {
        const rootStyle = getComputedStyle(document.documentElement);
        const baseColor = rootStyle.getPropertyValue('--dynamic-background-color').trim();
        
        if (baseColor) {
          const hexBaseColor = ensureHex(baseColor);
          const lighterShade = adjustHexColorBrightness(hexBaseColor, 20);
          const darkerShade = adjustHexColorBrightness(hexBaseColor, -5);

          setGradientStyle({
            background: `linear-gradient(to bottom left, ${lighterShade}, ${darkerShade})`,
            transition: 'background 0.5s ease',
          });
        } else {
            const defaultHex = "#ffffff";
            const lighterDefault = adjustHexColorBrightness(defaultHex, 30);
            const darkerDefault = adjustHexColorBrightness(defaultHex, -30);
            setGradientStyle({
                background: `linear-gradient(to bottom left, ${lighterDefault}, ${darkerDefault})`,
                transition: 'background 0.5s ease',
            });
        }
      }
    };

    updateGradient();

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          updateGradient(); 
          break;
        }
      }
    });

    if (typeof window !== 'undefined') {
        observer.observe(document.documentElement, { attributes: true });
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (typeof window !== 'undefined') {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        const mouseXPercent = (clientX / innerWidth - 0.5) * 2; // -1 (left) to 1 (right)
        const mouseYPercent = (clientY / innerHeight - 0.5) * 2; // -1 (top) to 1 (bottom)

        // Inverted logic: Mouse X affects Circle X, Mouse Y affects Circle Y
        // If mouse is far right (mouseXPercent = 1), apply positive offsetVariation to X (moves circle left if initial X is negative)
        // If mouse is far left (mouseXPercent = -1), apply negative offsetVariation to X (moves circle right if initial X is negative)
        setCircle1Offset({
          x: INITIAL_CIRCLE1_OFFSET.x * (1 + mouseXPercent * offsetVariation),
          y: INITIAL_CIRCLE1_OFFSET.y * (1 + mouseYPercent * offsetVariation),
        });
        setCircle2Offset({
          x: INITIAL_CIRCLE2_OFFSET.x * (1 + mouseXPercent * offsetVariation),
          y: INITIAL_CIRCLE2_OFFSET.y * (1 + mouseYPercent * offsetVariation),
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      observer.disconnect();
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden -z-10"
      style={gradientStyle}
    >
      <div
        className="absolute -top-1/4 -left-1/4 w-[6000px] h-[6000px] rounded-full border-[100px] opacity-50"
        style={{
            borderColor: '#33F2D9',
            transform: `translate(${circle1Offset.x}%, ${circle1Offset.y}%)`,
            transition: 'transform 0.2s ease-out'
        }}
      ></div>
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[1500px] h-[1500px] rounded-full border-[80px] opacity-50"
        style={{
            borderColor: '#33F2D9',
            transform: `translate(${circle2Offset.x}%, ${circle2Offset.y}%)`,
            transition: 'transform 0.2s ease-out'
        }}
      ></div>
    </div>
  );
};

export default Background;
