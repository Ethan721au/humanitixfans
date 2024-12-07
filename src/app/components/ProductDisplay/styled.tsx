"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 32px 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

export const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`;

export const Title = styled.div`
  color: var(--Text---text, rgba(27, 27, 27, 0.99));
  text-align: center;
  font-size: 66px;
  font-weight: 700;
  line-height: 110%;
  letter-spacing: -1.32px;
`;

export const Subtitle = styled.div`
  color: var(--Text---text-subtle, rgba(27, 27, 27, 0.99));
  text-align: center;
  max-width: 768px;
  font-size: 20px;
  font-weight: 400;
  line-height: 150%;
`;
