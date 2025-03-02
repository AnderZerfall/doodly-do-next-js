import { useEraserMode } from "hooks/useEraseMode";
import { useCallback } from "react";
import { Button } from "@components/Button/Button";

export const Eraser = () => {
  const { eraseMode, setEraseMode } = useEraserMode();

  const handleErase = useCallback(() => {
    setEraseMode(!eraseMode);
  }, [setEraseMode, eraseMode]);

  return (
    <Button
      handleClick={handleErase}
      icon="/icons/eraser.svg"
      isActive={eraseMode}
    />
  );
};
