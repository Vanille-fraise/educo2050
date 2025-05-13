import MainLayout from '../components/layouts/MainLayout';
import HeroSection from '../components/HeroSection';
// Removed useState, useEffect, and color utilities as MainLayout handles them
// Removed Geist fonts as MainLayout handles them

export default function HomePage() {
  const heroImage = "/happy-classroom.webp"; // Image for this page's background
  const heroTitle = "Ici le slogan d'Educo2050";
  const heroText =
    "Ici est la description courte de l'association et de ce qu'elle fait!";

  return (
    <MainLayout heroImage={heroImage}>
      <HeroSection
        imageSrc={heroImage} 
        title={heroTitle}
        text={heroText}
      />
      {/* Any other content specific to the homepage can go here */}
    </MainLayout>
  );
}
