"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
  padding: 20px;
  border-radius: 12px;
`;

export const ProductWrapper = styled.div<{
  name: string;
}>`
  display: ${({ name }) => (name === "product" ? "flex" : "block")};
  flex-direction: ${({ name }) => (name === "product" ? "column" : "")};
  gap: ${({ name }) => (name === "product" ? "10px" : "")};
  padding-bottom: 30px;
`;

export const AddOnsWrapper = styled.div`
  padding-bottom: 30px;
`;
