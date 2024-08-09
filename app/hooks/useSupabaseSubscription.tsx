import { useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/pixel.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const useSupabaseSubscription = (
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>
) => {
  const handleRealtimeUpdate = useCallback(
    (payload: any) => {
      const { new: newPixel, old: oldPixel, eventType } = payload;

      setGrid((prevGrid: string[][]) => {
        const newGrid = [...prevGrid];
        if (eventType === "INSERT" || eventType === "UPDATE") {
          newGrid[newPixel.y][newPixel.x] = newPixel.color;
        } else if (eventType === "DELETE") {
          newGrid[oldPixel.y][oldPixel.x] = "";
        }
        return newGrid;
      });
    },
    [setGrid]
  );

  useEffect(() => {
    const channel = supabase
      .channel("grid-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "pixels",
        },
        handleRealtimeUpdate
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [handleRealtimeUpdate, setGrid]);

  return supabase;
};
