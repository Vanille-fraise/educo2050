import Image from 'next/image';

interface TimelineItemProps {
  title: string;
  description: string;
  imageUrl: string;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, description, imageUrl, isLast }) => {
  return (
    <div className="flex">
      {/* Left column: Circle and connecting line */}
      <div className="flex flex-col items-center mr-6">
        {/* Circle */}
        <div className="flex-shrink-0 w-20 h-20 rounded-full border-4 border-dashed border-blue-600 bg-white flex items-center justify-center z-10 relative shadow-md">
          <Image src={imageUrl} alt={title} width={64} height={64} className="rounded-full object-cover revert-layer" />
        </div>
        {/* Vertical line (if not the last item) */}
        {!isLast && (
          <div className="w-1 flex-grow border-l-4 border-dashed border-blue-600 mt-2 mb-2"></div>
        )}
      </div>

      {/* Right column: Text content */}
      <div className={`pt-5 ${isLast ? 'pb-5' : ''} ${!isLast ? 'pb-8' : ''}`}> {/* Added pb-8 for non-last items to ensure space for line growth */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
