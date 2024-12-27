import { Product, ProductVariant } from "@/app/lib/shopify/types";
import {
  ImageContainer,
  ImageWrapper,
  InputField,
  Label,
  Select,
  Wrapper,
} from "./styled";
import Image from "next/image";

export default function Input({
  type,
  name,
  label,
  bold,
  options,
  product,
  selectedProduct,
  onChange,
  checked,
  value,
}: {
  type: string;
  name: string;
  label?: string;
  bold?: boolean;
  product?: Product;
  options?: Product[] | ProductVariant[];
  selectedProduct?: string;
  onChange: (e: boolean | string) => void;
  checked?: boolean;
  value?: FormDataEntryValue | undefined | string;
}) {
  return (
    <Wrapper type={type}>
      {name !== "Send-in item" &&
        name !== "variant" &&
        name !== "Item from store" && (
          <InputField
            type={type}
            name={name}
            checked={checked}
            id={name}
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value || e.target.checked)}
          />
        )}
      <Label
        htmlFor={product?.id || name}
        bold={bold ? "true" : "false"}
        data-attr={type}
      >
        {label}
        {name === "Item from store" && (
          <InputField
            type={type}
            onChange={(e) => onChange(e.target.value)}
            name={name}
            id={product?.id}
            value={product?.title}
          />
        )}
        {product?.featuredImage && (
          <ImageWrapper>
            <ImageContainer>
              <Image src={product.featuredImage.url} alt="" fill />
            </ImageContainer>
          </ImageWrapper>
        )}
      </Label>
      {(name === "Send-in item" || name === "variant") && (
        <Select
          id={name}
          name={name}
          value={selectedProduct}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="default" disabled>
            --Select a product--
          </option>
          {options?.map((option) => (
            <option
              key={option.id}
              value={name === "variant" ? option.title : option.handle}
            >
              {name === "variant" ? option.title : option.description}
            </option>
          ))}
        </Select>
      )}
    </Wrapper>
  );
}
