import React, { memo } from "react";

interface PixelProps {
  color: string;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isPipetteActive: boolean;
}

const Pixel: React.FC<PixelProps> = ({
  color,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isPipetteActive,
}) => (
  <div
    className='pixel'
    style={{
      backgroundColor: color || "white",
      cursor: isPipetteActive ? "copy" : "pointer",
    }}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  />
);

export default memo(Pixel);