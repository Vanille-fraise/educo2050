import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import Background from '../Background';
import { getDominantColor, getContrastTextColor, ensureHex } from '../../utils/colorUtils';

interface MainLayoutProps {
  children: React.ReactNode;
  heroImage?: string;      // For pages that want an image-derived background
  pageColor?: string;      // For pages specifying a static background color
}

const siteDefaultBgColor = "white"; // Site-wide default background color

export default function MainLayout({ children, heroImage, pageColor }: MainLayoutProps) {

  useEffect(() => {
    let newBgColor = pageColor || siteDefaultBgColor;
    let newTextColor = getContrastTextColor(newBgColor);

    const updateGlobalColors = (bgColorToSet: string, textColorToSet: string) => {
      if (typeof window !== 'undefined') {
        document.documentElement.style.setProperty('--dynamic-background-color', ensureHex(bgColorToSet));
        document.documentElement.style.setProperty('--dynamic-text-color', textColorToSet);
      }
    };

    if (heroImage) {
      getDominantColor(heroImage)
        .then(imgBgColor => {
          if (imgBgColor) {
            newBgColor = imgBgColor;
            newTextColor = getContrastTextColor(imgBgColor);
          }
          updateGlobalColors(newBgColor, newTextColor);
        })
        .catch(error => {
          console.error("Failed to get dominant color in layout:", error);
          updateGlobalColors(pageColor || siteDefaultBgColor, getContrastTextColor(pageColor || siteDefaultBgColor));
        });
    } else {
      updateGlobalColors(newBgColor, newTextColor);
    }
  }, [heroImage, pageColor]); // Re-run if heroImage or pageColor props change

  return (
    <div
      className={`relative min-h-screen flex flex-col`}
    >
      <Background /> {/* This will pick up the --dynamic-background-color set by this layout */}
      <Navbar />     {/* This uses --dynamic-text-color set by this layout */}
      <main className="flex flex-grow items-center justify-center z-10 pt-16 sm:pt-20"> {/* Added flex, items-center, justify-center */}
        {children}
      </main>
      {/* You could add a common <Footer /> component here too */}
    </div>
  );
}
