"use client";

import { useCart } from "@/app/hooks/useCart";
import {
  LogoDivider,
  LogoLeftSection,
  LogoLeftSectionText,
  LogoRightSection,
  LogoRightSectionBottomText,
  LogoRightSectionTopText,
  LogoWrapper,
  Wrapper,
} from "./styled";

export default function Header() {
  const { cart } = useCart();

  return (
    <Wrapper>
      <LogoWrapper href={"/"}>
        <LogoLeftSection>
          {logo}
          <LogoLeftSectionText>for fans</LogoLeftSectionText>
        </LogoLeftSection>
        <LogoDivider />
        <LogoRightSection>
          <LogoRightSectionTopText>Powered by</LogoRightSectionTopText>
          <LogoRightSectionBottomText>Hugh Jackman</LogoRightSectionBottomText>
        </LogoRightSection>
      </LogoWrapper>
      <div style={{ color: "black" }}>{cart?.totalQuantity}</div>
    </Wrapper>
  );
}

const logo = (
  <svg xmlns="http://www.w3.org/2000/svg" width="131" height="23" fill="none">
    <g fill="#353337" clipPath="url(#a)">
      <path d="M11.646 13.098c-1 0-1.526-.533-1.526-1.539V8.972a.63.63 0 0 0-.407-.643.619.619 0 0 0-.267-.035H5.978a.619.619 0 0 0-.637.41.63.63 0 0 0-.036.268v2.587c0 1.006-.528 1.539-1.527 1.539H1.526C.529 13.098 0 12.565 0 11.559V1.904C0 .898.529.366 1.526.366h2.253c1 0 1.527.533 1.527 1.54V3.65a.63.63 0 0 0 .18.497.62.62 0 0 0 .492.181h3.47a.619.619 0 0 0 .637-.41.629.629 0 0 0 .035-.268V1.905c0-1.007.527-1.54 1.526-1.54h2.252c1 0 1.527.533 1.527 1.54v9.654c0 1.006-.528 1.539-1.527 1.539h-2.252Zm9.964.21c-2.439 0-3.676-1.126-3.676-3.34V1.904c0-1.007.529-1.54 1.528-1.54h2.07c1 0 1.528.533 1.528 1.54V8.22c0 .865.634.965 1.112.965.483 0 .966-.035 1.443-.105a.64.64 0 0 0 .592-.444.652.652 0 0 0 .03-.26v-6.47c0-1.007.529-1.54 1.528-1.54h2.096c1 0 1.526.533 1.526 1.54v9.654c0 1.006-.526 1.539-1.526 1.539h-1.139c-.732 0-1.201-.193-1.475-.608l-.053-.08a.605.605 0 0 0-.465-.288.64.64 0 0 0-.334.107 11.525 11.525 0 0 1-4.785 1.079Zm28.986-.21c-1 0-1.528-.533-1.528-1.539V5.244c0-.667-.292-.94-1.008-.94h-.375c-.239-.001-.477.019-.713.06a.703.703 0 0 0-.569.753v6.442c0 1.006-.528 1.539-1.527 1.539H43.01c-1 0-1.526-.533-1.526-1.539V5.244c0-.65-.32-.94-1.036-.94a7.075 7.075 0 0 0-1.003.052.694.694 0 0 0-.621.756v6.447c0 1.006-.53 1.539-1.526 1.539h-2.05c-1 0-1.528-.533-1.528-1.539V1.904c0-1.007.528-1.539 1.528-1.539h1.061c.644 0 1.088.157 1.377.488l.099.147c.11.175.257.358.498.358a.689.689 0 0 0 .325-.098A8.367 8.367 0 0 1 42.91.006c1.243 0 2.159.342 2.727 1.016a.684.684 0 0 0 .516.27.772.772 0 0 0 .412-.142C47.707.376 49.022 0 50.595 0c2.37 0 3.575 1.177 3.575 3.497v8.062c0 1.006-.528 1.539-1.528 1.539h-2.047Zm9.543.365c-1.195 0-2.272-.314-3.034-.901a3.2 3.2 0 0 1-1.261-2.647V8.617c0-1.98 1.575-3.21 4.115-3.21h3.7c.466 0 .466-.372.466-.495v-.235c-.033-.844-.561-.992-1.657-.992-1.399.006-2.797.033-4.195.08h-.063c-.904 0-1.431-.535-1.564-1.588-.068-.42.033-.85.28-1.196a1.526 1.526 0 0 1 1.06-.586A54.348 54.348 0 0 1 63.77 0c3.915 0 5.512 1.496 5.512 5.17v6.363c.015.419-.144.826-.44 1.124a1.493 1.493 0 0 1-1.114.442h-1.399c-.524 0-1.008-.243-1.18-.592l-.105-.182c-.091-.209-.22-.253-.31-.253a.386.386 0 0 0-.237.097c-1.11.857-2.576 1.294-4.357 1.294Zm1.818-5.74c-.691 0-1.139.378-1.139.965v.417c0 .47.326.967 1.243.967.527-.006 1.052-.05 1.572-.133a.592.592 0 0 0 .524-.627V8.304c0-.377-.196-.576-.57-.576l-1.63-.006Zm19.54 5.375c-1 0-1.526-.533-1.526-1.539V5.244c0-.659-.326-.94-1.089-.94a13.453 13.453 0 0 0-1.65.083c-.42.065-.62.313-.62.73v6.442c0 1.006-.53 1.539-1.529 1.539H73.01c-1 0-1.528-.533-1.528-1.539V1.904c0-1.007.529-1.539 1.528-1.539h1.116a1.694 1.694 0 0 1 1.378.627l.076.101a.62.62 0 0 0 .51.343.82.82 0 0 0 .386-.115C78.175.454 79.796 0 81.162 0c2.61 0 3.933 1.527 3.933 4.543v7.02c0 1.005-.529 1.538-1.528 1.538l-2.07-.003ZM91.02.36h-2.043c-.844 0-1.528.684-1.528 1.527v9.676c0 .844.684 1.528 1.528 1.528h2.042c.844 0 1.529-.684 1.529-1.528V1.887c0-.843-.684-1.528-1.529-1.528ZM100.09 13.098c-1 0-1.528-.504-1.528-1.458V5.505h-2.553c-1.07 0-1.638-.532-1.638-1.54v-2.06c0-1.007.567-1.54 1.638-1.54h10.204c1.073 0 1.639.533 1.639 1.54v2.06c0 1.007-.566 1.54-1.639 1.54h-2.552v6.135c0 .954-.529 1.458-1.528 1.458h-2.043Zm27.297.032c-.42 0-.836-.189-1.243-.562l-2.387-2.214-2.392 2.214c-.404.373-.82.562-1.243.562-.423 0-.836-.189-1.243-.562l-1.635-1.513c-.398-.369-.601-.75-.601-1.129 0-.378.203-.759.601-1.13l2.421-2.232-2.412-2.23c-.398-.37-.601-.75-.601-1.13 0-.381.203-.76.601-1.13l1.636-1.511c.401-.374.817-.563 1.233-.563.415 0 .836.19 1.243.563l2.39 2.213 2.393-2.213c.403-.374.819-.563 1.243-.563.424 0 .838.19 1.244.563l1.632 1.511c.4.37.602.75.602 1.13 0 .38-.202.76-.602 1.13l-2.417 2.23 2.41 2.233c.4.37.601.75.601 1.13 0 .38-.201.759-.601 1.128l-1.634 1.513c-.402.373-.82.562-1.239.562ZM113.201.36h-2.042c-.844 0-1.528.684-1.528 1.527v9.676c0 .844.684 1.528 1.528 1.528h2.042c.844 0 1.528-.684 1.528-1.528V1.887c0-.843-.684-1.528-1.528-1.528ZM114.275 22.713c-.772 0-1.544-.047-2.31-.143a1.692 1.692 0 0 1-1.448-1.354 1.733 1.733 0 0 1 0-.71l.237-1.118a1.725 1.725 0 0 1 1.867-1.37c.549.065 1.102.098 1.654.098 3.086 0 6.042-1.05 7.534-2.675a1.7 1.7 0 0 1 2.085-.332l1.024.58a1.732 1.732 0 0 1 .467 2.627c-2.367 2.747-6.517 4.397-11.111 4.397h.001Z"></path>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h131v22.717H0z"></path>
      </clipPath>
    </defs>
  </svg>
);
