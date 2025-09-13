import MainLayout from "../../components/layouts/MainLayout";
import TeamMember from "@/components/TeamMember";

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

const OrganizationPresentationPage = () => {
  const textStyle: React.CSSProperties = {
    color: "var(--dynamic-text-color, #000000)", // Use CSS variable with a fallback to black
    padding: "0 32px 32px",
    width: "80%",
  };
  return (
    <MainLayout pageColor="#ffffff">
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div style={textStyle}>
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Point de départ
          </h1>
          <p className="text-base">
            <span style={{ color: "#348dadff", fontWeight: "bold" }}>
              Butterfly 2050, projet du Secrétariat Général Pour
              l'Investissement (SGPI).
            </span>
            <br />
            Rapport d'étude «L'école du nous», présentant un scénario prospectif
            désirable et réaliste pour l'école 2050, ainsi qu'une méthodologie
            «macro» de transformation du système éducatif français.
            <br />
            <br />
            <strong>
              Premier prix de la catégorie APPRENDRE EN 2050 délivré par le
              SGPI.
            </strong>
          </p>
        </div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          L'équipe
        </h1>
        {teamMembers.map((teamMember) => {
          return (
            <TeamMember
              imageSrc={teamMember.imageSrc}
              title={teamMember.title}
              text={teamMember.text}
            />
          );
        })}
      </div>
    </MainLayout>
  );
};

export default OrganizationPresentationPage;
