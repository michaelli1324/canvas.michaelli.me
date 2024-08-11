"use client";

import React, { useRef } from "react";
import PixelGrid, { PixelGridRef } from "./components/PixelGrid";
import ColorPicker from "./components/ColorPicker";
import ZoomControls from "./components/ZoomControls";
import LoadingScreen from "./components/LoadingScreen";
import { PlaceProvider, usePlace } from "./contexts/PlaceContext";
import ColorIndicator from "./components/ColorIndicator";

const PixelApp: React.FC = () => {
  const pixelGridRef = useRef<PixelGridRef>(null);
  const { isLoading } = usePlace();

  const handleZoomIn = () => pixelGridRef.current?.zoomIn();
  const handleZoomOut = () => pixelGridRef.current?.zoomOut();
  const handleResetZoom = () => pixelGridRef.current?.reset();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='full-page-container'>
      <PixelGrid ref={pixelGridRef} />
      <ColorPicker />
      <ZoomControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
      />
      <ColorIndicator />
    </div>
  );
};

export default function Home() {
  return (
    <PlaceProvider>
      <PixelApp />
    </PlaceProvider>
  );
}