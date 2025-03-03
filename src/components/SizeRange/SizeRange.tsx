import { useBrushSize } from "hooks/useBrushSize";
import { useCallback } from "react";
import { MIN_BRUSH_SIZE, MAX_BRUSH_SIZE } from "utils/boardSettings/boardSettings";

import styles from "./SizeRange.module.scss";

export const SizeRange = () => {
  const { brushSize, setBrushSize } = useBrushSize();

  const handleChangeBrushSize = useCallback(
    (size: number) => {
      if (brushSize !== size) {
        setBrushSize(size);
      }
    },
    [brushSize, setBrushSize]
  );

  return (
    <div className={styles["size-range"]}>
      <input
        className={styles["size-range__item"]}
        type="range"
        min={MIN_BRUSH_SIZE}
        max={MAX_BRUSH_SIZE}
        onChange={(e) => handleChangeBrushSize(+e.target.value)}
      />
    </div>
  );
};
