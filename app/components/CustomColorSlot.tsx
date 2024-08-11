import React, { useRef, useEffect } from "react";
import { SketchPicker } from "react-color";
import { X } from "lucide-react";

interface CustomColorSlotProps {
  color: string | undefined;
  index: number;
  isActive: boolean;
  isColorPickerOpen: boolean;
  onColorChange: (index: number, color: string) => void;
  onRemoveColor: (index: number) => void;
  onActivatePipette: (index: number) => void;
  onSlotClick: (index: number) => void;
  onColorPickerOpen: (index: number) => void;
  onColorPickerClose: () => void;
}

const CustomColorSlot: React.FC<CustomColorSlotProps> = ({
  color,
  index,
  isActive,
  isColorPickerOpen,
  onColorChange,
  onRemoveColor,
  onSlotClick,
  onColorPickerOpen,
  onColorPickerClose,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  const handleSlotClick = () => {
    onSlotClick(index);
    if (isColorPickerOpen) {
      onColorPickerClose();
      return;
    } else if (!color || isActive) {
      onColorPickerOpen(index);
    }
  };

  const handleColorChange = (newColor: { hex: string }) => {
    onColorChange(index, newColor.hex);
  };

  const handleRemoveColor = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveColor(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isColorPickerOpen &&
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        onColorPickerClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColorPickerOpen, onColorPickerClose]);

  return (
    <div className='user-color-slot' style={{ position: "relative" }}>
      <button
        ref={buttonRef}
        className={`color-button ${isActive ? "active" : ""}`}
        style={{ backgroundColor: color || "transparent" }}
        onClick={handleSlotClick}
      />
      {color && (
        <button className='remove-color' onClick={handleRemoveColor}>
          <X size={12} />
        </button>
      )}
      {isColorPickerOpen && (
        <div
          ref={colorPickerRef}
          className='sketch-picker-container'
          style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginBottom: "10px",
            zIndex: 1000,
          }}
        >
          <SketchPicker
            color={color || "#000000"}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default CustomColorSlot;
