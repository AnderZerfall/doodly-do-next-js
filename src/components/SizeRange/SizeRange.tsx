import { useBrushSize } from "hooks/useBrushSize";
import { useCallback } from "react";

import './SizeRange.scss';

export const SizeRange = () => {
  const { brushSize, setBrushSize } = useBrushSize();

  const handleChangeBrushSize = useCallback((size: number) => {
    if (brushSize !== size) {
      setBrushSize(size);
    }
  }, [brushSize, setBrushSize]);

  return (
      <input
        className="range"
      type="range"
      min={1}
      max={5}
      onChange={(e) => handleChangeBrushSize(+e.target.value)}
    />
  );
};
