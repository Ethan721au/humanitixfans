"use client";

import Link from "next/link";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
`;

export const LogoWrapper = styled(Link)`
  display: flex;
  gap: 12px;
`;

export const LogoLeftSection = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const LogoLeftSectionText = styled.div`
  font-size: 20px;
  line-height: 120%;
  color: #1b1b1b;
  position: absolute;
  top: 15px;
`;

export const LogoDivider = styled.div`
  width: 1.1px;
  height: 36.3px;
  background: var(--Border---border-subtlest, rgba(27, 27, 27, 0.14));
  display: inline-block;
`;

export const LogoRightSection = styled.div`
  flex-direction: column;
  justify-content: center;
`;

export const LogoRightSectionTopText = styled.div`
  font-size: 13.2px;
  font-weight: 400;
  line-height: 120%;
  letter-spacing: -0.264px;
  color: var(--Text---text-subtlest, rgba(27, 27, 27, 0.7));
`;

export const LogoRightSectionBottomText = styled.div`
  font-size: 13.2px;
  font-weight: 650;
  line-height: 120%;
  letter-spacing: -0.264px;
  color: #1b1b1b;
`;

export const CartIconWrapper = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  position: relative;
`;

export const CountBubble = styled.div`
  position: absolute;
  font-weight: bold;
  background-color: var(--primary-peach);
  color: black;
  height: 17px;
  width: 17px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  bottom: 7px;
  left: 5px;
  line-height: calc(1 + 0.1 / var(--font-body-scale));
`;
