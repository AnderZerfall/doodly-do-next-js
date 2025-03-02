import { ThemeContext, ThemeContextType } from "context/ThemeContext";
import { useContext } from "react";

export const useTheme = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "You have to wrap the component in ColorProvider before using"
    );
  }

  return themeContext;
};
