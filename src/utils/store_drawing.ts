import { CanvasPath } from "react-sketch-canvas";
import { firestore } from "./firebase";
import {
  doc,
  arrayUnion,
  updateDoc,
  setDoc,
  getDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import LZString from "lz-string";

interface SavedPath extends CanvasPath {
  userId: string;
  pathId: string;
  timestamp: Timestamp;
}

export const subscribeToDrawEvent = (action: (paths: CanvasPath[]) => void) => {
  const boardRef = doc(firestore, "drawings", "board");

  return onSnapshot(boardRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      const paths = data.paths || [];

      const decompressedPath = decompressData(paths);
      console.log("decompressed");
      console.log(decompressedPath);

      decompressedPath.sort(
        (pathA: SavedPath, pathB: SavedPath) =>
          pathA.timestamp.seconds - pathB.timestamp.seconds
      );

      console.log("Event triggered");

      action(decompressedPath);
    }
  });
};

export const saveDrawings = async (path: CanvasPath, userId: string) => {
  const boardRef = await InitializeBoard();

  const newPath: SavedPath = {
    ...path,
    userId,
    pathId: uuidv4(),
    timestamp: Timestamp.now(),
  };

  const compressedPath = compressData(newPath);

  try {
    await updateDoc(boardRef, {
      paths: arrayUnion(compressedPath),
    });
    console.log("Path saved");
  } catch (error) {
    console.debug("Error saving the stroke: ", error);
    throw error;
  }
};

export const deleteDrawings = async () => {
  const boardRef = await InitializeBoard();

  try {
    await updateDoc(boardRef, {
      paths: [],
      lastModified: Timestamp.now(),
    });
  } catch (error) {
    console.debug("Error deleting the stroke: ", error);
    throw error;
  }
};

export const deleteLastDoc = async (userId: string) => {
  const boardRef = await InitializeBoard();

  try {
    const docSnap = await getDoc(boardRef);
    const data = docSnap.data();

    if (data) {
      const decompressedPaths = decompressData(data.paths);

      const userPaths = decompressedPaths.filter(
        (path) => path.userId === userId
      );

      userPaths.sort(
        (pathA: SavedPath, pathB: SavedPath) =>
          pathA.timestamp.seconds - pathB.timestamp.seconds
      );

      console.log("UserPaths");
      console.log(userPaths);

      const updatedPaths = decompressedPaths.filter(
        (path: SavedPath) =>
          path.pathId !== userPaths[userPaths.length - 1].pathId
      );

      const compressedPaths = updatedPaths.map((path) => compressData(path));

      await updateDoc(boardRef, {
        paths: compressedPaths,
        lastModified: Timestamp.now(),
      });
    }
  } catch (error) {
    console.debug("Error deleting the stroke: ", error);
    throw error;
  }
};

const InitializeBoard = async () => {
  const boardRef = doc(firestore, "drawings", "board");

  try {
    const boardSnap = await getDoc(boardRef);

    if (!boardSnap.exists()) {
      await setDoc(boardRef, {
        paths: [],
        lastModified: Timestamp.now(),
      });
    }

    return boardRef;
  } catch (error) {
    console.debug("Error creating a doc: ", error);
    throw error;
  }
};

const compressData = (path: SavedPath) => {
  try {
    const pathString = JSON.stringify(path);
    return LZString.compressToUTF16(pathString);
  } catch (error) {
    console.debug("Unable to compress the data: ", error);
  }
};

// const compressData = (path: SavedPath[]) => {
//   try {
//     return path.map(path => {
//       const pathString = JSON.stringify(path);
//       return LZString.compressToUTF16(pathString)
//     });
//   } catch (error) {
//     console.debug("Unable to compress the data: ", error);
//   }

//   return [];
// };

const decompressData = (pathString: string[]): SavedPath[] => {
  return pathString.map((path) => {
    try {
      const decompressedPath = LZString.decompressFromUTF16(path);
      console.log(decompressedPath);
      return JSON.parse(decompressedPath);
    } catch (error) {
      console.debug("Unable to decompress the data: ", error);
    }
  });
};
