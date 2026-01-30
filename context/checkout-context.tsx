import { FullCartResult } from "@/actions/cart-actions";
import { Address } from "@/db/schema";
import { CheckoutStep } from "@/types/checkout";

type CheckoutContext = {
  cartData: FullCartResult;
  addresses: Address;
    currentStep: CheckoutStep;
    setCurrentStep:(step:CheckoutStep)=> void;
};
