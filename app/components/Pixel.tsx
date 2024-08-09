import React, { memo } from "react";

const Pixel = ({
  color,
  onClick,
  isPipetteActive,
}: {
  color: string;
  onClick: () => void;
  isPipetteActive: boolean;
}) => (
  <div
    className='pixel'
    style={{
      backgroundColor: color || "white",
      cursor: isPipetteActive ? "copy" : "pointer",
    }}
    onClick={onClick}
  />
);

export default memo(Pixel);
