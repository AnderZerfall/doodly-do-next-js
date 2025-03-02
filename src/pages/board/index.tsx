"use client";

import { Canvas } from "@components/Canvas/Canvas";
import { ColorBar } from "@components/ColorBar/ColorBar";
// import { Cursor } from "@components/Cursor/Cursor";
import { Eraser } from "@components/Eraser/Eraser";
import { SizeRange } from "@components/SizeRange/SizeRange";
import { BrushSizeProvider } from "context/BrushSizeContext";
import { ColorProvider } from "context/ColorContext";
import { EraseModeProvider } from "context/EraseModeContext";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import {
//   subscribeToCursorEvent
// } from "../../utils/cursorObserver";
import { auth } from "utils/firebase";

export default function BoardPage() {
  const [user, setUser] = useState<User | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  // const [otherCursors, setOtherCursors] = useState<Cursor[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
      console.log(user);
      setUser(user);
    });

    return () => unsubscribe();
  }, [router]);

  // const handleMouseUpdate = throttle((event: MouseEvent) => {
  //   if (user) {
  //     const cords = {
  //       username: user.displayName,
  //       userId: user.uid,
  //       cords: {
  //         x: event.clientX,
  //         y: event.clientY,
  //       },
  //     };

  //     console.log('mouse move');

  //     updateCursorsPosition(cords);
  //   }
  // }, 3000);

  // useEffect(() => {
  //   if (boardRef.current) {
  //     const board = boardRef.current;

  //     board.addEventListener("mousemove", handleMouseUpdate);

  //     return () => {
  //       board.removeEventListener("mousemove", handleMouseUpdate);
  //     };
  //   }
  // });

  // useEffect(() => {
  //   if (user) {
  //     const unsubscribe = subscribeToCursorEvent((cursors) => {
  //       setOtherCursors(cursors);
  //     }, user.uid);

  //     return () => unsubscribe();
  //   }
  // }, [user]);

  // const renderUsersCursors = () => {
  //   return otherCursors.map((cursor) => (
  //     <Cursor
  //       username={cursor.userId}
  //       key={cursor.userId}
  //       cords={cursor.cords}
  //     />
  //   ));
  // };

  return (
    <div className="board-page page">
      <div className="board-page__container container" ref={boardRef}>
        {/* {renderUsersCursors()} */}
        <EraseModeProvider>
          <BrushSizeProvider>
            <ColorProvider>
              <h3 className="board-page__user-title">
                Draw your things, {user?.displayName}!
              </h3>
              {user && <Canvas userId={user.uid} />}
              <div className="board-page__settings">
                <SizeRange />
                <div className="board-page__tools">
                  <Eraser />
                  <ColorBar />
                </div>
              </div>
            </ColorProvider>
          </BrushSizeProvider>
        </EraseModeProvider>
      </div>
    </div>
  );
}
