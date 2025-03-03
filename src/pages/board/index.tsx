"use client";

import { Canvas } from "@components/Canvas/Canvas";
import { ColorBar } from "@components/ColorBar/ColorBar";
import { Eraser } from "@components/Eraser/Eraser";
import { SizeRange } from "@components/SizeRange/SizeRange";
import { BrushSizeProvider } from "context/BrushSizeContext";
import { ColorProvider } from "context/ColorContext";
import { EraseModeProvider } from "context/EraseModeContext";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";;
import { auth } from "utils/firebase";

export default function BoardPage() {
  const [user, setUser] = useState<User | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
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

  return (
    <div className="board-page page">
      <div className="board-page__container container" ref={boardRef}>
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
