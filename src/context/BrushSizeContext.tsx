import { createContext, useState } from "react";

export interface BrushSizeContextType {
    brushSize: number;
    setBrushSize: (size: number) => void;
}

export const BrushSizeContext = createContext<BrushSizeContextType | null>(null);

export const BrushSizeProvider = ({ children }: { children: React.ReactNode }) => {
    const [brushSize, setBrushSize ] = useState(3);


  return (
      <BrushSizeContext.Provider value={{ brushSize, setBrushSize }}>
          {children}
      </BrushSizeContext.Provider>
  );
};