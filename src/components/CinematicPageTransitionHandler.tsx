import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface CinematicPageTransitionHandlerProps {
  children: React.ReactNode;
  /**
   * A unique key for the current page/view.
   * Typically, this would be `location.pathname` from `react-router-dom`.
   * Changing this key triggers the transition.
   */
  pageKey: string;
}

const CinematicPageTransitionHandler: React.FC<CinematicPageTransitionHandlerProps> = ({
  children,
  pageKey,
}) => {
  console.log('CinematicPageTransitionHandler loaded, current pageKey:', pageKey);

  const cinematicVariants = {
    initial: {
      opacity: 0,
      scale: 0.97, // Start slightly smaller and faded
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8, // Duration for a graceful, cinematic feel
        ease: [0.25, 0.1, 0.25, 1.0], // Smooth ease-out curve
      },
    },
    exit: {
      opacity: 0,
      scale: 1.03, // Slightly expand on exit
      transition: {
        duration: 0.6, // Slightly faster exit
        ease: [0.75, 0.0, 0.9, 0.25], // Smooth ease-in curve
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {/*
        The `motion.div` wraps the content of each "page".
        When `pageKey` changes, AnimatePresence handles the exit of the old
        `motion.div` and the entrance of the new one.
        `mode="wait"` ensures the exit animation completes before the enter animation starts,
        preventing visual overlap of exiting and entering pages.
      */}
      <motion.div
        key={pageKey}
        variants={cinematicVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        // This div is primarily for animation; layout should be handled by
        // its children or parent components. Adding w-full might be useful
        // in some contexts, but it's omitted here to keep the component more flexible.
        // e.g., className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicPageTransitionHandler;