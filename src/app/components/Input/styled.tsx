"use client";

import styled from "styled-components";

export const InputField = styled.input`
  outline: none;
  border-radius: 4px;
  border: 1px solid #e5e5e5;

  &:focus {
    transition: outline-offset 0.2s ease-out;
    outline: var(--focused-base-outline);
    outline-offset: var(--focused-base-outline-offset);
  }
`;
