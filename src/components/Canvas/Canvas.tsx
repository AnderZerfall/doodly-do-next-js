"use client";
import { useCallback, useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { io, Socket } from "socket.io-client";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

export const Canvas = () => {
  const socket = useRef<Socket>(null);
  const canvas = useRef<any>(null);

  useEffect(() => {
    // TODO: add fetch to synchronize data from specific board.
    socket.current = io("http://localhost:3000");

    socket.current.on('draw', (paths) => {
      if (canvas.current) {
        console.log('paths loaded')
        canvas.current.loadPaths(paths);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const updateDrawings = useCallback((paths) => {
    if (socket.current) {
      socket.current.emit('draw', paths);
    }
  }, []);
    
  return (
    <ReactSketchCanvas
      ref={canvas}
      style={styles}
      width="600"
      height="400"
      strokeWidth={4}
      strokeColor="red"
      onStroke={(paths) => updateDrawings(paths)}
    />
  );
};
