"use client";

import styled from "styled-components";

export const Overlay = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: grey;
  display: ${({ open }) => (open ? "block" : "none")};
  opacity: ${({ open }) => (open ? 0.7 : 0)};
  z-index: 3;
`;
