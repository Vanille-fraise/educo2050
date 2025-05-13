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
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative">
          <Image
            src={imageSrc}
            alt={title}
            width={300}
            height={200}
            className="rounded-lg shadow-2xl"
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
