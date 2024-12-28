"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Overlay } from "./styled";

const DynamicOverlay = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("cart") === "edited") {
      setIsOverlayOpen(true);
    } else {
      setIsOverlayOpen(false);
    }
  }, [searchParams]);

  return <Overlay open={isOverlayOpen} />;
};

export default DynamicOverlay;
