import React from "react";
import { usePlace } from "../contexts/PlaceContext";

const ColorIndicator: React.FC = () => {
  const { cursorPosition, isMouseOnScreen, isPipetteActive, hoveredPixel } =
    usePlace();

  if (!isMouseOnScreen || isPipetteActive) {
    return null;
  }

  return (
    hoveredPixel && (
      <div
        className='color-indicator-container'
        style={{
          left: cursorPosition.x + 10,
          top: cursorPosition.y + 10,
        }}
      >
        <div
          style={{
            color: "#000",
            left: cursorPosition.x + 20,
            top: cursorPosition.y + 10,
          }}
        >
          X: {hoveredPixel.x}, Y: {hoveredPixel.y}
        </div>
      </div>
    )
  );
};

export default ColorIndicator;
