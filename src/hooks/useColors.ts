import { ColorContext, ColorContextType } from "context/ColorContext";
import { useContext } from "react";

export const useColors = (): ColorContextType => {
    const colorContext = useContext(ColorContext);

        if (!colorContext) {
            throw new Error('You have to wrap the component in ColorProvider before using');
    }
    
    return colorContext;
    
}