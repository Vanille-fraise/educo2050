import React from 'react';

// No longer needs backgroundColor prop
const Background: React.FC = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden -z-10"
      style={{ backgroundColor: 'var(--dynamic-background-color, transparent)' }} // Use CSS variable with a fallback
    >
      {/* Thick border circle 1 */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full border-[24px] border-blue-400 bg-transparent opacity-50"
        style={{ transform: 'translate(-15%, -15%)' }}
      ></div>
      {/* Thick border circle 2 */}
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full border-[32px] border-purple-400 bg-transparent opacity-50"
        style={{ transform: 'translate(20%, 15%)' }}
      ></div>
      {/* Thick border circle 3 */}
      <div
        className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full border-[20px] border-pink-400 bg-transparent opacity-60"
        style={{ transform: 'translate(-50%, -50%)' }}
      ></div>
    </div>
  );
};

export default Background;
