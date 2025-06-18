import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Included for completeness, though primarily used by sub-components

// Custom Components
import LuxurySiteHeader from '@/components/layout/LuxurySiteHeader';
import CinematicPageTransitionHandler from '@/components/CinematicPageTransitionHandler';
import ParallaxSection from '@/components/ParallaxSection';
import LookbookGalleryItem from '@/components/LookbookGalleryItem';
import AnimatedCTAButton from '@/components/AnimatedCTAButton';
import LuxurySiteFooter from '@/components/layout/LuxurySiteFooter';

// Shadcn/ui Components
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Placeholder data for LookbookGalleryItems
const lookbookCarouselItems = [
  {
    id: "collection-aurora-ss24",
    title: "Ephemeral Dreams SS'24",
    shortDescription: "Ethereal silks and avant-garde silhouettes.",
    detailedDescription: "Explore a collection that captures the fleeting beauty of dawn, blending fluid textures with bold, modern forms. Each piece is a testament to meticulous craftsmanship and visionary design.",
    mediaUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&h=900&q=80', // Portrait aspect ratio
    mediaType: 'image' as 'image' | 'video',
    tags: ['New Collection', 'Luxury Couture'],
    atelierPagePath: "/atelier",
    craftsmanshipPoints: ["Hand-finished details", "Sustainably sourced fabrics", "Timeless elegance"]
  },
  {
    id: "design-midnight-velvet",
    title: "The Obsidian Gown",
    shortDescription: "A masterpiece of nocturnal elegance.",
    detailedDescription: "Crafted from the finest Italian velvet, this gown features intricate hand-beading and a dramatic, flowing train. Designed for moments that demand unforgettable allure.",
    mediaUrl: 'https://images.unsplash.com/photo-1525991247058-1f3b60148f98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&h=900&q=80',
    mediaType: 'image' as 'image' | 'video',
    tags: ['Signature Piece', 'Evening Wear'],
    atelierPagePath: "/atelier",
    craftsmanshipPoints: ["Bespoke embroidery", "Sumptuous Italian velvet", "Structured corsetry"]
  },
  {
    id: "look-urban-voyage",
    title: "Urban Voyage Edit",
    shortDescription: "Sophisticated tailoring for the city landscape.",
    detailedDescription: "A curated selection of sharp, versatile pieces that blend comfort with high-fashion sensibility. Perfect for the discerning individual navigating the urban environment.",
    mediaUrl: 'https://images.unsplash.com/photo-1551854196-790b590c55c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&h=900&q=80',
    mediaType: 'image' as 'image' | 'video',
    tags: ['Ready-to-Wear', 'Modern Classic'],
    atelierPagePath: "/atelier",
    craftsmanshipPoints: ["Precision tailoring", "Luxurious everyday fabrics", "Versatile styling"]
  }
];

const signatureDesigns = [
   {
    id: "design-sculpted-blazer-01",
    title: "The Geo-Sculpt Blazer",
    shortDescription: "Architectural tailoring for the modern visionary.",
    detailedDescription: "A statement piece that redefines power dressing, featuring innovative pattern cutting and luxurious Japanese wool suiting.",
    mediaUrl: 'https://images.unsplash.com/photo-1617114919949-70c401573f53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&h=900&q=80',
    mediaType: 'image' as 'image' | 'video',
    tags: ['Avant-Garde', 'Tailoring'],
    atelierPagePath: "/atelier",
    craftsmanshipPoints: ["Innovative 3D pattern", "Premium Japanese wool", "Sharp silhouette"]
  },
  {
    id: "design-liquid-metal-dress-02",
    title: "Liquid Metal Slip Dress",
    shortDescription: "Fluidity and form in shimmering harmony.",
    detailedDescription: "Cut on the bias from a unique silk-blend lamé, this dress moves with ethereal grace, catching light with every step. A modern icon of understated glamour.",
    mediaUrl: 'https://images.unsplash.com/photo-1505390099498-00ac19393129?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&h=900&q=80',
    mediaType: 'image' as 'image' | 'video',
    tags: ['Iconic', 'Minimalist Luxe'],
    atelierPagePath: "/atelier",
    craftsmanshipPoints: ["Bias-cut perfection", "Custom silk-blend lamé", "Effortless elegance"]
  }
];


const HomepageLookbook = () => {
  const location = useLocation();
  console.log('HomepageLookbook loaded');

  return (
    <CinematicPageTransitionHandler pageKey={location.pathname}>
      <div className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 selection:bg-primary/30 selection:text-primary-foreground">
        <LuxurySiteHeader />
        <main className="flex-grow">
          {/* Hero Section with Parallax */}
          <ParallaxSection
            imageUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" // Striking fashion portrait
            minHeight="calc(100vh - 5rem)" // Full viewport height minus header
            strength={100}
            contentClassName="bg-black/50" // Semi-transparent overlay for text contrast
          >
            <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center h-full">
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-4 md:mb-6 leading-tight drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Craft Your Legend.
              </motion.h1>
              <motion.p 
                className="text-lg sm:text-xl md:text-2xl text-neutral-200 max-w-2xl mx-auto mb-8 md:mb-10 drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                Experience bespoke tailoring where artistry meets innovation. Design your unique statement.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              >
                <Link to="/atelier">
                  <AnimatedCTAButton className="py-3 px-10 text-lg">
                    Begin Your Atelier Journey
                  </AnimatedCTAButton>
                </Link>
              </motion.div>
            </div>
          </ParallaxSection>

          {/* Featured Collections Carousel Section */}
          <section className="py-16 md:py-24 bg-neutral-900">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-serif text-center text-neutral-100 mb-12 md:mb-16">
                Featured Collections
              </h2>
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full max-w-6xl mx-auto"
              >
                <CarouselContent className="-ml-4">
                  {lookbookCarouselItems.map((item, index) => (
                    <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <LookbookGalleryItem {...item} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="text-white bg-neutral-800/70 hover:bg-neutral-700/90 border-neutral-700 hover:border-neutral-600 left-[-15px] sm:left-[-25px] md:left-[-50px]" />
                <CarouselNext className="text-white bg-neutral-800/70 hover:bg-neutral-700/90 border-neutral-700 hover:border-neutral-600 right-[-15px] sm:right-[-25px] md:right-[-50px]" />
              </Carousel>
            </div>
          </section>

          {/* Signature Designs Section */}
          <section className="py-16 md:py-24 bg-neutral-950">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-serif text-center text-neutral-100 mb-12 md:mb-16">
                Signature Designs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                {signatureDesigns.map((item) => (
                  <LookbookGalleryItem key={item.id} {...item} />
                ))}
              </div>
               <div className="text-center mt-12 md:mt-16">
                <Link to="/collections">
                  <AnimatedCTAButton variant="outline" className="py-3 px-10 text-lg border-neutral-700 hover:bg-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white">
                    Explore All Collections
                  </AnimatedCTAButton>
                </Link>
              </div>
            </div>
          </section>

        </main>
        <LuxurySiteFooter />
      </div>
    </CinematicPageTransitionHandler>
  );
};

export default HomepageLookbook;