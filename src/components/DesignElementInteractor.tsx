import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ImageIcon } from 'lucide-react';

export interface DesignElementOption {
  id: string | number; // Unique identifier for the option
  name: string; // Display name of the option (e.g., "Classic Collar")
  imageUrl?: string; // Optional URL for an image representing the option
  description?: string; // Optional short description for a tooltip
}

export interface DesignElementInteractorProps {
  elementName: string; // Name of the design element being configured (e.g., "Collar Style")
  options: DesignElementOption[]; // Array of available options
  selectedOptionId: string | number | null; // ID of the currently selected option
  onSelectOption: (optionId: string | number) => void; // Callback when an option is selected
  onHoverOption?: (optionId: string | number | null) => void; // Optional callback for hover events
  className?: string; // Optional additional class names for the root Card
}

const DesignElementInteractor: React.FC<DesignElementInteractorProps> = ({
  elementName,
  options,
  selectedOptionId,
  onSelectOption,
  onHoverOption,
  className,
}) => {
  console.log(`DesignElementInteractor loaded for: ${elementName}`);

  const handleSelect = (value: string) => {
    // RadioGroup value is always string. Find the original option to pass the original ID type.
    const selectedOpt = options.find(opt => opt.id.toString() === value);
    if (selectedOpt) {
      onSelectOption(selectedOpt.id);
    }
  };

  const baseOptionId = `option-${elementName.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4 pt-5 px-5">
        <CardTitle className="text-lg font-semibold">{elementName}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        {options.length > 0 ? (
          <RadioGroup
            value={selectedOptionId?.toString() || ""}
            onValueChange={handleSelect}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {options.map((option) => {
              const uniqueOptionId = `${baseOptionId}-${option.id}`;
              return (
                <TooltipProvider key={option.id} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className="h-full" // Ensure div takes full height for proper click area
                        onMouseEnter={() => onHoverOption?.(option.id)}
                        onMouseLeave={() => onHoverOption?.(null)}
                      >
                        <RadioGroupItem
                          value={option.id.toString()}
                          id={uniqueOptionId}
                          className="peer sr-only" // Visually hide the radio button
                        />
                        <Label
                          htmlFor={uniqueOptionId}
                          className={cn(
                            "flex flex-col items-center justify-start text-center p-3 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out h-full",
                            "hover:shadow-md hover:border-primary/60",
                            "peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:shadow-lg",
                            "bg-background hover:bg-accent"
                          )}
                        >
                          {option.imageUrl ? (
                            <img
                              src={option.imageUrl}
                              alt={option.name}
                              className="w-20 h-20 object-contain mb-2 rounded-md pointer-events-none"
                            />
                          ) : (
                            <div className="w-20 h-20 bg-muted rounded-md mb-2 flex items-center justify-center text-muted-foreground pointer-events-none">
                              <ImageIcon className="w-10 h-10" />
                            </div>
                          )}
                          <span className="text-xs sm:text-sm font-medium line-clamp-2 leading-tight">
                            {option.name}
                          </span>
                        </Label>
                      </div>
                    </TooltipTrigger>
                    {option.description && (
                      <TooltipContent side="bottom" className="max-w-[200px] text-sm p-2">
                        <p>{option.description}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </RadioGroup>
        ) : (
          <p className="text-sm text-muted-foreground">No options available for {elementName}.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DesignElementInteractor;