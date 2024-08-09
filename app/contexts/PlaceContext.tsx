import React, { createContext, useContext, useState, useCallback } from "react";
import { useSupabaseSubscription } from "../hooks/useSupabaseSubscription";
import { useGridData } from "../hooks/useGridData";

type PlaceContextType = {
  grid: string[][];
  setGrid: (grid: string[][]) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  isPipetteActive: boolean;
  setIsPipetteActive: (isActive: boolean) => void;
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  handlePixelClick: (x: number, y: number) => void;
  isLoading: boolean;
};

const PlaceContext = createContext<PlaceContextType>({
  grid: [],
  setGrid: () => {},
  selectedColor: "",
  setSelectedColor: () => {},
  isPipetteActive: false,
  setIsPipetteActive: () => {},
  zoomLevel: 1,
  setZoomLevel: () => {},
  handlePixelClick: () => {},
  isLoading: true,
});

export const usePlace = () => useContext(PlaceContext);

export const PlaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isPipetteActive, setIsPipetteActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const { grid, setGrid, isLoading } = useGridData();

  const supabase = useSupabaseSubscription(setGrid);

  const handlePixelClick = async (x: number, y: number) => {
    if (isPipetteActive) {
      setSelectedColor(grid[y][x]);
      setIsPipetteActive(false);
    } else {
      try {
        const { error } = await supabase.from("pixels").upsert(
          {
            x,
            y,
            color: selectedColor,
            date: new Date().toISOString().split("T")[0],
          },
          { onConflict: "x,y" }
        );

        if (error) {
          throw error;
        }

        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[y][x] = selectedColor;
          return newGrid;
        });
      } catch (error) {
        console.error("Error updating pixel:", error);
      }
    }
  };

  const value = {
    grid,
    setGrid,
    selectedColor,
    setSelectedColor,
    isPipetteActive,
    setIsPipetteActive,
    zoomLevel,
    setZoomLevel,
    handlePixelClick,
    isLoading,
  };

  return (
    <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>
  );
};
