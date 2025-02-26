"use client";

import { useEffect, useRef } from "react";
import {
  ReactSketchCanvas,
  ReactSketchCanvasRef,
  // CanvasPath,
} from "react-sketch-canvas";
import { deleteDrawings, saveDrawings } from "../../utils/drawings";
import { doc, onSnapshot} from "firebase/firestore";
import { firestore } from "utils/firebase";
import { useColors } from "hooks/useColors";
import { useBrushSize } from "hooks/useBrushSize";
import { useEraserMode } from "hooks/useEraseMode";
import { Button } from "@components/Button/Button";

import styles from "./Canvas.module.scss";
import { useTheme } from "hooks/useTheme";

const canvasStyles = {
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
    const pathsRef = doc(firestore, "drawings", "board");

    const unsubscribe = onSnapshot(pathsRef, (snapshot) => {
      // const addedPaths: CanvasPath[] = [];
      // const removedPaths: CanvasPath[] = [];

      if (snapshot.exists()) {
        const data = snapshot.data();

        if (canvas.current) {
          if (!data.length) {
            canvas.current.clearCanvas();
          }
          canvas.current.loadPaths(data.paths);
        }
      }

      // snapshot.docChanges().forEach((change) => {
      //   switch (change.type) {
      //     case "added":
      //       addedPaths.push(change.doc.data() as CanvasPath);
      //       break;
      //     case "removed":
      //       removedPaths.push(change.doc.data() as CanvasPath);
      //       break;
      //   }
      // });

      // if (canvas.current) {
      //   if (!!removedPaths.length) {
      //     canvas.current.clearCanvas();
      //   }

      //   if (!!addedPaths.length) {
      //     canvas.current.loadPaths(addedPaths);
      //   }
      // }
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
      <div className={styles['canvas__actions']}>
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
        style={canvasStyles}
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
