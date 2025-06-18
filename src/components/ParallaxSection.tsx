import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  imageUrl: string;
  children: React.ReactNode;
  minHeight?: string; // e.g., '70vh', '500px'
  strength?: number; // Strength of the parallax effect in pixels, e.g., 50
  className?: string; // Additional classes for the main section element
  contentClassName?: string; // Additional classes for the content container
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  imageUrl,
  children,
  minHeight = '70vh',
  strength = 50, // Default strength: background moves 50px up/down
  className = '',
  contentClassName = '',
}) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], // Effect active when section is in viewport
  });

  // yTransform will move the background div.
  // When scrollYProgress is 0 (section's top enters viewport's bottom), background is shifted up by `strength` pixels.
  // When scrollYProgress is 1 (section's bottom exits viewport's top), background is shifted down by `strength` pixels.
  const yTransform = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  console.log('ParallaxSection loaded');

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      <motion.div
        className="absolute left-0 right-0 z-0" // Will cover the section
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: yTransform, // Apply the parallax transform here
          // Make the background div taller than the section to allow for movement
          // It needs to be taller by `2 * strength` pixels to accommodate the full range of motion.
          // Position it `strength` pixels above its normal top to center the movement.
          top: `-${strength}px`,
          bottom: `-${strength}px`,
        }}
      />
      <div
        className={`relative z-10 flex flex-col items-center justify-center h-full ${contentClassName}`}
        style={{ minHeight }} // Ensure content container also respects minHeight
      >
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;