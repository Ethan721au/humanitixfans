"use client";

import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled(Link)`
  border: none;
  border-radius: 36px;
  padding: 0 24px;
  cursor: pointer;
  height: 52px;
  background-color: var(--Surface-Background---surface-accent, #ffb593);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  color: black;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: var(--Surface-Background---surface-accent-hover, #ff9f7e);
  }
`;
