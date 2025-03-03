import { useColors } from "hooks/useColors";
import { useCallback, useState } from "react";

interface Props {
  color?: string;
  IsCustomColor?: boolean;
}

import styles from "./ColorPicker.module.scss";
import { useEraserMode } from "hooks/useEraseMode";
import classNames from "classnames";

export const ColorPicker: React.FC<Props> = ({ color, IsCustomColor }) => {
  const { selectedColor, setSelectedColor } = useColors();
  const { setEraseMode } = useEraserMode();
  const [customColor, setCustomColor] = useState('');

  const handleColorSelection = useCallback(
    (customColor = "") => {
      setEraseMode(false);

      if (customColor) {
        setCustomColor(customColor);
      }

      const chosenColor = color || customColor;

      if (chosenColor) {
        if (selectedColor !== chosenColor) {
          setSelectedColor(chosenColor);
        }
      }
    },
    [color, selectedColor, setSelectedColor, setEraseMode]
  );

  return IsCustomColor ? (
      <input
      type="color"
      className={classNames(styles["color-picker"], styles["color-picker--custom"], {
        [styles["color-picker--active"]]: selectedColor === customColor,
      })}
      style={{ background: color }}
      onClick={(event) => handleColorSelection((event.target as HTMLInputElement).value)}
      onChange={(event) => handleColorSelection(event.target.value)}
    />
   
  ) : (
    <div
      className={classNames(styles["color-picker"], {
        [styles["color-picker--active"]]: selectedColor === color,
      })}
      style={{ background: color }}
      onClick={() => handleColorSelection()}
    ></div>
  );
};
