import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Background from "../components/Background";
import { useState, useEffect } from "react";
import { getDominantColor, getContrastTextColor } from "../utils/colorUtils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface DynamicStyles extends React.CSSProperties {
  '--dynamic-background-color'?: string;
  '--dynamic-text-color'?: string;
}

export default function Home() {
  const heroImage = "/happy-classroom.webp";
  const heroTitle = "Titre de la Section Personnalisé";
  const heroText =
    "Ceci est un texte descriptif personnalisé pour la section hero. Il peut être aussi long ou court que nécessaire pour transmettre le message souhaité.";

  const [dynamicStyles, setDynamicStyles] = useState<DynamicStyles>({});

  useEffect(() => {
    getDominantColor(heroImage)
      .then(bgColor => {
        if (bgColor) {
          const contrastText = getContrastTextColor(bgColor);
          setDynamicStyles({
            '--dynamic-background-color': bgColor,
            '--dynamic-text-color': contrastText,
          });
        } else {
           // Set default fallback colors if image loading or color extraction fails
          setDynamicStyles({
            '--dynamic-background-color': 'transparent', // Or a default background
            '--dynamic-text-color': '#000000', // Default text color
          });
        }
      })
      .catch(error => {
        console.error("Failed to get dominant color:", error);
        setDynamicStyles({
          '--dynamic-background-color': 'transparent',
          '--dynamic-text-color': '#000000',
        });
      });
  }, [heroImage]);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} relative min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]`}
      style={dynamicStyles} // Apply CSS custom properties here
    >
      <Background />
      <Navbar />
      <HeroSection
        imageSrc={heroImage}
        title={heroTitle}
        text={heroText}
      />
    </div>
  );
}
