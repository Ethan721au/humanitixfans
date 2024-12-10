import { AddOnsWrapper } from "./styled";
import { Input } from "./Input/Input";
import { Product } from "@/app/lib/shopify/types";

export default function AddOns({ addOns }: { addOns: Product[] }) {
  return (
    <AddOnsWrapper>
      {addOns.map((addOn) => (
        <div key={addOn.id}>
          <Input
            product={addOn}
            key={addOn.id}
            type="checkbox"
            name="add-on"
            label={addOn.title}
          />
        </div>
      ))}
    </AddOnsWrapper>
  );
}
