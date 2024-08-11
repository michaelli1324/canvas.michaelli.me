import React, { useState, useEffect } from "react";
import { usePlace } from "../contexts/PlaceContext";
import CustomColorSlot from "./CustomColorSlot";

const presetColors = ["#FFFFFF", "#000000", "#FF0000", "#0000FF", "#00FF00"];
const userColorSlots = 5;

const BottomMenu = () => {
  const { setSelectedColor, setIsPipetteActive } = usePlace();

  const [activeSlot, setActiveSlot] = useState(0);
  const [userColors, setUserColors] = useState<(string | undefined)[]>(
    Array(userColorSlots).fill(undefined)
  );
  const [openColorPickerIndex, setOpenColorPickerIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    const storedColors = localStorage.getItem("userColors");
    if (storedColors) {
      setUserColors(JSON.parse(storedColors));
    }
  }, []);

  const handlePresetColorClick = (index: number) => {
    setActiveSlot(index);
    setSelectedColor(presetColors[index]);
    setOpenColorPickerIndex(null);
  };

  const handleUserColorChange = (index: number, color: string) => {
    const newUserColors = [...userColors];
    newUserColors[index] = color;
    setUserColors(newUserColors);
    setSelectedColor(color);
    localStorage.setItem("userColors", JSON.stringify(newUserColors));
    setActiveSlot(index + presetColors.length);
  };

  const handleRemoveUserColor = (index: number) => {
    const newUserColors = [...userColors];
    newUserColors[index] = undefined;
    setUserColors(newUserColors);
    localStorage.setItem("userColors", JSON.stringify(newUserColors));
    if (activeSlot === index + presetColors.length) {
      setActiveSlot(0);
      setSelectedColor(presetColors[0]);
    }
    setOpenColorPickerIndex(null);
  };

  const handleActivatePipette = (index: number) => {
    setIsPipetteActive(true);
    setActiveSlot(index + presetColors.length);
    setOpenColorPickerIndex(null);
  };

  const handleUserSlotClick = (index: number) => {
    const userColorIndex = index + presetColors.length;
    if (userColors[index]) {
      setActiveSlot(userColorIndex);
    }
    if (userColors[index]) {
      setSelectedColor(userColors[index]!);
    } else {
    }
  };

  const handleColorPickerOpen = (index: number) => {
    setOpenColorPickerIndex(index);
  };

  const handleColorPickerClose = () => {
    setOpenColorPickerIndex(null);
  };

  return (
    <div className='bottom-menu'>
      <div className='preset-colors'>
        {presetColors.map((color, index) => (
          <button
            key={color}
            className={`color-button ${activeSlot === index ? "active" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => handlePresetColorClick(index)}
          />
        ))}
      </div>

      <div className='separator' />

      <div className='user-colors'>
        {userColors.map((color, index) => (
          <CustomColorSlot
            key={index}
            color={color}
            index={index}
            isActive={activeSlot === index + presetColors.length}
            isColorPickerOpen={openColorPickerIndex === index}
            onColorChange={handleUserColorChange}
            onRemoveColor={handleRemoveUserColor}
            onActivatePipette={handleActivatePipette}
            onSlotClick={handleUserSlotClick}
            onColorPickerOpen={handleColorPickerOpen}
            onColorPickerClose={handleColorPickerClose}
          />
        ))}
      </div>
    </div>
  );
};

export default BottomMenu;
