import { useColors } from "hooks/useColors";
import { useCallback } from "react";

interface Props {
    color: string;
    customColor?: boolean;
}

import styles from './ColorPicker.module.scss';
import { useEraserMode } from "hooks/useEraseMode";

export const ColorPicker: React.FC<Props> = ({ color }) => {
    const { selectedColor, setSelectedColor } = useColors();
    const { setEraseMode } = useEraserMode();

    const handleColorSelection = useCallback(() => {
        setEraseMode(false);

        if (selectedColor !== color) {
            setSelectedColor(color)
        }
    }, [color, selectedColor, setSelectedColor, setEraseMode]);

    return (
        <div
            className={styles['color-picker']}
            style={{ background: color }}
            onClick={handleColorSelection}
        >
        </div>
    );
}