"use client";

import styled from "styled-components";

export const Wrapper = styled.div<{
  type?: string;
}>`
  display: flex;
  flex-direction: ${({ type }) => (type === "checkbox" ? "row" : "column")};
  & > label {
    order: ${({ type }) => (type === "checkbox" ? 1 : 0)};
  }

  & > input {
    order: ${({ type }) => (type === "checkbox" ? 0 : 1)};
  }
`;

export const InputField = styled.input<{
  type?: string;
}>`
  appearance: none;
  outline: none;

  width: ${({ type }) => (type === "checkbox" ? "16px" : "100%")};
  height: ${({ type }) => (type === "checkbox" ? "16px" : "100%")};
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  cursor: ${({ type }) => (type === "checkbox" ? "pointer" : "text")};

  &:checked {
    background-color: var(--primary-peach);
    border: none;
  }

  &:focus {
    transition: ${({ type }) =>
      type === "checkbox" ? "none" : "outline-offset 0.2s ease-out"};
    outline: ${({ type }) =>
      type === "checkbox" ? "none" : "var(--focused-base-outline)"};
    outline-offset: ${({ type }) =>
      type === "checkbox" ? "none" : "var(--focused-base-outline-offset)"};
  }
`;

export const Label = styled.label<{
  bold?: string;
}>`
  position: relative;
  font-weight: ${({ bold }) => (bold === "true" ? "bold" : "normal")};

  &::before {
    content: "";
    position: absolute;
    top: 11px;
    left: -15px;
    width: 9px;
    height: 7px;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.46989 6.79557L0.219933 4.69527C-0.073311 4.42153 -0.073311 3.97907 0.219933 3.70533C0.513177 3.43159 0.987167 3.43159 1.28041 3.70533L2.95738 5.27075L7.68078 0.244745C7.95078 -0.049296 8.42402 -0.0829008 8.73751 0.168435C9.0525 0.42047 9.08925 0.861532 8.81926 1.15487L3.56936 6.75566C3.43362 6.90408 3.23712 6.99229 3.02863 6.99999C2.80138 7.00069 2.61013 6.92718 2.46989 6.79557Z" fill="black"/></svg>');
    background-size: cover;
    background-repeat: no-repeat;
    transform: translateY(-50%);
    opacity: 0;
  }

  input:checked + &::before {
    opacity: 1;
  }
`;

export const Select = styled.select`
  width: 100%;
  outline: none;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
`;

export const ImageWrapper = styled.div`
  padding: 10px;
  height: 100px;
  width: 100px;
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;

  /* input:checked ~ & {
    border-color: red;
  } */
`;

export const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;
