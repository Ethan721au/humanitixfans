import { Content, Label, Wrapper } from "./styled";

export default function InputContainer({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Content>{children}</Content>
    </Wrapper>
  );
}
