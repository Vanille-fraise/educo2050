import MediaObject from './MediaObject';
import React, { useState, useEffect, useRef } from 'react';
import { 
  MEDIA_OBJECT_ANIMATION_TIME_S, 
  MEDIA_CHAIN_CASCADE_DELAY_S 
} from '../utils/globalVariablesUtils';

interface MediaChainProps {
  items: Array<{
    title: string;
    description: string;
    imageUrl: string;
  }>;
}

const MediaChain: React.FC<MediaChainProps> = ({ items }) => {
  const [startChainAnimation, setStartChainAnimation] = useState(false);
  const chainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartChainAnimation(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, 
      }
    );

    if (chainRef.current) {
      observer.observe(chainRef.current);
    }

    return () => {
      const currentRef = chainRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative max-w-2xl mx-auto" ref={chainRef}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        // Calculate the start delay for the current MediaObject's circle animation.
        // Each MediaObject has a circle and potentially a line.
        // The first MediaObject's circle (index 0) starts at 0 * MEDIA_CHAIN_CASCADE_DELAY_S.
        // The second MediaObject's circle (index 1) starts after the first circle and first line have started,
        // so at 2 * MEDIA_CHAIN_CASCADE_DELAY_S.
        // Generally, the circle of MediaObject `index` is the (2*index)-th animation part in the sequence.
        const objectStartDelay_s = index * 2 * MEDIA_CHAIN_CASCADE_DELAY_S;

        return (
          <MediaObject
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            isLast={isLast}
            startAnimation={startChainAnimation}
            startDelay_s={objectStartDelay_s}
            partAnimationDuration={MEDIA_CHAIN_CASCADE_DELAY_S} // This is the delay between this object's circle and its line
            visualAnimationDuration_s={MEDIA_OBJECT_ANIMATION_TIME_S} // This is how long the circle/line animates for
          />
        );
      })}
    </div>
  );
};

export default MediaChain;
