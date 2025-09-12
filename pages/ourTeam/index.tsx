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
  return (
    <MainLayout pageColor="#ffffff">
      <div className="min-h-screen flex flex-col items-center justify-center">
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
