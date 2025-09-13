import React from "react";
import MainLayout from "../../components/layouts/MainLayout";
import Head from "next/head";
import HeroSection from "@/components/HeroSection";

const LOGO_PATH = "logo-squared-white-bg.png";
const BG_PATH = "students-knowing-right-answer-small.jpg";

const UsSchoolPage: React.FC = () => {
  const heroImage = "/happy-classroom.webp";
  const heroTitle = "L'école du nous";
  const heroText =
    "Test new modif  another modifci est la description courte de l'association et de ce qu'elle fait!";

  return (
    <>
      <Head>
        <title>Educo 2050</title>
        <meta
          name="description"
          content="Educo 2050. L'association pour l'éducation du futur."
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <MainLayout heroImage={heroImage}>
        <HeroSection imageSrc={heroImage} title={heroTitle} text={heroText} />
      </MainLayout>
    </>
  );
};

export default UsSchoolPage;
