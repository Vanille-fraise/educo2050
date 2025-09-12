import Image from "next/image";
import React from "react";

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  text: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, title, text }) => {
  const textStyle: React.CSSProperties = {
    color: "var(--dynamic-text-color, #000000)", // Use CSS variable with a fallback to black
  };

  return (
    <main className="flex-grow flex items-center justify-center p-8 pt-20 sm:pt-20">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mx-auto max-w-9xl w-full">
        <div className="relative w-full sm:w-1/2">
          <Image
            priority
            src={imageSrc}
            alt={title}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg shadow-2xl object-cover"
          />
        </div>
        <div style={textStyle} className="w-full sm:w-1/2 max-w-md">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-base">{text}</p>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
