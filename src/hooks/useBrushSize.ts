import {
  BrushSizeContext,
  BrushSizeContextType,
} from "context/BrushSizeContext";
import { useContext } from "react";

export const useBrushSize = (): BrushSizeContextType => {
  const brushSizeContext = useContext(BrushSizeContext);

  if (!brushSizeContext) {
    throw new Error(
      "You have to wrap the component in BrushSizeProvider before using"
    );
  }

  return brushSizeContext;
};
