import React from "react";

interface ScaleDisplayProps {
  currentScale: number | null;
  isloading?: boolean;
}

export const ScaleDisplay: React.FC<ScaleDisplayProps> = ({
  currentScale,
  isloading = false,
}) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="font-semibold">Current Scale</span>
      <div className="text-2xl">
        {isloading ? (
          <span className="animate-pulse text-muted">Loading...</span>
        ) : currentScale !== null ? (
          `${currentScale}%`
        ) : (
          <span className="text-muted">N/A</span>
        )}
      </div>
    </div>
  );
};
