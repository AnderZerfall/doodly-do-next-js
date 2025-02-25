import { CanvasPath } from "react-sketch-canvas";
import { firestore } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

export const saveDrawings = async (paths: CanvasPath) => {
    console.log("FIRESTORE SAVE");
    
    addDoc(collection(firestore, 'drawings'), {...paths, timeStamp: new Date()})
        .then(() => console.log('saved'))
        .catch((e) => console.log(e.message));
};

export const deleteDrawings = async () => {
    console.log("FIRESTORE SAVE");
    
    const snapshot = await getDocs(collection(firestore, 'drawings'));
    const deleteDocs = snapshot.docs.map(snap =>
        deleteDoc(doc(firestore, 'drawings', snap.id)));

    await Promise.all(deleteDocs)
};