"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ReactSketchCanvas,
  ReactSketchCanvasRef,
  CanvasPath,
} from "react-sketch-canvas";
import { deleteDrawings, saveDrawings, SaveDrawingsLocally } from "../../utils/drawings";
import { doc, onSnapshot, runTransaction } from "firebase/firestore";
import { firestore } from "utils/firebase";
import { useColors } from "hooks/useColors";
import { useBrushSize } from "hooks/useBrushSize";
import { useEraserMode } from "hooks/useEraseMode";
import { Button } from "@components/Button/Button";
import { v4 as uuidv4 } from 'uuid';
import styles from "./Canvas.module.scss";
import { useTheme } from "hooks/useTheme";
import { getAuth } from "firebase/auth";
import { UUIDTypes } from "uuid";

const canvasStyles = {
  overflow: "hidden",
  borderRadius: "32px",
};

export interface CanvasPathExtended {
  id: UUIDTypes;
  path: CanvasPath;
}

interface Props {
  userId: string | undefined;
}

export const Canvas: React.FC<Props> = ({ userId }) => {
  const canvas = useRef<ReactSketchCanvasRef>(null);
  const { selectedColor } = useColors();
  const { brushSize } = useBrushSize();
  const { eraseMode } = useEraserMode();
  const { theme } = useTheme();
  // const [paths, setPaths] = useState<CanvasPathExtended[]>([]);
   const pathsRef = doc(firestore, "drawings", "board");
  // const [drawPaths, setDrawPaths] = useState<CanvasPathExtended | null>(null);

  useEffect(() => {
   

    const unsubscribe = onSnapshot(pathsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();

        console.log(data);

        if (canvas.current) {

          if (!data.paths.length) {
            canvas.current.clearCanvas();
          }

          const pathsWithoutId = data.paths
            .map((path) => path.path);
          
          
          // const pathsWithoutId = data.paths
          //   .filter(newPath => !paths.some(path => path.id === newPath.id))
          //   .map((path) => path.path);
          
          // setPaths(prev => {
          //   const pathsWithoutId = data.paths
          //     .filter(newPath => !prev.some(path => path.id === newPath.id));
            
            // console.log(pathsWithoutId);
            
            //   return [...prev, ...pathsWithoutId]
            // });
        }
      }
    });

    return () => unsubscribe();
  }, [pathsRef]);

  useEffect(() => {
    if (canvas.current) {
      const mapped = paths.map(path => path.path);
      canvas.current.loadPaths(mapped);
    }
  }, [paths]);

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

  const updateFirestore = useCallback(async (newPaths: CanvasPathExtended[]) => {
    try {
      await runTransaction(firestore, async (transaction) => {
        const docSnapshot = await transaction.get(pathsRef);
        if (docSnapshot.exists()) {
          transaction.update(pathsRef, { paths: newPaths });
        } else {
          transaction.set(pathsRef, { paths: newPaths });
        }
      });
    } catch (error) {
      console.error("Transaction failed: ", error);
    }
  }, [pathsRef]);
  

  const handleSave = (path: CanvasPath) => {
    // saveDrawings(path, userId);
    const newPath = { id: uuidv4(), path }
    setPaths((prevPaths) => [...prevPaths, newPath]);
    updateFirestore([...paths, newPath]);
    // SaveDrawingsLocally(path);
    // setTimeout(() => saveDrawings(path, userId), 1000);
  }

  const handleOnChange = (updatedPath: CanvasPath[]) => {
    // console.log(`That's user: ${userId}`);
    // if (updatedPath) {
    //   const offset = updatedPath.length ? updatedPath.length - 1 : 0;
    //   if (userId) {
    //     setDrawPaths({ userId, ...updatedPath[offset] });
    //   }
    // }
  };

  return (
    <>
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

      <ReactSketchCanvas
        ref={canvas}
        style={canvasStyles}
        canvasColor={theme.secondaryBg}
        className="canvas"
        strokeWidth={brushSize}
        strokeColor={selectedColor}
        onStroke={(path) => handleSave(path)}
        // onChange={handleOnChange}
        eraserWidth={brushSize}
      />
    </>
  );
};
