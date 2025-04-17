import React from "react";
import { Button } from "@/components/ui/button";

interface ScaleButtonsProps {
  currentScale: number | null;
  onApplyScale: (scale: number) => void;
  isLoading: boolean;
}

const PREDEFINED_SCALES = [100, 125, 150, 175, 200];

export const ScaleButtons: React.FC<ScaleButtonsProps> = ({
  currentScale,
  onApplyScale,
  isLoading,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold mb-1">Set Scale</span>
      <div className="flex gap-2 flex-wrap">
        {PREDEFINED_SCALES.map((scale) => (
          <Button
            key={scale}
            variant={currentScale === scale ? "default" : "outline"}
            onClick={() => onApplyScale(scale)}
            disabled={isLoading}
            type="button"
          >
            {scale}%
          </Button>
        ))}
      </div>
    </div>
  );
};
