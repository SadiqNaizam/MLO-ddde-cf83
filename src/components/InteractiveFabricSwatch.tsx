import React from 'react';
import { motion } from 'framer-motion';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CheckCircle, InfoIcon } from 'lucide-react';

// Define the structure for fabric specifications
interface FabricSpecification {
  label: string;
  value: string;
}

// Define the structure for a fabric object
// Exporting for potential use by parent component that manages fabric data
export interface Fabric {
  id: string;
  name: string; // e.g., "Italian Wool Suiting"
  colorName?: string; // e.g., "Charcoal Grey"
  thumbnailUrl: string; // URL for the small swatch image
  detailedTextureImageUrl?: string; // URL for a larger, more detailed texture image for popover
  sheenDescription?: string; // Text description of sheen, e.g., "Matte finish", "Subtle lustre"
  feelDescription?: string; // e.g. "Crisp and smooth to the touch"
  pattern?: string; // e.g. "Herringbone", "Pinstripe"
  composition?: string; // e.g., "100% Silk"
  specifications?: FabricSpecification[]; // e.g., [{ label: "Weight", value: "280gsm" }, { label: "Origin", value: "Italy" }]
}

// Define the props for the InteractiveFabricSwatch component
interface InteractiveFabricSwatchProps {
  fabric: Fabric;
  onSelect: (fabricId: string) => void;
  isSelected?: boolean;
  className?: string; // Allow parent to pass additional Tailwind classes for layout
}

const InteractiveFabricSwatch: React.FC<InteractiveFabricSwatchProps> = ({
  fabric,
  onSelect,
  isSelected = false,
  className = '',
}) => {
  console.log(`InteractiveFabricSwatch loaded for: ${fabric.name}${fabric.colorName ? ' (' + fabric.colorName + ')' : ''}`);

  const handleSelect = () => {
    onSelect(fabric.id);
  };

  return (
    <div className={`relative group ${className}`}>
      <motion.div
        onClick={handleSelect}
        className={`
          cursor-pointer rounded-lg overflow-hidden 
          border-2 transition-all duration-200 ease-in-out
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-background
          ${isSelected ? 'border-primary shadow-lg' : 'border-neutral-300 hover:border-primary/70 dark:border-neutral-700 dark:hover:border-primary/70'}
        `}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        role="button"
        aria-pressed={isSelected}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent page scroll on spacebar
            handleSelect();
          }
        }}
        aria-label={`Select fabric: ${fabric.name}${fabric.colorName ? ' - ' + fabric.colorName : ''}`}
      >
        <AspectRatio ratio={1} className="bg-muted/50">
          <img
            src={fabric.thumbnailUrl || `https://via.placeholder.com/100?text=${encodeURIComponent(fabric.name)}`}
            alt={`${fabric.name}${fabric.colorName ? ' - ' + fabric.colorName : ''} fabric swatch`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </AspectRatio>

        {isSelected && (
          <div className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground p-0.5 rounded-full z-10 shadow-md">
            <CheckCircle size={18} strokeWidth={2.5} />
          </div>
        )}
      </motion.div>

      {/* Popover for fabric details */}
      <Popover>
        <PopoverTrigger asChild>
          <motion.button
            className="
              absolute bottom-1.5 left-1.5 
              bg-background/80 hover:bg-background 
              text-foreground p-1 rounded-full 
              backdrop-blur-sm shadow-md border border-transparent hover:border-muted-foreground/30
              opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 
              focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary
              transition-opacity duration-200
            "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`More information about ${fabric.name}${fabric.colorName ? ' - ' + fabric.colorName : ''}`}
            onClick={(e) => e.stopPropagation()} // Prevent triggering onSelect from parent div
          >
            <InfoIcon size={16} />
          </motion.button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 shadow-xl rounded-lg border bg-background z-50" side="top" align="start">
          <div className="space-y-3">
            <h4 className="font-bold text-lg leading-tight text-foreground">{fabric.name}</h4>
            {fabric.colorName && <p className="text-sm text-muted-foreground -mt-2">{fabric.colorName}</p>}
            
            {fabric.detailedTextureImageUrl && (
              <div className="w-full rounded-md overflow-hidden border border-muted">
                <AspectRatio ratio={16 / 9} className="bg-muted/30">
                  <img 
                    src={fabric.detailedTextureImageUrl} 
                    alt={`Detailed texture of ${fabric.name}`} 
                    className="w-full h-full object-cover" 
                  />
                </AspectRatio>
              </div>
            )}

            {fabric.sheenDescription && <p className="text-sm text-foreground"><span className="font-medium text-muted-foreground">Sheen:</span> {fabric.sheenDescription}</p>}
            {fabric.feelDescription && <p className="text-sm text-foreground"><span className="font-medium text-muted-foreground">Feel:</span> {fabric.feelDescription}</p>}
            {fabric.pattern && <p className="text-sm text-foreground"><span className="font-medium text-muted-foreground">Pattern:</span> {fabric.pattern}</p>}
            {fabric.composition && <p className="text-sm text-foreground"><span className="font-medium text-muted-foreground">Composition:</span> {fabric.composition}</p>}

            {fabric.specifications && fabric.specifications.length > 0 && (
              <div>
                <h5 className="text-sm font-semibold mb-1 text-muted-foreground">Specifications:</h5>
                <ul className="list-disc list-inside text-sm text-foreground space-y-0.5">
                  {fabric.specifications.map((spec, index) => (
                    <li key={index}>
                      <span className="font-medium">{spec.label}:</span> {spec.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Fallback message if no specific details are provided */}
            {!fabric.detailedTextureImageUrl && 
             !fabric.sheenDescription && 
             !fabric.feelDescription && 
             !fabric.pattern && 
             !fabric.composition && 
             (!fabric.specifications || fabric.specifications.length === 0) && (
              <p className="text-sm text-muted-foreground italic">No detailed information available for this fabric.</p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InteractiveFabricSwatch;