import React from "react";
import { usePlace } from "../contexts/PlaceContext";

const ColorIndicator: React.FC = () => {
  const { selectedColor, cursorPosition, isMouseOnScreen, isPipetteActive } =
    usePlace();

  if (!isMouseOnScreen || isPipetteActive) {
    return null;
  }

  return (
    <div
      className='color-indicator'
      style={{
        left: cursorPosition.x + 10,
        top: cursorPosition.y + 10,
        backgroundColor: selectedColor,
      }}
    />
  );
};

export default ColorIndicator;
