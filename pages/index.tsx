import MainLayout from '../components/layouts/MainLayout';
import HeroSection from '../components/HeroSection';
import Head from 'next/head';

export default function HomePage() {
  const heroImage = "/happy-classroom.webp"; // Image for this page's background
  const heroTitle = "Ici le slogan d'Educo2050";
  const heroText =
    "Test new modif Ici est la description courte de l'association et de ce qu'elle fait!";

  return (
    <>
          <Head>
        <title>Educo 2050</title>
        <meta name="description" content="Educo 2050. L'association pour l'éducation du futur." />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
    <MainLayout heroImage={heroImage}>
      <HeroSection
        imageSrc={heroImage} 
        title={heroTitle}
        text={heroText}
      />
      {/* Any other content specific to the homepage can go here */}
    </MainLayout>
    </>
  );
}
