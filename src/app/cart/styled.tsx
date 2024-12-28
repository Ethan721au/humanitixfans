"use client";

import styled from "styled-components";

export const PageWrapper = styled.main`
  position: relative;
`;

export const ProductSection = styled.section`
  padding-top: 36px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ImageWrapper = styled.div`
  padding: 10px;
  height: 100px;
  width: 100px;
  position: relative;
`;

export const Testing = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 50px;
  right: 50px;
  min-height: 600px;
  z-index: 3;
`;
