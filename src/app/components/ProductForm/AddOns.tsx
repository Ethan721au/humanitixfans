"use client";

import { AddOnsWrapper } from "./styled";
import { Input } from "./Input/Input";
import { Product } from "@/app/lib/shopify/types";
import { useState } from "react";

export default function AddOns({ addOns }: { addOns: Product[] }) {
  const defaultCheckedItems = Object.fromEntries(
    addOns.map((addOn) => [addOn.id, false])
  );
  const [checkedItems, setCheckedItems] = useState(defaultCheckedItems);

  const handleItemChecked =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: e.target.checked,
      }));
    };

  return (
    <AddOnsWrapper>
      {addOns.map((addOn) => (
        <div key={addOn.id}>
          <Input
            product={addOn}
            type="checkbox"
            name="addOns"
            label={addOn.title}
            value={checkedItems[addOn.id]}
            onChange={handleItemChecked(addOn.id)}
          />
          {checkedItems[addOn.id] && (
            <Input
              label={`${addOn.title} *`}
              name={addOn.description}
              type="text"
            />
          )}
        </div>
      ))}
    </AddOnsWrapper>
  );
}
