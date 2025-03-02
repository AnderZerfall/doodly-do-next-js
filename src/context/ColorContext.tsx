import { createContext, useState } from "react";

export interface ColorContextType {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export const ColorContext = createContext<ColorContextType | null>(null);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");

  return (
    <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
      {children}
    </ColorContext.Provider>
  );
};
