"use client";

import styled from "styled-components";
import { InputTypes } from "./Input";

export const ProductContainer = styled.label<{
  type: InputTypes;
}>`
  display: flex;
  gap: 10px;
  align-items: ${({ type }) => (type === "text" ? "flex-start" : "center")};
  /* flex-direction: ${({ type }) => (type === "text" ? "column" : "row")}; */
  flex-direction: ${({ type }) => (type === "text" ? "column" : "row")};
  padding-bottom: ${({ type }) => (type === "text" ? "30px" : "0")};
  width: 100%;
  min-width: 600px;

  input[type="radio"],
  input[type="checkbox"],
  input[data-attr="additionalInfo"] {
    display: none;
  }

  div[data-attr="checkbox"] {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 1px solid black;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div[data-attr="checkbox"] svg {
    display: none;
  }

  input[type="checkbox"]:checked + div[data-attr="checkbox"] {
    background-color: var(--primary-peach);
    border: 1px solid white;
  }

  input[type="checkbox"]:checked + div[data-attr="checkbox"] svg {
    display: block;
  }

  input[type="checkbox"]:checked ~ input[data-attr="additionalInfo"] {
    display: block;
  }

  /* input[type="checkbox"]:checked + div[data-attr="testing"] {
    display: block;
  } */

  /* input[type="checkbox"]:checked + input[data-attr="additionalInfo"] {
    display: block;
    opacity: 1;
  } */

  /* input[data-attr="additionalInfo"][type="checkbox"]:checked + input {
    position: relative;
    opacity: 1;
  } */

  /* input[data-attr="additionalInfo"] {
    display: none;
    pointer-events: none;
  } */
`;

export const ImageWrapper = styled.div`
  padding: 10px;
  height: 100px;
  width: 100px;
  border-radius: 4px;
  border: 1px solid black;
  cursor: pointer;

  input:checked ~ & {
    border-color: red;
  }
`;

export const ImageContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputField = styled.input`
  outline: none;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  width: 100%;

  &:focus {
    transition: outline-offset 0.2s ease-out;
    outline: var(--focused-base-outline);
    outline-offset: var(--focused-base-outline-offset);
  }
`;
