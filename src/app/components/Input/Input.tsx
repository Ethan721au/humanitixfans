import { Product, ProductVariant } from "@/app/lib/shopify/types";
import { InputField, Label, Select, Wrapper } from "./styled";

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
  label: string;
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
      {name !== "product" && name !== "variant" && (
        <InputField
          type={type}
          name={name}
          checked={checked}
          id={product?.id}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.checked || e.target.value)}
        />
      )}
      <Label htmlFor={name} bold={bold ? "true" : "false"} data-attr={type}>
        {label}
      </Label>
      {(name === "product" || name === "variant") && (
        <Select
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
        </Select>
      )}
    </Wrapper>
  );
}
