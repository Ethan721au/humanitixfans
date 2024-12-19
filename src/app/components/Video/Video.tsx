"use client";

import { useEffect, useState } from "react";
import {
  VideoContainer,
  VideoOverlay,
  TextWrapper,
  Wrapper,
  Title,
  Subtitle,
} from "./styled";
import useWindowSize from "@/app/hooks/useWindowSize";
import { video } from "@/app/lib/constants";

export const initialVideoSize = {
  clipPath: "inset(0%)",
  matrix: "matrix(1, 0, 0, 1, 0, 0)",
};

export default function Video() {
  const { isMobile } = useWindowSize();
  const [videoSize, setVideoSize] = useState(initialVideoSize);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", adjustVideoSize);

      return (): void => {
        window.removeEventListener("scroll", adjustVideoSize);
      };
    }
  }, []);

  const adjustVideoSize = () => {
    const scrollY = window.scrollY;
    const scrollLimit = 500;

    if (scrollY < scrollLimit) {
      const newClipPath = `inset(${6.25 * (scrollY / scrollLimit)}% round ${40 * (scrollY / scrollLimit)}px)`;
      const newMatrix = `matrix(${1 - 0.05 * (scrollY / scrollLimit)}, 0, 0, ${1 - 0.05 * (scrollY / scrollLimit)}, 0, 0)`;
      setVideoSize({ clipPath: newClipPath, matrix: newMatrix });
    }
  };

  return (
    <Wrapper videosize={videoSize}>
      <VideoOverlay />
      <VideoContainer
        src={isMobile ? video.mobile : video.desktop}
        autoPlay={true}
        loop={true}
        muted={true}
      />
      <TextWrapper>
        <Title>Hugh Jackman</Title>
        <Subtitle>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </Subtitle>
      </TextWrapper>
    </Wrapper>
  );
}
