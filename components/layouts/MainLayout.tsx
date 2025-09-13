import React, { useEffect } from "react";
import Navbar, { NAVBAR_SPACE } from "../Navbar";
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
  onTopBackGroundImage?: string;
}

const siteDefaultBgColor = "white";

export default function MainLayout({
  children,
  heroImage,
  pageColor,
  backgroundImageURL,
  onTopBackGroundImage,
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

  const layoutStyle: React.CSSProperties = backgroundImageURL
    ? {
        backgroundImage: `url(${backgroundImageURL})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }
    : {};

  const onTopBackgroundStyle: React.CSSProperties = onTopBackGroundImage
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: onTopBackGroundImage,
        zIndex: 0,
      }
    : {};

  return (
    <div className={`relative min-h-screen flex flex-col`} style={layoutStyle}>
      {onTopBackGroundImage && <div style={onTopBackgroundStyle} />}
      <Background /> <Navbar />
      <main className="flex flex-col flex-grow justify-center z-10">
        <div style={{ height: NAVBAR_SPACE }}></div>
        {children}
      </main>
    </div>
  );
}
