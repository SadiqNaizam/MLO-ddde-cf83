import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Custom Components
import LuxurySiteHeader from '@/components/layout/LuxurySiteHeader';
import LuxurySiteFooter from '@/components/layout/LuxurySiteFooter';
import CinematicPageTransitionHandler from '@/components/CinematicPageTransitionHandler';
import DynamicGarmentVisualizer, { GarmentStyleDetails } from '@/components/DynamicGarmentVisualizer';
import AdvancedCustomizationInterface, { 
  GarmentCustomizationState, 
  GarmentMeasurements 
} from '@/components/AdvancedCustomizationInterface';
import AnimatedCTAButton from '@/components/AnimatedCTAButton';

// shadcn/ui components (though mostly used within AdvancedCustomizationInterface)
// No direct usage of Input, Select, RadioGroup here as ACI handles them.

// Default state for garment customization
const initialMeasurements: GarmentMeasurements = {
  neck: '',
  chest: '',
  waist: '',
  sleeveLength: '',
  shirtLength: '',
};

const initialCustomization: GarmentCustomizationState = {
  fabricId: 'silk-cream', // Default selection
  collarStyle: 'classic',
  cuffStyle: 'barrel',
  pocketStyle: 'none',
  buttonStyle: 'standard-white',
  measurements: initialMeasurements,
};

// Mock data for AdvancedCustomizationInterface props, matching its expected prop types
// These would typically come from a backend or global state
const MOCK_FABRICS_FOR_ACI = [
  { id: 'silk-cream', name: 'Cream Silk', imageUrl: 'https://images.unsplash.com/photo-1519690815010-6caff6969577?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2lsayUyMGZhYnJpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=200&h=200&q=60', description: "Luxurious and smooth cream silk." },
  { id: 'cotton-blue', name: 'Sky Blue Cotton', imageUrl: 'https://images.unsplash.com/photo-1620723084790-40f3715c0fee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y290dG9uJTIwZmFicmljfGVufDB8fDB8fHww&auto=format&fit=crop&w=200&h=200&q=60', description: "Breathable and versatile blue cotton." },
  { id: 'linen-white', name: 'Optic White Linen', imageUrl: 'https://images.unsplash.com/photo-1604291698036-f039589d145f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGluZW4lMjBmYWJyaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=200&h=200&q=60', description: "Lightweight and crisp white linen." },
  { id: 'wool-charcoal', name: 'Charcoal Wool', imageUrl: 'https://images.unsplash.com/photo-1594291587991-92492693805f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29vbCUyMGZhYnJpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=200&h=200&q=60', description: "Rich and warm charcoal wool." },
];

const MOCK_COLLAR_STYLES_FOR_ACI = [
  { id: 'classic', name: 'Classic Spread', imageUrl: 'https://via.placeholder.com/100/E0E0E0/333?text=Classic' },
  { id: 'cutaway', name: 'Cutaway', imageUrl: 'https://via.placeholder.com/100/D6D6D6/333?text=Cutaway' },
  { id: 'mandarin', name: 'Mandarin', imageUrl: 'https://via.placeholder.com/100/CCCCCC/333?text=Mandarin' },
];

const MOCK_CUFF_STYLES_FOR_ACI = [
  { id: 'barrel', name: 'Barrel Cuff', imageUrl: 'https://via.placeholder.com/100/E0E0E0/333?text=Barrel' },
  { id: 'french', name: 'French Cuff', imageUrl: 'https://via.placeholder.com/100/D6D6D6/333?text=French' },
];

const MOCK_POCKET_STYLES_FOR_ACI = [
  { id: 'none', name: 'No Pocket', imageUrl: 'https://via.placeholder.com/100/E0E0E0/333?text=No+Pocket' },
  { id: 'patch', name: 'Patch Pocket', imageUrl: 'https://via.placeholder.com/100/D6D6D6/333?text=Patch' },
];

const MOCK_BUTTON_STYLES_FOR_ACI = [
    { id: 'mother-of-pearl', name: 'Mother of Pearl', color: '#f5f0e1' }, // Creamy white
    { id: 'standard-white', name: 'Standard White', color: '#ffffff' },
    { id: 'black-horn', name: 'Black Horn', color: '#303030' }, // Dark gray/black
];


const AtelierPage = () => {
  const [customization, setCustomization] = useState<GarmentCustomizationState>(initialCustomization);
  const [garmentType] = useState<string>('Shirt'); // Could be dynamic in a fuller app
  const [cut] = useState<string>('Tailored Fit'); // Could be dynamic

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('AtelierPage loaded');
  }, []);

  const handleCustomizationChange = (newState: GarmentCustomizationState) => {
    setCustomization(newState);
    console.log('Customization updated:', newState);
  };

  const handleProceedToReview = () => {
    // Here you would typically save the customization state or pass it along
    console.log('Proceeding to review with customization:', customization);
    navigate('/order-summary-checkout'); // Path from App.tsx
  };

  // Map customization state to DynamicGarmentVisualizer props
  const visualizerStyleDetails: GarmentStyleDetails = {
    collar: customization.collarStyle,
    cuffs: customization.cuffStyle,
    pockets: customization.pocketStyle,
    buttons: customization.buttonStyle,
    // placket: could be added if part of customization
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-stone-50 to-slate-100 text-neutral-800">
      <LuxurySiteHeader />
      <CinematicPageTransitionHandler pageKey={location.pathname}>
        <main className="flex-grow container mx-auto px-4 py-8 lg:py-12">
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-neutral-900">The Atelier</h1>
            <p className="text-lg text-neutral-600 mt-2">Craft your masterpiece. Every detail, your design.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            {/* Left Column: Garment Visualizer */}
            <section className="lg:w-3/5 w-full sticky top-24 self-start"> {/* Sticky for visualizer */}
              <DynamicGarmentVisualizer
                garmentType={garmentType}
                fabric={customization.fabricId}
                cut={cut}
                styleDetails={visualizerStyleDetails}
              />
            </section>

            {/* Right Column: Customization Interface */}
            <section className="lg:w-2/5 w-full">
              <AdvancedCustomizationInterface
                initialCustomization={customization}
                onCustomizationChange={handleCustomizationChange}
                availableFabrics={MOCK_FABRICS_FOR_ACI}
                availableCollarStyles={MOCK_COLLAR_STYLES_FOR_ACI}
                availableCuffStyles={MOCK_CUFF_STYLES_FOR_ACI}
                availablePocketStyles={MOCK_POCKET_STYLES_FOR_ACI}
                availableButtonStyles={MOCK_BUTTON_STYLES_FOR_ACI}
              />
               <div className="mt-8 text-center lg:text-right">
                <AnimatedCTAButton 
                  onClick={handleProceedToReview}
                  className="w-full lg:w-auto"
                >
                  Proceed to Review & Order
                </AnimatedCTAButton>
              </div>
            </section>
          </div>
        </main>
      </CinematicPageTransitionHandler>
      <LuxurySiteFooter />
    </div>
  );
};

export default AtelierPage;