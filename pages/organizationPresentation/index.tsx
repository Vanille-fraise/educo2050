import MainLayout from '../../components/layouts/MainLayout';
import TimelineItem from '../../components/timeline/TimelineItem';

const OrganizationPresentationPage = () => {
  const timelineData = [
    {
      title: "The Spark: Our First Idea",
      description: "This is how we got the very first idea of the company! It all started with a simple observation and a desire to make a difference.",
      imageUrl: "/timeline/idea.png",
    },
    {
      title: "Foundation: Building the Company",
      description: "The description of how the company got created. From concept to reality, this phase involved dedication, hard work, and a lot of coffee.",
      imageUrl: "/timeline/creation-company.png",
    },
    {
      title: "Growth: Expanding Our Horizons",
      description: "As we grew, we encountered new challenges and opportunities, continuously learning and adapting to better serve our community.",
      imageUrl: "/timeline/growth.png",
    },
    // Add more steps here as your company grows
  ];

  return (
    <MainLayout pageColor="#ADD8E6"> {/* Light Blue background */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Journey</h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Discover the story of our company, from its humble beginnings to where we are today.
        </p>

        <div className="relative max-w-2xl mx-auto">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              isLast={index === timelineData.length - 1}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default OrganizationPresentationPage;
