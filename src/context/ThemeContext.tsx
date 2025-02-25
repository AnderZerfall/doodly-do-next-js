import { createContext, useState } from "react";
import { darkTheme, lightTheme, ThemeType } from "@styles/theme";

export interface ThemeContextType {
    theme: ThemeType;
    changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(darkTheme);
    
    const changeTheme = () => {
        setTheme(previousTheme =>
            previousTheme.themeTitle === 'light'
                ? darkTheme : lightTheme);
    }

  return (
      <ThemeContext.Provider value={{ theme, changeTheme }}>
          {children}
      </ThemeContext.Provider>
  );
};
