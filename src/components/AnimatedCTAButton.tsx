import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const buttonVariants: Variants = {
  initial: {
    scale: 1,
    backgroundColor: "#171717", // neutral-900 (dark gray, almost black)
    color: "#f5f5f5", // neutral-100 (light gray, off-white)
    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
    letterSpacing: "0.05em", // Corresponds to Tailwind's tracking-wider
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  hover: {
    scale: 1.03,
    backgroundColor: "#262626", // neutral-800 (slightly lighter dark gray)
    color: "#FFFFFF", // Pure white for text on hover, for a subtle lift
    boxShadow: "0px 7px 18px rgba(0,0,0,0.20)", // Shadow becomes a bit larger and more diffused
    letterSpacing: "0.06em", // Slightly increased letter spacing for refinement
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0], // Custom cubic-bezier for smooth, elegant feel
    },
  },
  tap: {
    scale: 0.97,
    backgroundColor: "#0a0a0a", // neutral-950 or true black for a distinct tap feedback
    color: "#e5e5e5", // neutral-200, slightly dimmer text on tap
    boxShadow: "0px 3px 10px rgba(0,0,0,0.15)", // Shadow recedes slightly
    letterSpacing: "0.04em", // Slightly tighter letter spacing on tap
    transition: {
      duration: 0.15,
      ease: [0.4, 0.0, 0.2, 1], // Fast and responsive cubic-bezier for tap
    },
  },
};

const AnimatedCTAButton: React.FC<AnimatedCTAButtonProps> = ({
  children,
  className,
  type = "button", // Default button type
  ...props
}) => {
  console.log('AnimatedCTAButton loaded');

  return (
    <motion.button
      type={type}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "px-8 py-4 rounded-lg font-semibold text-base", // Base layout, typography. Adjusted for luxury feel.
        // Focus rings handled by Tailwind for robustness and accessibility.
        // Offset color matches initial background for seamless look.
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]",
        "overflow-hidden relative", // `relative` for potential children, `overflow-hidden` for effects.
        "border-none cursor-pointer", // Explicitly remove border and set cursor.
        "disabled:opacity-50 disabled:cursor-not-allowed", // Basic disabled styling
        className // Allow overriding or extending styles
      )}
      {...props}
    >
      {/* Span to ensure text is above any potential pseudo-elements or complex backgrounds if added later */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default AnimatedCTAButton;