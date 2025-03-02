import {
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { firestore } from "./firebase";

export type CursorType = {
  userId: string;
  username: string;
  cords: { x: number; y: number };
};

export const updateCursorsPosition = async (cords: CursorType) => {
  const cursorRef = await InitializeCursorStore();
    console.log('start');
    const cursorSnap = await getDoc(cursorRef);
    console.log(cursorSnap);

     const data = cursorSnap.data();
      console.log('data exist');

    if (data) {
      const updatedData = data.cursors.filter(
        (cursor: CursorType) => cursor.userId !== cords.userId
        );

        console.log(updatedData);

      await setDoc(cursorRef, {
        cursors: [...updatedData, cords],
      });
    }

  if (!cursorSnap.exists()) {
     
  }
};

export const InitializeCursorStore = async () => {
  const cursorRef = doc(firestore, "drawings", "cursor");
  const cursorSnap = await getDoc(cursorRef);

  if (!cursorSnap.exists()) {
    await setDoc(cursorRef, {
      cursors: [],
    });
  }

  return cursorRef;
};

export const subscribeToCursorEvent = (
  action: (cursor: CursorType[]) => void,
  userId: string
) => {
  const cursorRef = doc(firestore, "drawings", "cursor");

  return onSnapshot(cursorRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      const cursors = data.cursors || [];

      const otherCursor = cursors.filter(
        (cursor: CursorType) => cursor.userId !== userId
      );

      action(otherCursor);
    }
  });
};
