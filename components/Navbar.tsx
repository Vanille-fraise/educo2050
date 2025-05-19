import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link
import { SM_BREAKPOINT_PX } from '../utils/globalVariablesUtils'; // Import the breakpoint

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < SM_BREAKPOINT_PX);
      if (window.innerWidth >= SM_BREAKPOINT_PX && isMobileMenuOpen) {
        setIsMobileMenuOpen(false); // Close mobile menu if screen becomes larger
      }
    };
    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [isMobileMenuOpen]); // Add isMobileMenuOpen to dependencies

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const linkStyle: React.CSSProperties = {
    color: 'var(--dynamic-text-color, #FFFFFF)',
    fontWeight: 'bold',
  };

  const mobileLinkStyle: React.CSSProperties = {
    color: '#333', // Darker text color for better readability on the panel
    fontWeight: 'bold',
  };
  
  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/organizationPresentation", label: "Qui sommes nous" },
    { href: "#", label: "L'école du nous" },
    { href: "#", label: "Notre équipe" },
    { href: "#", label: "Nos actions" },
  ];

  return (
    <nav className="absolute top-0 left-0 right-0 bg-transparent p-4 flex justify-between items-center z-20">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" legacyBehavior><a> {/* Updated logo href to root and used Link */}
          <Image
            src="/logo-squared-white-bg.png"
            alt="Company Logo"
            width={40}
            height={40}
            className="h-10"
            style={{ width: 'auto' }}
          />
        </a></Link>
      </div>

      {/* Desktop Navigation Links & Contact Button */}
      {!isSmallScreen && (
        <div className="hidden sm:flex items-center space-x-4 md:space-x-14">
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} legacyBehavior><a style={linkStyle} className="hover:text-gray-300">
              {link.label}
            </a></Link>
          ))}
          <Link href="/contactPage" legacyBehavior><a>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Nous contacter
            </button>
          </a></Link>
        </div>
      )}

      {/* Combined Burger/Close Menu Icon (Visible on small screens) */}
      {isSmallScreen && (
        <button
          onClick={toggleMobileMenu}
          className={`focus:outline-none z-40 ${isMobileMenuOpen ? 'text-gray-700' : 'text-white'}`}
          style={!isMobileMenuOpen ? { color: 'var(--dynamic-text-color, #FFFFFF)' } : {}}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMobileMenuOpen ? (
            // Close Icon (X)
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Burger Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      )}

      {/* Mobile Menu Panel (Glassy, slides from right) */}
      {isSmallScreen && (
        <div 
          className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-white/20 backdrop-blur-md shadow-xl z-30 p-6 pt-16 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="flex flex-col space-y-4">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href} legacyBehavior><a style={mobileLinkStyle} className="hover:text-blue-500 py-2" onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}>
                {link.label}
              </a></Link>
            ))}
            <Link href="/contactPage" legacyBehavior><a>
              <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                onClick={isMobileMenuOpen ? toggleMobileMenu : undefined}
              >
                Contactez nous
              </button>
            </a></Link>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
