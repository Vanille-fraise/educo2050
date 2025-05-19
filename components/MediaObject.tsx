import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

interface MediaObjectProps {
  title: string;
  description: string;
  imageUrl: string;
  isLast?: boolean;
  startAnimation: boolean;
  startDelay_s: number; // Delay in seconds before this MediaObject's animation begins
  partAnimationDuration: number; // Stagger delay between circle and line animation starts
  visualAnimationDuration_s: number; // Actual duration of the SVG animation for circle/line
}

const MediaObject: React.FC<MediaObjectProps> = ({
  title,
  description,
  imageUrl,
  isLast = false,
  startAnimation,
  startDelay_s,
  partAnimationDuration, 
  visualAnimationDuration_s,
}) => {
  const [highlightCircle, setHighlightCircle] = useState(false);
  const [highlightLine, setHighlightLine] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const [actualLineHeight, setActualLineHeight] = useState(0);

  useEffect(() => {
    if (!isLast && lineRef.current) {
      const currentHeight = lineRef.current.offsetHeight;
      if (currentHeight !== actualLineHeight) {
        setActualLineHeight(currentHeight);
      }
    }
  }, [isLast, actualLineHeight]); 

  useEffect(() => {
    let circleTimerId: NodeJS.Timeout | null = null;
    let lineTimerId: NodeJS.Timeout | null = null;

    if (startAnimation) {
      circleTimerId = setTimeout(() => {
        setHighlightCircle(true);
      }, startDelay_s * 1000);

      if (!isLast) {
        const lineStartTime = startDelay_s + partAnimationDuration;
        if (lineRef.current && lineRef.current.offsetHeight > 0) {
            setActualLineHeight(lineRef.current.offsetHeight);
            lineTimerId = setTimeout(() => {
                setHighlightLine(true);
            }, lineStartTime * 1000);
        } else if (lineRef.current === null) { 
            lineTimerId = setTimeout(() => {
                setHighlightLine(true);
            }, lineStartTime * 1000);
        }       
      }
    } else {
      setHighlightCircle(false);
      setHighlightLine(false);
    }

    return () => {
      if (circleTimerId) clearTimeout(circleTimerId);
      if (lineTimerId) clearTimeout(lineTimerId);
    };
  }, [startAnimation, startDelay_s, partAnimationDuration, isLast]);

  const initialBorderColor = '#3B82F6'; 
  const highlightedBorderColor = '#10B981'; 
  const borderWidthString = '4px';
  const borderWidthNumerical = parseInt(borderWidthString, 10);

  const cssTransitionDuration = `${visualAnimationDuration_s}s`;
  const transitionTimingFunction = 'ease-in-out';

  const circleRadius = 40 - borderWidthNumerical / 2;
  const circleCircumference = 2 * Math.PI * circleRadius;

  const svgTransitionStyle: React.CSSProperties = {
    transitionProperty: 'stroke, stroke-dasharray, stroke-dashoffset, stroke-width',
    transitionDuration: cssTransitionDuration, 
    transitionTimingFunction: transitionTimingFunction,
    strokeLinecap: 'round',
  };

  return (
    <div className="flex items-start"> 
      <div className="flex flex-col items-center mr-10"> {/* Changed mr-8 to mr-10 */}
        <div
          className="flex-shrink-0 w-20 h-20 rounded-full bg-white flex items-center justify-center z-10 relative shadow-md overflow-hidden"
        >
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 80 80"
            preserveAspectRatio="xMidYMid meet"
          >
            <circle
              cx="40"
              cy="40"
              r={circleRadius}
              fill="none"
              stroke={highlightCircle ? highlightedBorderColor : initialBorderColor}
              strokeWidth={borderWidthNumerical}
              strokeDasharray={highlightCircle ? `${circleCircumference} 0` : `${circleCircumference} ${circleCircumference}`}
              strokeDashoffset={highlightCircle ? 0 : circleCircumference}
              style={svgTransitionStyle}
            />
          </svg>
          <Image
            src={imageUrl}
            alt={title}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover relative z-10"
          />
        </div>
        {!isLast && (
          <div
            ref={lineRef}
            className="w-1 mt-1 mb-1"
            style={{ width: `${borderWidthNumerical}px`, height: '4rem' }}
          >
            {actualLineHeight > 0 && ( 
              <svg
                width={borderWidthNumerical}
                height="100%"
                preserveAspectRatio="none"
              >
                <line
                  x1={borderWidthNumerical / 2}
                  y1="0"
                  x2={borderWidthNumerical / 2}
                  y2="100%"
                  stroke={highlightLine ? highlightedBorderColor : initialBorderColor}
                  strokeWidth={borderWidthNumerical} 
                  strokeDasharray={actualLineHeight} 
                  strokeDashoffset={highlightLine ? 0 : actualLineHeight} 
                  style={svgTransitionStyle}
                />
              </svg>
            )}
          </div>
        )}
      </div>
      <div className={`${isLast ? 'pb-5' : ''} ${!isLast ? 'pb-4' : ''}`}>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default MediaObject;
