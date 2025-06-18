import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InteractiveFabricSwatch } from '@/components/InteractiveFabricSwatch'; // Assuming it exists
import { DesignElementInteractor } from '@/components/DesignElementInteractor'; // Assuming it exists
import { SlidersHorizontal, Ruler, Palette, Shirt } from 'lucide-react';

// Define types for customization options
export interface GarmentMeasurements {
  neck: string;
  chest: string;
  waist: string;
  sleeveLength: string;
  shirtLength: string;
}

export interface GarmentCustomizationState {
  fabricId: string;
  collarStyle: string;
  cuffStyle: string;
  pocketStyle: string;
  buttonStyle: string;
  measurements: GarmentMeasurements;
}

interface AdvancedCustomizationInterfaceProps {
  initialCustomization: GarmentCustomizationState;
  onCustomizationChange: (newState: GarmentCustomizationState) => void;
  // Assuming these are the available options fetched from elsewhere
  availableFabrics: Array<{ id: string; name: string; imageUrl: string; description?: string }>;
  availableCollarStyles: Array<{ id: string; name: string; imageUrl?: string }>;
  availableCuffStyles: Array<{ id: string; name: string; imageUrl?: string }>;
  availablePocketStyles: Array<{ id: string; name: string; imageUrl?: string }>;
  availableButtonStyles: Array<{ id: string; name: string; color?: string }>;
}

// Mock Data (would typically come from props or context)
const MOCK_FABRICS = [
  { id: 'silk-cream', name: 'Cream Silk', imageUrl: 'https://via.placeholder.com/100/FFF8DC/000000?text=Silk', description: "Luxurious and smooth cream silk." },
  { id: 'cotton-blue', name: 'Blue Cotton', imageUrl: 'https://via.placeholder.com/100/ADD8E6/000000?text=Cotton', description: "Breathable and versatile blue cotton." },
  { id: 'linen-white', name: 'White Linen', imageUrl: 'https://via.placeholder.com/100/FFFFFF/000000?text=Linen', description: "Lightweight and crisp white linen." },
];

const MOCK_COLLAR_STYLES = [
  { id: 'classic', name: 'Classic Spread', imageUrl: 'https://via.placeholder.com/80/EEEEEE/000000?text=Classic' },
  { id: 'cutaway', name: 'Cutaway', imageUrl: 'https://via.placeholder.com/80/DDDDDD/000000?text=Cutaway' },
  { id: 'mandarin', name: 'Mandarin', imageUrl: 'https://via.placeholder.com/80/CCCCCC/000000?text=Mandarin' },
];

const MOCK_CUFF_STYLES = [
  { id: 'barrel', name: 'Barrel Cuff', imageUrl: 'https://via.placeholder.com/80/EEEEEE/000000?text=Barrel' },
  { id: 'french', name: 'French Cuff', imageUrl: 'https://via.placeholder.com/80/DDDDDD/000000?text=French' },
];

const MOCK_POCKET_STYLES = [
  { id: 'none', name: 'No Pocket', imageUrl: 'https://via.placeholder.com/80/EEEEEE/000000?text=None' },
  { id: 'patch', name: 'Patch Pocket', imageUrl: 'https://via.placeholder.com/80/DDDDDD/000000?text=Patch' },
];

const MOCK_BUTTON_STYLES = [
    { id: 'mother-of-pearl', name: 'Mother of Pearl', color: '#F0E68C' },
    { id: 'standard-white', name: 'Standard White', color: '#FFFFFF' },
    { id: 'black-horn', name: 'Black Horn', color: '#363636' },
];


const AdvancedCustomizationInterface: React.FC<AdvancedCustomizationInterfaceProps> = ({
  initialCustomization,
  onCustomizationChange,
  availableFabrics = MOCK_FABRICS,
  availableCollarStyles = MOCK_COLLAR_STYLES,
  availableCuffStyles = MOCK_CUFF_STYLES,
  availablePocketStyles = MOCK_POCKET_STYLES,
  availableButtonStyles = MOCK_BUTTON_STYLES,
}) => {
  console.log('AdvancedCustomizationInterface loaded');
  const [currentSelections, setCurrentSelections] = useState<GarmentCustomizationState>(initialCustomization);

  const handleFabricSelect = (fabricId: string) => {
    const newState = { ...currentSelections, fabricId };
    setCurrentSelections(newState);
    onCustomizationChange(newState);
  };

  const handleStyleSelect = (
    styleType: 'collarStyle' | 'cuffStyle' | 'pocketStyle' | 'buttonStyle',
    value: string
  ) => {
    const newState = { ...currentSelections, [styleType]: value };
    setCurrentSelections(newState);
    onCustomizationChange(newState);
  };

  const handleMeasurementChange = (field: keyof GarmentMeasurements, value: string) => {
    const newMeasurements = { ...currentSelections.measurements, [field]: value };
    const newState = { ...currentSelections, measurements: newMeasurements };
    setCurrentSelections(newState);
    onCustomizationChange(newState);
  };

  const measurementFields: Array<{ key: keyof GarmentMeasurements; label: string; placeholder: string }> = [
    { key: 'neck', label: 'Neck Circumference (cm)', placeholder: 'e.g., 38' },
    { key: 'chest', label: 'Chest Circumference (cm)', placeholder: 'e.g., 100' },
    { key: 'waist', label: 'Waist Circumference (cm)', placeholder: 'e.g., 85' },
    { key: 'sleeveLength', label: 'Sleeve Length (cm)', placeholder: 'e.g., 62' },
    { key: 'shirtLength', label: 'Shirt Length (cm)', placeholder: 'e.g., 75' },
  ];

  return (
    <Card className="w-full max-w-md shadow-2xl bg-white/80 backdrop-blur-md">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-serif text-gray-800 flex items-center">
          <SlidersHorizontal className="mr-3 h-6 w-6 text-gray-700" />
          Customize Your Garment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="fabric" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-none bg-gray-100">
            <TabsTrigger value="fabric" className="py-3 data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Palette className="mr-2 h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">Fabrics</span>
            </TabsTrigger>
            <TabsTrigger value="style" className="py-3 data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Shirt className="mr-2 h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">Styles</span>
            </TabsTrigger>
            <TabsTrigger value="details" className="py-3 data-[state=active]:bg-gray-800 data-[state=active]:text-white">
                 {/* Using Shirt icon as a placeholder for details; could be a more specific icon */}
                <Shirt className="mr-2 h-4 w-4 sm:mr-1 opacity-70" /> <span className="hidden sm:inline">Details</span>
            </TabsTrigger>
            <TabsTrigger value="measurements" className="py-3 data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              <Ruler className="mr-2 h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">Measurements</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-280px)] sm:h-[500px] p-1"> {/* Adjust height as needed */}
            <TabsContent value="fabric" className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Select Fabric</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {availableFabrics.map((fabric) => (
                  <InteractiveFabricSwatch
                    key={fabric.id}
                    fabricId={fabric.id}
                    name={fabric.name}
                    imageUrl={fabric.imageUrl}
                    description={fabric.description}
                    isSelected={currentSelections.fabricId === fabric.id}
                    onSelect={() => handleFabricSelect(fabric.id)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="style" className="p-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Collar Style</h3>
                <DesignElementInteractor
                  elementType="collar"
                  options={availableCollarStyles.map(style => ({ value: style.id, label: style.name, imageUrl: style.imageUrl }))}
                  currentValue={currentSelections.collarStyle}
                  onSelect={(value) => handleStyleSelect('collarStyle', value)}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Cuff Style</h3>
                 {/* Example using Select for cuff, could also be DesignElementInteractor */}
                <Select
                  value={currentSelections.cuffStyle}
                  onValueChange={(value) => handleStyleSelect('cuffStyle', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose cuff style" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCuffStyles.map(style => (
                      <SelectItem key={style.id} value={style.id}>{style.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="p-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Pocket Style</h3>
                <DesignElementInteractor
                    elementType="pocket"
                    options={availablePocketStyles.map(style => ({ value: style.id, label: style.name, imageUrl: style.imageUrl }))}
                    currentValue={currentSelections.pocketStyle}
                    onSelect={(value) => handleStyleSelect('pocketStyle', value)}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Button Style</h3>
                <Select
                  value={currentSelections.buttonStyle}
                  onValueChange={(value) => handleStyleSelect('buttonStyle', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose button style" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableButtonStyles.map(style => (
                      <SelectItem key={style.id} value={style.id}>
                        <div className="flex items-center">
                          {style.color && <span className="w-4 h-4 rounded-full mr-2 border border-gray-300" style={{ backgroundColor: style.color }}></span>}
                          {style.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>


            <TabsContent value="measurements" className="p-4 space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Enter Measurements</h3>
              {measurementFields.map(field => (
                <div key={field.key} className="space-y-1">
                  <Label htmlFor={field.key} className="text-sm font-medium text-gray-600">{field.label}</Label>
                  <Input
                    id={field.key}
                    type="number" // Or "text" if decimals/ranges are needed
                    placeholder={field.placeholder}
                    value={currentSelections.measurements[field.key]}
                    onChange={(e) => handleMeasurementChange(field.key, e.target.value)}
                    className="bg-white focus:border-gray-500"
                  />
                </div>
              ))}
              <p className="text-xs text-gray-500 mt-2">
                Ensure all measurements are accurate for the best fit. 
                You can save measurements to your profile for future orders.
              </p>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </CardContent>
      {/* Optional: A footer for actions like 'Save Draft' or 'Add to Bag Preview' if applicable within this component scope */}
      {/* <CardFooter className="p-4 border-t">
        <Button className="w-full">Preview Changes</Button>
      </CardFooter> */}
    </Card>
  );
};

export default AdvancedCustomizationInterface;