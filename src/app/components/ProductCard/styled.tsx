"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  border: 1px solid #e5e5e5;
  border-radius: 24px;
  height: 100%;
  width: 100%;
  max-width: 416px;
  padding: 104px 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
`;

export const Title = styled.div`
  font-size: 23px;
  font-weight: 700;
  line-height: 28px;
`;

export const Description = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 32px 16px;
  background: var(--Background---background-accent-peach-subtlest, #ffefe9);
  border-radius: 16px;
  text-align: center;
`;

export const PriceText = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 120%;
`;

export const PriceAmount = styled.div`
  font-size: 36px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.72px;
`;
