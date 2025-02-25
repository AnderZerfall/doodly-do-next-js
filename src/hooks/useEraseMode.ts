import { EraseModeContext, EraseModeContextType } from "context/EraseModeContext";
import { useContext } from "react";

export const useEraserMode = (): EraseModeContextType => {
    const eraseModeContext = useContext(EraseModeContext);

        if (!eraseModeContext) {
            throw new Error('You have to wrap the component in ColorProvider before using');
    }
    
    return eraseModeContext;
    
}