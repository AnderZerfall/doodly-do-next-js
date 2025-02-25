import { createContext, useState } from "react";

export interface EraseModeContextType {
    eraseMode: boolean;
    setEraseMode: (status: boolean) => void;
}

export const EraseModeContext = createContext<EraseModeContextType | null>(null);

export const EraseModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [eraseMode, setEraseMode ] = useState(false);

  return (
      <EraseModeContext.Provider value={{ eraseMode, setEraseMode }}>
          {children}
      </EraseModeContext.Provider>
  );
};
