import { CanvasPath } from "react-sketch-canvas";
import { firestore } from "./firebase";
import { doc, arrayUnion, updateDoc, setDoc, getDoc } from "firebase/firestore";

export const saveDrawings = async (path: CanvasPath) => {
    console.log("FIRESTORE SAVE");
    
    const boardRef = await InitializeBoard();
    
    await updateDoc(boardRef, {
            paths: arrayUnion(path)
    });
    
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
        paths: []
    });
    // const boardRef = doc(firestore, 'drawings', 'board');
    
    // const snapshot = await getDocs(collection(firestore, 'drawings'));
    // const deleteDocs = snapshot.docs.map(snap =>
    //     deleteDoc(doc(firestore, 'drawings', snap.id)));

    // await Promise.all(deleteDocs)
};

const InitializeBoard = async () => {
    const boardRef = doc(firestore, 'drawings', 'board');

    const boardSnap = await getDoc(boardRef);

    if (!boardSnap.exists()) {
        await setDoc(boardRef, {
            paths: []
        });
    }
    
    return boardRef;
}

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