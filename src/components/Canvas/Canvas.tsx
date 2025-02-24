"use client";
import { useEffect, useRef } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef, CanvasPath } from "react-sketch-canvas";
// import { io, Socket } from "socket.io-client";
import { saveDrawings } from '../../utils/drawings';
import { collection, onSnapshot, query } from "firebase/firestore";
import { firestore } from "utils/firebase";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

export const Canvas = () => {
  // const socket = useRef<Socket>(null);
  const canvas = useRef<ReactSketchCanvasRef>(null);

  useEffect(() => {
    const pathsRef = query(collection(firestore, 'drawings'));

     const unsubscribe = onSnapshot(pathsRef, (snapshot) => {
       const addedPaths: CanvasPath[] = [];
       const removedPaths: CanvasPath[] = [];

       const allPaths: CanvasPath[] = snapshot.docs.map(doc => doc.data() as CanvasPath);

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          addedPaths.push(change.doc.data() as CanvasPath);
        }
        if (change.type === "removed") {
          console.log('found removed');
          removedPaths.push(change.doc.data() as CanvasPath);
        }
      });

       if (canvas.current) {
         
         if (!!removedPaths.length) {
           console.log('ready to clear canvas');
           console.log(allPaths);
            canvas.current.clearCanvas();
            canvas.current.loadPaths(allPaths);
         } else {
            canvas.current.loadPaths(addedPaths);
         }

         
       }
     });
    
    return () => unsubscribe();

    
    // socket.current = io("http://localhost:3000");

    // socket.current.on('draw', (paths) => {
    //   if (canvas.current) {
    //     console.log('paths loaded')
    //     canvas.current.loadPaths(paths);
    //   }
    // });

    // return () => {
    //   if (socket.current) {
    //     socket.current.disconnect();
    //   }
    // };
  }, []);

  // const updateDrawings = useCallback((paths: CanvasPath) => {
  //   // if (socket.current) {
  //   //   socket.current.emit('draw', paths);
  //   // }
  // }, []);
    
  return (
    <ReactSketchCanvas
      ref={canvas}
      style={styles}
      width="600"
      height="800"
      strokeWidth={4}
      strokeColor="red"
      onStroke={(paths) => saveDrawings(paths)}
    />
  );
};
