import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
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
  cursorPosition: { x: number; y: number };
  isMouseOnScreen: boolean;
  hoveredPixel: { x: number; y: number; color: string } | null;
  setHoveredPixel: (
    pixel: { x: number; y: number; color: string } | null
  ) => void;
  deactivatePipette: () => void;
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
  cursorPosition: { x: -1, y: -1 },
  isMouseOnScreen: false,
  hoveredPixel: null,
  setHoveredPixel: () => {},
  deactivatePipette: () => {},
});

export const usePlace = () => useContext(PlaceContext);

export const PlaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isPipetteActive, setIsPipetteActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [cursorPosition, setCursorPosition] = useState({ x: -1, y: -1 });
  const [isMouseOnScreen, setIsMouseOnScreen] = useState(false);
  const [hoveredPixel, setHoveredPixel] = useState<{
    x: number;
    y: number;
    color: string;
  } | null>(null);

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

  const deactivatePipette = useCallback(() => {
    setIsPipetteActive(false);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target && !(e.target as HTMLElement).closest(".pixel-grid")) {
        deactivatePipette();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [deactivatePipette]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsMouseOnScreen(true);
    };

    const handleMouseLeave = () => {
      setIsMouseOnScreen(false);
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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
    cursorPosition,
    isMouseOnScreen,
    hoveredPixel,
    setHoveredPixel,
    deactivatePipette,
  };

  return (
    <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>
  );
};
