import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';

interface LookbookGalleryItemProps {
  id: string | number;
  title: string;
  shortDescription?: string;
  detailedDescription?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  tags?: string[];
  atelierPagePath?: string;
  craftsmanshipPoints?: string[];
}

const LookbookGalleryItem: React.FC<LookbookGalleryItemProps> = ({
  id,
  title,
  shortDescription,
  detailedDescription,
  mediaUrl,
  mediaType,
  tags,
  atelierPagePath = "/atelier", // Default path from App.tsx
  craftsmanshipPoints,
}) => {
  console.log(`LookbookGalleryItem loaded for: ${title} (ID: ${id})`);

  return (
    <Card className="w-full overflow-hidden group relative shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg">
      <AspectRatio ratio={3 / 4} className="bg-gray-100">
        {mediaType === 'image' ? (
          <img
            src={mediaUrl || 'https://via.placeholder.com/600x800?text=Elegant+Design'}
            alt={`Lookbook item: ${title}`}
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        ) : (
          <video
            src={mediaUrl || 'https://via.placeholder.com/600x800.mp4?text=Fashion+Video+Placeholder'} // Placeholder for video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
            poster="https://via.placeholder.com/600x800?text=Loading+Video..." // Poster for video
          />
        )}
      </AspectRatio>

      {/* Layer for initial title and optional short description */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">{title}</h3>
        {shortDescription && <p className="text-sm text-gray-200 mt-1 truncate">{shortDescription}</p>}
      </div>

      {/* Hover Overlay for detailed information and CTA */}
      <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-4 md:p-6 space-y-3 md:space-y-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white">{title}</h3>
        
        {detailedDescription && <p className="text-gray-200 text-sm md:text-base mb-2 px-2">{detailedDescription}</p>}

        {craftsmanshipPoints && craftsmanshipPoints.length > 0 && (
          <ul className="space-y-1 text-xs md:text-sm text-gray-300 list-none text-left max-w-xs mx-auto">
            {craftsmanshipPoints.slice(0, 3).map((point, index) => ( // Limit to 3 points for brevity
              <li key={index} className="flex items-start">
                <SparklesIcon className="h-3 w-3 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        <Button asChild variant="outline" className="mt-2 md:mt-4 bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors duration-200 py-2 px-4 rounded-md">
          <Link to={atelierPagePath}>
            Customize in Atelier
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Tags/Badges */}
      {tags && tags.length > 0 && (
        <div className="absolute top-3 right-3 space-x-2 z-10">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs shadow-md">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
};

// Simple SparklesIcon component to avoid additional lucide-react import if not already heavy
const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.132 10.345a2.5 2.5 0 1 0-3.609 3.609L12 20.303l6.477-6.349a2.5 2.5 0 1 0-3.609-3.609L12 13.085l-2.868-2.74Z" />
    <path d="M12 2v4" />
    <path d="M12 18v4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="m16.24 16.24 2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M18 12h4" />
    <path d="m4.93 19.07 2.83-2.83" />
    <path d="m16.24 7.76 2.83-2.83" />
  </svg>
);


export default LookbookGalleryItem;