import { useState, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { WHITE } from "../lib/colors";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ROWS = 100;
const COLS = 100;

export const useGridData = () => {
  const [grid, setGrid] = useState(
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(WHITE))
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchGridData = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("pixels").select("*");
    if (error) {
      console.error("Error fetching grid data:", error);
    } else if (data) {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        data.forEach((pixel) => {
          if (pixel.x < COLS && pixel.y < ROWS) {
            newGrid[pixel.y][pixel.x] = pixel.color;
          }
        });
        return newGrid;
      });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchGridData();
  }, [fetchGridData]);

  return { grid, setGrid, isLoading };
};
