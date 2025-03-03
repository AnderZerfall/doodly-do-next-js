'use client';

import { Button } from "@components/Button/Button";
import { useTheme } from "hooks/useTheme";
import { Toaster } from "react-hot-toast";

export default function RootLayout ({ children }: { children: React.ReactNode }) {
  const { theme, changeTheme } = useTheme();
  
  return (
    <div className="wrapper"
      style={{
        '--main-bg': theme.mainBg,
        '--secondary-bg': theme.secondaryBg,
        '--interactive-bg': theme.interactiveBg,
        '--primary': theme.primary,
        '--text': theme.text,
        '--border': theme.border,
        '--hover-bg': theme.hoverBg,
        '--hover-primary': theme.hoverPrimary,
      } as React.CSSProperties}>
      <header className="wrapper__header header">
        <Button handleClick={changeTheme} icon='/icons/moon.svg' isIcon></Button>
        </header>
      <main className="wrapper__main main">
         <Toaster position="bottom-center" />
          {children}
        </main>
        <footer className="wrapper__footer footer">
          <p>&copy; 2025 Created by Anna Androshchuk - Fukuro</p>
        </footer>
    </div>
  );
}