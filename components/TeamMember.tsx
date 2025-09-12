import Image from "next/image";
import React from "react";

interface TeamMemberProps {
  imageSrc: string;
  title: string;
  text: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ imageSrc, title, text }) => {
  const textStyle: React.CSSProperties = {
    color: "var(--dynamic-text-color, #000000)", // Use CSS variable with a fallback to black
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 max-w-3xl p-4">
      {/* The flex-shrink-0 utility prevents the image from shrinking when the text content is long.
       */}
      <div className="flex-shrink-0">
        <Image
          priority
          src={imageSrc}
          alt={title}
          width={180} // Provides the intrinsic size for Next.js
          height={180}
          // Defines the visual size, circular shape, and ensures the image covers the area without distortion.
          className="w-44 h-44 rounded-full object-cover shadow-md"
        />
      </div>

      <div style={textStyle}>
        {/* Text is centered on small (stacked) screens and aligned left on larger screens.
         */}
        <h2 className="text-2xl font-bold mb-2 text-center sm:text-left">
          {title}
        </h2>
        <p className="text-lg text-center sm:text-left">{text}</p>
      </div>
    </div>
  );
};

export default TeamMember;
