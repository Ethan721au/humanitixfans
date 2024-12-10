"use client";

import { AddOnsWrapper } from "./styled";
import { Input } from "./Input/Input";
import { Product } from "@/app/lib/shopify/types";
import { useState } from "react";

export default function AddOns({ addOns }: { addOns: Product[] }) {
  const [additionalOptions, setAdditionalOptions] = useState(true);
  console.log(additionalOptions, "addOns");
  return (
    <AddOnsWrapper>
      {addOns.map((addOn) => (
        <div
          key={addOn.id}
          onClick={() => setAdditionalOptions(!additionalOptions)}
        >
          <Input
            product={addOn}
            type="checkbox"
            name="addOns"
            label={addOn.title}
          />

          {additionalOptions && <div>sdfsdfsd</div>}
        </div>
      ))}
    </AddOnsWrapper>
  );
}
