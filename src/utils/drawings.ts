import { CanvasPath } from "react-sketch-canvas";
import { firestore } from "./firebase";
import { doc, arrayUnion, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "firebase/auth";
import { CanvasPathExtended } from "@components/Canvas/Canvas";

export const SaveDrawingsLocally = (path: CanvasPath) => {
  const rawPaths = localStorage.getItem('board');
  let paths = [];

  if (rawPaths) {
    paths = JSON.parse(rawPaths);
  }

  localStorage.setItem('board', JSON.stringify([...paths, path]));
  
}

export const GetDrawingsLocally = () => {
  const rawPaths = localStorage.getItem('board') || '';
  return JSON.parse(rawPaths) || [];
}

export const saveDrawings = async (
  path: CanvasPath,
  userId: string | undefined
) => {
  // console.log("FIRESTORE SAVE");
  // console.log(userId);
  console.log(`That's user ${userId}`);
  // console.log(`Current user: ${currentUserId}; User from board: ${userId}`)

  if (userId) {
    const boardRef = await InitializeBoard();

    await updateDoc(boardRef, {
      paths: arrayUnion({ id: uuidv4(), path }),
    });
  }

  // const boardRef = doc(firestore, 'drawings', 'board');
  // await updateDocument(boardRef, {
  //     paths: arrayUnion(paths)
  // });

  // addDoc(collection(firestore, 'drawings'), {...paths, timeStamp: new Date()})
  //     .then(() => console.log('saved'))
  //     .catch((e) => console.log(e.message));
};

export const deleteDrawings = async () => {
  // console.log("FIRESTORE SAVE");
  const boardRef = await InitializeBoard();
  await updateDoc(boardRef, {
    paths: [],
  });
  // const boardRef = doc(firestore, 'drawings', 'board');

  // const snapshot = await getDocs(collection(firestore, 'drawings'));
  // const deleteDocs = snapshot.docs.map(snap =>
  //     deleteDoc(doc(firestore, 'drawings', snap.id)));

  // await Promise.all(deleteDocs)
};

const InitializeBoard = async () => {
  const boardRef = doc(firestore, "drawings", "board");

  const boardSnap = await getDoc(boardRef);

    if (!boardSnap.exists()) {
        console.log('dont exist');
    await setDoc(boardRef, {
      paths: [],
    });
  }

  console.log("doc created");

  return boardRef;
};

// const updateDocument = async (path: CanvasPath, method?: (path: CanvasPath) => FieldValue) => {
//     const boardRef = doc(firestore, 'drawings', 'board');
//     const boardSnap = await getDoc(boardRef);

//     if (method) {
//         await updateDoc(boardRef, {
//             paths: method(path)
//         });
//     } else {
//         await updateDoc(boardRef, {
//             paths: [path]
//         });
//     }
// }
