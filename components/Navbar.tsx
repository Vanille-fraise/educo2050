import React from 'react';
import Image from 'next/image';

// No longer needs textColor prop
const Navbar: React.FC = () => {
  const linkStyle: React.CSSProperties = {
    color: 'var(--dynamic-text-color, #FFFFFF)', // Use CSS variable with a fallback to white
  };

  return (
    <nav className="absolute top-0 left-0 right-0 bg-transparent p-4 flex justify-between items-center z-10">
      <div>
        <a href="#" className="flex items-center">
          <Image
            src="/logo-squared-white-bg.png"
            alt="Company Logo"
            width={40}
            height={40}
            className="h-10 w-auto"
          />
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" style={linkStyle} className="hover:text-gray-300"> {/* Consider updating hover color too if needed */}
          Accueil
        </a>
        <a href="#" style={linkStyle} className="hover:text-gray-300">
          Services
        </a>
        <a href="#" style={linkStyle} className="hover:text-gray-300">
          À Propos
        </a>
        {/* The button text color might need to be addressed separately if it shouldn't follow --dynamic-text-color */}
        {/* For example, if it always needs to be white on a blue background. */}
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          // If button text should also be dynamic: style={{ color: 'var(--dynamic-text-color)' }} (and adjust bg)
        >
          Rejoignez nous
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
