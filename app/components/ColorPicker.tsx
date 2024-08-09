import React, { useState, useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import { usePlace } from "../contexts/PlaceContext";
import { Plus, Pipette } from "lucide-react";

const colors = ["#FF0000", "#0000FF", "#00FF00", "#000000", "#FFFFFF"];

const ColorPicker = () => {
  const {
    selectedColor,
    setSelectedColor,
    isPipetteActive,
    setIsPipetteActive,
  } = usePlace();
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const colorPickerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        colorPickerButtonRef.current &&
        !colorPickerButtonRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='color-picker-menu'>
      {colors.map((color) => (
        <button
          key={color}
          className={`color-button ${color === selectedColor ? "active" : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => setSelectedColor(color)}
        />
      ))}
      <button
        ref={colorPickerButtonRef}
        className='color-button custom-color'
        onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
      >
        <Plus size={16} />
      </button>
      <button
        className={`color-button pipette ${isPipetteActive ? "active" : ""}`}
        onClick={() => setIsPipetteActive(!isPipetteActive)}
      >
        <Pipette size={16} />
      </button>
      {isColorPickerOpen && (
        <div ref={colorPickerRef} className='sketch-picker-container'>
          <SketchPicker
            color={selectedColor}
            onChange={(color) => setSelectedColor(color.hex)}
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
