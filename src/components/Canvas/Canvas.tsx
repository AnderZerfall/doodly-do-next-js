"use client";

import { useEffect,useRef, useState } from "react";
import {
  ReactSketchCanvas,
  ReactSketchCanvasRef,
  CanvasPath,
} from "react-sketch-canvas";
import {
  deleteDrawings,
  saveDrawings,
  subscribeToDrawEvent,
} from "../../utils/store_drawing";
import { useColors } from "hooks/useColors";
import { useBrushSize } from "hooks/useBrushSize";
import { useEraserMode } from "hooks/useEraseMode";
import { Button } from "@components/Button/Button";
import styles from "./Canvas.module.scss";
import { useTheme } from "hooks/useTheme";

const canvasStyles = {
  overflow: "hidden",
  borderRadius: "32px",
};

interface Props {
  userId: string;
}

export const Canvas: React.FC<Props> = ({ userId }) => {
  const canvas = useRef<ReactSketchCanvasRef>(null);
  const canvasWrapper = useRef<HTMLDivElement>(null);
  const { selectedColor } = useColors();
  const { brushSize } = useBrushSize();
  const { eraseMode } = useEraserMode();
  const { theme } = useTheme();
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDrawing = () => {
    setIsDrawing(true);
  };
  const handleStopDrawing = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    if (canvasWrapper.current) {
      const wrapper = canvasWrapper.current;

      wrapper.addEventListener("mousedown", handleDrawing);

      wrapper.addEventListener("mouseup", handleStopDrawing);

      return () => {
        wrapper.removeEventListener("mousedown", handleDrawing);
        wrapper.removeEventListener("mouseup", handleStopDrawing);
      };
    }
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToDrawEvent(async (paths) => {
      if (canvas.current) {
        console.log(paths);
        if (!isDrawing) {
          canvas.current.clearCanvas();
          canvas.current.loadPaths(paths);
        }
      }
    });

    return () => unsubscribe();
  }, [userId, isDrawing]);

  useEffect(() => {
    if (canvas.current) {
      canvas.current.eraseMode(eraseMode);
    }
  }, [eraseMode]);

  const handleResetBoard = async () => {
    if (canvas.current) {
      await deleteDrawings();
    }
  };

  const handleSaveBoard = async () => {
    if (canvas.current) {
      const image = await canvas.current.exportImage("png");

      if (image) {
        const link = document.createElement("a");
        link.href = image;
        link.download = "sketch.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  return (
    <>
      <div className={styles.canvas}>
        <div className={styles["canvas__actions"]}>
        <Button
          handleClick={handleSaveBoard}
          icon="/icons/save.svg"
          className="button--icon"
        />
        <Button
          handleClick={handleResetBoard}
          icon="/icons/reset.svg"
          className="button--icon"
        />
      </div>
      <div className={styles["canvas__wrapper"]} ref={canvasWrapper}>
        <ReactSketchCanvas
          ref={canvas}
          style={canvasStyles}
          canvasColor={theme.secondaryBg}
          className={styles["canvas__area"]}
          strokeWidth={brushSize}
          strokeColor={selectedColor}
          onStroke={(path: CanvasPath) => saveDrawings(path, userId)}
          eraserWidth={brushSize}
        />
      </div>
      </div>
      
    </>
  );
};
