import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Custom Components
import LuxurySiteHeader from '@/components/layout/LuxurySiteHeader';
import LuxurySiteFooter from '@/components/layout/LuxurySiteFooter';
import CinematicPageTransitionHandler from '@/components/CinematicPageTransitionHandler';
import ParallaxSection from '@/components/ParallaxSection';
import LookbookGalleryItem from '@/components/LookbookGalleryItem';
import InteractiveFabricSwatch, { Fabric } from '@/components/InteractiveFabricSwatch'; // Import Fabric type

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Separator } from '@/components/ui/separator';
import { Tag } from 'lucide-react'; // For filter icon

// Sample Data
const lookbookItems = [
  {
    id: 'col1-item1',
    title: 'The Ethereal Gown',
    shortDescription: 'Flowing silk chiffon, hand-embroidered.',
    detailedDescription: 'A masterpiece of delicate craftsmanship, this gown features layers of ethereal silk chiffon and intricate floral embroidery. Designed for moments that last a lifetime.',
    mediaUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z293bnxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=600&q=80',
    mediaType: 'image' as 'image' | 'video',
    tags: ['Haute Couture', 'Silk', 'Evening Wear'],
    atelierPagePath: '/atelier/ethereal-gown',
    craftsmanshipPoints: ['Hand-sewn pearl details', 'Italian Silk Chiffon', 'Custom-fit bodice']
  },
  {
    id: 'col1-item2',
    title: 'The Sovereign Suit',
    shortDescription: 'Sharp tailoring in virgin wool.',
    detailedDescription: 'Command attention with The Sovereign Suit, meticulously tailored from premium virgin wool. Its structured silhouette and refined details redefine power dressing.',
    mediaUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVucyUyMHN1aXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
    mediaType: 'image' as 'image' | 'video',
    tags: ['Bespoke', 'Wool', 'Formal'],
    atelierPagePath: '/atelier/sovereign-suit',
    craftsmanshipPoints: ['Hand-stitched lapels', 'Full canvas construction', 'Bemberg lining']
  },
  {
    id: 'col2-item1',
    title: 'Avant-Garde Kimono',
    shortDescription: 'A modern take on traditional artistry.',
    detailedDescription: 'This striking kimono blends avant-garde design with traditional Japanese dyeing techniques. A wearable piece of art for the discerning collector.',
    mediaUrl: 'https://images.unsplash.com/photo-1603933570796-951a49795081?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGtpbW9ubyUyMGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
    mediaType: 'image' as 'image' | 'video',
    tags: ['Limited Edition', 'Artisan', 'Statement Piece'],
    atelierPagePath: '/atelier/avant-garde-kimono',
    craftsmanshipPoints: ['Hand-dyed silk', 'Unique pattern', 'Contemporary cut']
  },
  {
    id: 'col2-item2',
    title: 'Urban Explorer Jacket',
    shortDescription: 'Technical fabrics meet city style.',
    detailedDescription: 'The Urban Explorer Jacket is engineered for versatility and style, featuring water-resistant technical fabric and a sleek, minimalist design.',
    mediaUrl: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGVjaCUyMGphY2tldHxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=600&q=80',
    mediaType: 'image' as 'image' | 'video',
    tags: ['Techwear', 'Urban', 'Functional'],
    atelierPagePath: '/atelier/urban-explorer-jacket',
    craftsmanshipPoints: ['Weather-proof zippers', 'Recycled performance nylon', 'Ergonomic fit']
  }
];

const sampleFabrics: Fabric[] = [
  {
    id: 'fabric-velvet-navy',
    name: 'Midnight Velvet',
    colorName: 'Deep Navy',
    thumbnailUrl: 'https://images.unsplash.com/photo-1603251578650-69342570362b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF2eSUyMHZlbHZldCUyMHRleHR1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60',
    detailedTextureImageUrl: 'https://images.unsplash.com/photo-1603251578650-69342570362b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmF2eSUyMHZlbHZldCUyMHRleHR1cmV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=80',
    sheenDescription: 'Rich, deep lustre',
    composition: '100% Silk Velvet',
    specifications: [{label: 'Origin', value: 'Italy'}, {label: 'Weave', value: 'Pile'}]
  },
  {
    id: 'fabric-linen-beige',
    name: 'Desert Linen',
    colorName: 'Sand Beige',
    thumbnailUrl: 'https://images.unsplash.com/photo-1621200749033-ea02f380c126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGluZW4lMjB0ZXh0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=100&q=60',
    detailedTextureImageUrl: 'https://images.unsplash.com/photo-1621200749033-ea02f380c126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGluZW4lMjB0ZXh0dXJlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=80',
    feelDescription: 'Crisp, breathable, softens with wear',
    composition: '100% Belgian Linen',
    pattern: 'Subtle Slub Weave'
  },
  {
    id: 'fabric-cashmere-grey',
    name: 'Cloud Cashmere',
    colorName: 'Heather Grey',
    thumbnailUrl: 'https://images.unsplash.com/photo-1595883683898-9173666c19a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaG1lcmUlMjBncmV5JTIwdGV4dHVyZXxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=100&q=60',
    detailedTextureImageUrl: 'https://images.unsplash.com/photo-1595883683898-9173666c19a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzaG1lcmUlMjBncmV5JTIwdGV4dHVyZXxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=800&q=80',
    sheenDescription: 'Soft, matte finish',
    composition: '100% Mongolian Cashmere',
    specifications: [{label: 'Ply', value: '2-ply'}, {label: 'Micron', value: '15.5'}]
  },
];

const filterOptions = ['All', 'Haute Couture', 'Bespoke', 'Limited Edition', 'New Arrivals'];

const CollectionsPage: React.FC = () => {
  console.log('CollectionsPage loaded');
  const location = useLocation();
  const [selectedFabricId, setSelectedFabricId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // Show fewer items for demo purposes

  const handleFabricSelect = (fabricId: string) => {
    setSelectedFabricId(fabricId);
    // In a real app, this might open a modal or navigate to a detail view
    console.log('Fabric selected:', fabricId);
  };

  const filteredItems = activeFilter === 'All'
    ? lookbookItems
    : lookbookItems.filter(item => item.tags?.includes(activeFilter));

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
    }
  };

  return (
    <CinematicPageTransitionHandler pageKey={location.pathname}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-neutral-50 via-stone-100 to-slate-100 dark:from-neutral-900 dark:via-stone-900 dark:to-slate-900 text-neutral-800 dark:text-neutral-200">
        <LuxurySiteHeader />

        <main className="flex-grow">
          <ParallaxSection
            imageUrl="https://images.unsplash.com/photo-1504198453319-5ce911bafcde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb24lMjBtb2RlbCUyMGxhbmRzY2FwZXxlbnwwfHwwfHx8MA&auto=format&fit=crop&w=1920&q=80"
            minHeight="60vh"
            strength={100}
            contentClassName="bg-black/30 text-white"
          >
            <div className="container mx-auto text-center p-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif tracking-tight mb-4 drop-shadow-lg">
                Our Collections
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-sm">
                Discover curated ensembles and singular pieces that embody the pinnacle of bespoke luxury and artistic expression.
              </p>
            </div>
          </ParallaxSection>

          <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <Tag className="h-5 w-5 mr-2 text-neutral-500 dark:text-neutral-400 hidden sm:inline" />
              {filterOptions.map((filter) => (
                <Button
                  key={filter}
                  variant={activeFilter === filter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setActiveFilter(filter);
                    setCurrentPage(1); // Reset to first page on filter change
                  }}
                  className={`
                    rounded-full px-4 py-2 text-xs sm:text-sm transition-all duration-200
                    ${activeFilter === filter 
                      ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-300 shadow-md' 
                      : 'border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'}
                  `}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {paginatedItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {paginatedItems.map((item) => (
                  <LookbookGalleryItem key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-neutral-500 dark:text-neutral-400">No items match the current filter.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => {
                       // Basic logic for ellipsis, can be more complex
                      if (totalPages > 5 && (i > 1 && i < currentPage - 2 || i < totalPages - 2 && i > currentPage + 0)) {
                        if (i === currentPage - 2 || i === currentPage + 1) {
                           return <PaginationEllipsis key={`ellipsis-${i}`} />;
                        }
                        return null;
                      }
                      return (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </section>

          <Separator className="my-16 bg-neutral-300 dark:bg-neutral-700" />

          <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-serif font-semibold text-center mb-10">Explore Our Materials</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {sampleFabrics.map((fabric) => (
                <InteractiveFabricSwatch
                  key={fabric.id}
                  fabric={fabric}
                  onSelect={handleFabricSelect}
                  isSelected={selectedFabricId === fabric.id}
                  className="w-full h-auto" // Ensure it fits grid
                />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="link" asChild>
                <Link to="/atelier" className="text-primary hover:text-primary/80 dark:text-primary-foreground dark:hover:text-primary-foreground/80">
                  Begin Customization in the Atelier &rarr;
                </Link>
              </Button>
            </div>
          </section>
        </main>

        <LuxurySiteFooter />
      </div>
    </CinematicPageTransitionHandler>
  );
};

export default CollectionsPage;