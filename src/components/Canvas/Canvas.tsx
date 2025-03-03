"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactSketchCanvas,
  ReactSketchCanvasRef,
  CanvasPath,
} from "react-sketch-canvas";
import {
  deleteDrawings,
  deleteLastDoc,
  saveDrawings,
  subscribeToDrawEvent,
} from "../../utils/board";
import { useColors } from "hooks/useColors";
import { useBrushSize } from "hooks/useBrushSize";
import { useEraserMode } from "hooks/useEraseMode";
import { Button } from "@components/Button/Button";
import styles from "./Canvas.module.scss";
import { useHotkeys } from "react-hotkeys-hook";
import { useTheme } from "hooks/useTheme";
import toast from "react-hot-toast";

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

  const handleUndo = useCallback(() => {
    if (canvas.current) {
      deleteLastDoc(userId);
    }
  }, [userId]);

  useHotkeys("ctrl+z", handleUndo, [], [canvas]);

  const handleDrawing = useCallback(() => {
    setIsDrawing(true);
  }, []);
  const handleStopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

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
  }, [handleDrawing, handleStopDrawing]);

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
      try {
         await deleteDrawings();
      } catch (error) {
        toast.error(error.message);
      }
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

  const handleOnStroke = (path: CanvasPath) => {
    try {
      saveDrawings(path, userId);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <div className={styles.canvas}>
        <div className={styles["canvas__actions"]}>
          <Button handleClick={handleSaveBoard} icon="/icons/save.svg" isIcon />
          <Button
            handleClick={handleResetBoard}
            icon="/icons/reset.svg"
            isIcon
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
            onStroke={(path: CanvasPath) => handleOnStroke(path)}
            eraserWidth={brushSize}
            width="4000"
          />
        </div>
      </div>
    </>
  );
};
