import { Wrapper } from "./styled";

export default function Button({ link }: { link: string }) {
  return (
    <Wrapper href={link} target="blank">
      Buy{arrowRight}
    </Wrapper>
  );
}

const arrowRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="none">
    <path
      fill="#1B1B1B"
      fillOpacity=".99"
      fillRule="evenodd"
      d="M9.33.461a1.125 1.125 0 0 1 1.59 0l6.75 6.75a1.125 1.125 0 0 1 0 1.591l-6.75 6.75a1.124 1.124 0 0 1-1.59-1.59l4.83-4.83H1.124a1.125 1.125 0 1 1 0-2.25h13.034l-4.83-4.83a1.125 1.125 0 0 1 0-1.59Z"
      clipRule="evenodd"
    ></path>
  </svg>
);
