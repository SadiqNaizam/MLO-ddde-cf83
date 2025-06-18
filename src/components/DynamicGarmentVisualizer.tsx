import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GarmentStyleDetails {
  collar?: string;
  cuffs?: string;
  pockets?: string;
  buttons?: string;
  placket?: string;
  // Add more specific style details as needed
}

interface DynamicGarmentVisualizerProps {
  garmentType: string; // e.g., 'shirt', 'jacket', 'trousers'
  fabric: string; // e.g., 'silk-cream', 'wool-charcoal', 'cotton-blue-stripe'
  cut: string; // e.g., 'slim-fit', 'classic-fit', 'tailored'
  styleDetails: GarmentStyleDetails; // Object containing specific style choices
}

const DynamicGarmentVisualizer: React.FC<DynamicGarmentVisualizerProps> = ({
  garmentType,
  fabric,
  cut,
  styleDetails,
}) => {
  console.log('DynamicGarmentVisualizer loaded/updated. Current garment config:', { garmentType, fabric, cut, styleDetails });

  // Placeholder function to determine visual style based on fabric
  // In a real application, this could involve texture URLs, complex shaders, or 3D model variations.
  const getFabricAppearance = () => {
    let backgroundColor = '#E0E0E0'; // Default placeholder color (light grey)
    let textColor = '#333333'; // Default text color

    if (fabric.toLowerCase().includes('silk')) {
      backgroundColor = '#F5F5DC'; // Cream
      textColor = '#4A4A4A';
    } else if (fabric.toLowerCase().includes('wool')) {
      backgroundColor = '#5A5A5A'; // Charcoal
      textColor = '#FFFFFF';
    } else if (fabric.toLowerCase().includes('cotton')) {
      backgroundColor = '#ADD8E6'; // Light Blue
      textColor = '#2C3E50';
    } else if (fabric.toLowerCase().includes('linen')) {
      backgroundColor = '#FAF0E6'; // Linen
      textColor = '#5D4037';
    }
    // Add more fabric type mappings as needed
    return { backgroundColor, color: textColor, backgroundImage: `url(/textures/fabric-placeholder.png)` }; // Example texture
  };

  const currentFabricStyle = getFabricAppearance();

  // Unique key for AnimatePresence based on current garment configuration
  const animationKey = `${garmentType}-${fabric}-${cut}-${JSON.stringify(styleDetails)}`;

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] bg-gray-100 rounded-lg p-4 flex items-center justify-center overflow-hidden relative shadow-2xl border border-gray-200">
      {/* Placeholder for a digital mannequin silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <svg viewBox="0 0 150 300" className="h-full w-auto" fill="currentColor" color="#D1D5DB">
          {/* Simplified generic human silhouette */}
          <path d="M75 0 C50 0 50 30 50 60 C50 90 60 120 60 150 C60 180 50 210 75 300 C100 210 90 180 90 150 C90 120 100 90 100 60 C100 30 100 0 75 0 Z M75 10 C90 10 90 30 90 55 C90 80 80 110 80 140 C80 170 90 200 75 280 C60 200 70 170 70 140 C70 110 60 80 60 55 C60 30 60 10 75 10 Z" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          className="w-[60%] h-[80%] relative flex flex-col items-center justify-center p-6 rounded-md shadow-lg text-center"
          style={{ 
            backgroundColor: currentFabricStyle.backgroundColor, 
            color: currentFabricStyle.color,
            // In a real scenario, you might use a background image for texture:
            // backgroundImage: `url('/path/to/fabric/texture/${fabric}.jpg')`,
            // backgroundSize: 'cover',
          }}
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -30 }}
          transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }} // Custom bezier for smooth, sophisticated feel
        >
          <motion.h3 
            className="text-xl md:text-2xl font-bold mb-3 capitalize"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {garmentType.replace('-', ' ')}
          </motion.h3>
          
          <motion.div 
            className="space-y-1 text-xs md:text-sm"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                }
              }
            }}
          >
            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}>
              Fabric: <span className="font-semibold capitalize">{fabric.replace('-', ' ')}</span>
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}>
              Cut: <span className="font-semibold capitalize">{cut.replace('-', ' ')}</span>
            </motion.p>
            
            {Object.entries(styleDetails).filter(([_, value]) => value).length > 0 && (
              <motion.div className="mt-2 pt-2 border-t border-opacity-30" variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}>
                <p className="font-semibold mb-1">Details:</p>
                {Object.entries(styleDetails).map(([key, value]) => 
                  value && (
                    <motion.p 
                      key={key} 
                      className="capitalize ml-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {key.replace(/([A-Z])/g, ' $1')}: {String(value)}
                    </motion.p>
                  )
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Placeholder for more intricate visual details, e.g., animated stitching lines or buttons */}
          <motion.div 
            className="absolute top-1/4 left-10 w-2 h-8 bg-opacity-20"
            style={{ backgroundColor: currentFabricStyle.color }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            title="Detail Highlight Example"
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-3 right-3 text-xs text-gray-400 font-mono">
        DYNAMIC VISUALIZER
      </div>
    </div>
  );
};

export default DynamicGarmentVisualizer;