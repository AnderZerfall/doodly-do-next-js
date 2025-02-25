"use client";

import { useEffect, useRef } from "react";
import {
  ReactSketchCanvas,
  ReactSketchCanvasRef,
  CanvasPath,
} from "react-sketch-canvas";
import { deleteDrawings, saveDrawings } from "../../utils/drawings";
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "utils/firebase";
import { useColors } from "hooks/useColors";
import { useBrushSize } from "hooks/useBrushSize";
import { useEraserMode } from "hooks/useEraseMode";
import { Button } from "@components/Button/Button";

import "./Canvas.scss";
import { useTheme } from "hooks/useTheme";

const styles = {
  overflow: 'hidden',
  borderRadius: "32px",
};

export const Canvas = () => {
  const canvas = useRef<ReactSketchCanvasRef>(null);
  const { selectedColor } = useColors();
  const { brushSize } = useBrushSize();
  const { eraseMode } = useEraserMode();
  const { theme } = useTheme();

  useEffect(() => {
    const pathsRef = query(collection(firestore, "drawings"));

    const unsubscribe = onSnapshot(pathsRef, (snapshot) => {
      const addedPaths: CanvasPath[] = [];
      const removedPaths: CanvasPath[] = [];

      snapshot.docChanges().forEach((change) => {
        switch (change.type) {
          case "added":
            addedPaths.push(change.doc.data() as CanvasPath);
            break;
          case "removed":
            removedPaths.push(change.doc.data() as CanvasPath);
            break;
        }
      });

      const sortedPaths = addedPaths.toSorted(
        (pathA, pathB) => Number(pathB.drawMode) - Number(pathA.drawMode)
      );
      if (canvas.current) {
        if (!!removedPaths.length) {
          canvas.current.clearCanvas();
        }

        canvas.current.loadPaths(sortedPaths);
      }
    });

    return () => unsubscribe();
  }, []);

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
      <div className="canvas__actions">
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

      <ReactSketchCanvas
        ref={canvas}
        style={styles}
        canvasColor={theme.secondaryBg}
        className="canvas"
        strokeWidth={brushSize}
        strokeColor={selectedColor}
        onStroke={(paths) => saveDrawings(paths)}
        eraserWidth={brushSize}
      />
    </>
  );
};
