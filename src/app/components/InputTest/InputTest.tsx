import { Product, ProductVariant } from "@/app/lib/shopify/types";
import { InputField, Label, Wrapper } from "./styled";

export default function InputTest({
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
  label: string;
  bold?: boolean;
  product?: Product;
  options?: Product[] | ProductVariant[];
  selectedProduct?: any;
  onChange: (any) => void;
  checked?: boolean;
  value?: string;
}) {
  return (
    <Wrapper type={type}>
      <Label htmlFor={name} bold={bold ? "true" : "false"} data-attr="checkbox">
        {label}
      </Label>
      {name !== "product" && name !== "variant" && (
        <InputField
          type={type}
          name={name}
          checked={checked}
          id={product?.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <select
        id={name}
        name={name}
        value={selectedProduct}
        onChange={(e) => onChange(e.target.value)}
      >
        {options?.map((option) => (
          <option
            key={option.id}
            value={name === "product" ? option.handle : option.title}
          >
            {name === "product" ? option.description : option.title}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}
