import { firestore } from "./firebase";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

export const saveDrawings = async (paths) => {
    console.log("FIRESTORE SAVE");
    
    addDoc(collection(firestore, 'drawings'), paths)
        .then(() => console.log('saved'))
        .catch((e) => console.log(e.message));
};