import React from "react";
import { ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { usePlace } from "../contexts/PlaceContext";

interface ZoomControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => {
  const { zoomLevel } = usePlace();

  return (
    <div className='zoom-controls'>
      <button
        onClick={onZoomIn}
        className='zoom-button zoom-in'
        aria-label='Zoom In'
      >
        <ZoomIn size={20} />
      </button>
      <button
        onClick={onZoomOut}
        className='zoom-button zoom-out'
        aria-label='Zoom Out'
      >
        <ZoomOut size={20} />
      </button>
      <button
        onClick={onResetZoom}
        className='zoom-button zoom-reset'
        aria-label='Reset Zoom'
      >
        <Maximize size={20} />
      </button>
      <span className='zoom-level'>{zoomLevel.toFixed(2)}x</span>
    </div>
  );
};

export default ZoomControls;
