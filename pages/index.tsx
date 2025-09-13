import MainLayout from "../components/layouts/MainLayout";
import HeroSection from "../components/HeroSection";
import Head from "next/head";

export default function HomePage() {
  const LOGO_PATH = "logo-squared-white-bg.png";
  const BG_PATH = "students-knowing-right-answer-small.jpg";

  const teamMembers = [
    {
      title: "Sacha",
      text: `Étudiant en design industriel, chef scout et entrepreneur à impact, Sacha s'est toujours intéressé aux enjeux de l'éducation comme voie de transition vers un modèle sociétal désirable.`,
      imageSrc: "/team/sacha-square.jpg",
    },
    {
      title: "Audrey",
      text: `Étudiante en Lettres et entrepreneuse clermontoise, Audrey est grandement sensible aux enjeux de notre système éducatif, qu'elle voudrait plus centré sur l'humain et les savoirs sociaux.`,
      imageSrc: "/team/audrey-square.jpg",
    },
    {
      title: "Gilles",
      text: `Étudiant en ingénierie et actif dans la vie associative, Gilles est sensible à l'impact essentiel de l'éducation sur le bien-être individuel et collectif, et aspire à mener des actions pour l'améliorer.`,
      imageSrc: "/team/gilles-square.jpg",
    },
  ];

  return (
    <>
      <MainLayout backgroundImageURL={BG_PATH}>
        <div className="flex flex-2">
          <div className="flex flex-1"></div>
          <div className="flex flex-1 flex-col">
            <div
              className="flex-grow"
              style={{ backgroundColor: "transparent" }}
            ></div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="w-1/3">
                  <img className="max-w-full" src={LOGO_PATH} alt="Logo"></img>
                </div>
                <div
                  className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-green-500 bg-clip-text text-transparent"
                  style={{ width: "fit-content" }}
                >
                  EDU'CO 2050
                </div>
              </div>
              <div
                className="flex-grow"
                style={{ backgroundColor: "transparent" }}
              ></div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-1"
          style={{
            backgroundImage:
              "linear-gradient(to top right,rgba(88, 148, 178, 0.88), #367696e0)",
          }}
        ></div>
      </MainLayout>
    </>
  );
}
