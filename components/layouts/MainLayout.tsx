import React, { useEffect } from "react";
import Navbar from "../Navbar";
import Background from "../Background";
import {
  getDominantColor,
  getContrastTextColor,
  ensureHex,
} from "../../utils/colorUtils";

interface MainLayoutProps {
  children: React.ReactNode;
  heroImage?: string;
  pageColor?: string;
  backgroundImageURL?: string;
}

const siteDefaultBgColor = "white";

export default function MainLayout({
  children,
  heroImage,
  pageColor,
  backgroundImageURL,
}: MainLayoutProps) {
  useEffect(() => {
    let newBgColor = pageColor || siteDefaultBgColor;
    let newTextColor = getContrastTextColor(newBgColor);

    const updateGlobalColors = (
      bgColorToSet: string,
      textColorToSet: string
    ) => {
      if (typeof window !== "undefined") {
        document.documentElement.style.setProperty(
          "--dynamic-background-color",
          ensureHex(bgColorToSet)
        );
        document.documentElement.style.setProperty(
          "--dynamic-text-color",
          textColorToSet
        );
      }
    };

    if (heroImage) {
      getDominantColor(heroImage)
        .then((imgBgColor) => {
          if (imgBgColor) {
            newBgColor = imgBgColor;
            newTextColor = getContrastTextColor(imgBgColor);
          }
          updateGlobalColors(newBgColor, newTextColor);
        })
        .catch((error) => {
          console.error("Failed to get dominant color in layout:", error);
          updateGlobalColors(
            pageColor || siteDefaultBgColor,
            getContrastTextColor(pageColor || siteDefaultBgColor)
          );
        });
    } else {
      updateGlobalColors(newBgColor, newTextColor);
    }
  }, [heroImage, pageColor]);

  return (
    <div className={`relative min-h-screen flex flex-col`}>
      <Background /> <Navbar />
      <main className="flex flex-col flex-grow justify-center z-10">
        {children}
      </main>
    </div>
  );
}
