import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Panzoom, { PanzoomObject } from "@panzoom/panzoom";
import { usePlace } from "../contexts/PlaceContext";
import Pixel from "./Pixel";

const ROWS = 100;
const COLS = 100;
const PIXEL_SIZE = 8;

export interface PixelGridRef {
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
}

const PixelGrid = forwardRef<PixelGridRef, {}>(function PixelGrid(_props, ref) {
  const {
    grid,
    handlePixelClick,
    isPipetteActive,
    setZoomLevel,
    setHoveredPixel,
  } = usePlace();
  const gridRef = useRef<HTMLDivElement>(null);
  const panzoomRef = useRef<PanzoomObject | null>(null);

  useEffect(() => {
    const element = gridRef.current;
    if (element) {
      panzoomRef.current = Panzoom(element, {
        maxScale: 4,
        minScale: 1,
        contain: "outside",
      });

      const handleZoom = () => {
        const zoom = panzoomRef.current?.getScale() ?? 1;
        setZoomLevel(Number(zoom.toFixed(2)));
      };

      element.addEventListener("wheel", panzoomRef.current.zoomWithWheel);
      element.addEventListener("panzoomzoom", handleZoom);

      return () => {
        element.removeEventListener("wheel", panzoomRef.current!.zoomWithWheel);
        element.removeEventListener("panzoomzoom", handleZoom);
        panzoomRef.current?.destroy();
      };
    }
  }, [setZoomLevel]);

  useImperativeHandle(ref, () => ({
    zoomIn: () => panzoomRef.current?.zoomIn(),
    zoomOut: () => panzoomRef.current?.zoomOut(),
    reset: () => panzoomRef.current?.reset(),
  }));

  const handlePixelHover = (x: number, y: number) => {
    setHoveredPixel({ x, y, color: grid[y][x] });
  };

  const handlePixelLeave = () => {
    setHoveredPixel(null);
  };

  return (
    <div
      className='pixel-grid-container'
      onClickCapture={(e) => {
        // Dispatch event to close color picker
        document.dispatchEvent(new MouseEvent("mousedown"));
      }}
    >
      <div
        ref={gridRef}
        className='pixel-grid'
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${PIXEL_SIZE}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${PIXEL_SIZE}px)`,
        }}
      >
        {grid.map((row: any[], y: any) =>
          row.map((color, x) => (
            <Pixel
              key={`${x}-${y}`}
              color={color}
              onClick={() => handlePixelClick(x, y)}
              onMouseEnter={() => handlePixelHover(x, y)}
              onMouseLeave={handlePixelLeave}
              isPipetteActive={isPipetteActive}
            />
          ))
        )}
      </div>
    </div>
  );
});

export default PixelGrid;
