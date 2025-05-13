import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  text: string;
  // No longer needs textColor prop
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, title, text }) => {
  const textStyle: React.CSSProperties = {
    color: 'var(--dynamic-text-color, #000000)', // Use CSS variable with a fallback to black
  };

  return (
    <main className="flex-grow flex items-center justify-center p-8 pt-20 sm:pt-20">
      <div className="flex flex-col sm:flex-row items-center gap-8 mx-auto max-w-7xl w-full"> {/* Added mx-auto max-w-7xl w-full for better centering and bounds for very large screens */}
        <div className="relative w-full sm:w-auto"> {/* Ensure wrapper can accommodate image size */}
          <Image
            src={imageSrc}
            alt={title}
            width={1200} // Intrinsic width of the source image for quality
            height={800} // Intrinsic height of the source image for quality
            className="w-full sm:w-96 md:w-[600px] lg:w-[800px] h-auto rounded-lg shadow-2xl object-cover" // Responsive width and auto height
          />
        </div>
        {/* Apply textStyle to the div containing text elements */}
        <div style={textStyle} className="max-w-md">
          {/* Tailwind's text-gray-700 might be overridden by inline style. Remove if not needed. */}
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-base">{text}</p>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
