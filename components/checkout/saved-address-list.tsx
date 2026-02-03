import { Address } from "@/db/schema";
import { Check, MapPin, Phone, User } from "lucide-react";

export default function SavedAddressList({
  addresses,
  selectedAddressId,
  setCurrentShippingRule,
  handleSelectAddress,
}: {
  addresses: Address[];
  selectedAddressId: number | null;
  setCurrentShippingRule: (value: number | null) => void;

  handleSelectAddress: (addressId: number) => void;
}) {
  return (
    <div className="space-y-6 mb-8" dir="rtl">
      {/* SECTION LABEL */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">
          DESTINATION_MANIFEST
        </span>
        <div className="h-px flex-1 bg-foreground/10" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {addresses.map((address) => {
          const isSelected = selectedAddressId === address.id;

          return (
            <label
              key={address.id}
              onClick={() => {
                setCurrentShippingRule(address.shippingRuleId);
                handleSelectAddress(address.id);
              }}
              className={`
                relative flex items-start gap-4 p-5 border-2 cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "border-foreground bg-foreground/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1"
                    : "border-foreground/10 bg-background hover:border-foreground/30"
                }
              `}
            >
              {/* STATUS INDICATOR */}
              <div className="pt-1">
                <div
                  className={`
                  w-5 h-5 border-2 flex items-center justify-center transition-colors
                  ${isSelected ? "bg-primary border-primary text-white" : "border-foreground/20"}
                `}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-4" />}
                </div>
              </div>

              {/* ADDRESS CONTENT */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm uppercase tracking-tighter">
                      {address.label || "SITE_01"}
                    </h3>
                    {address.isDefault && (
                      <span className="text-[8px] font-black px-1.5 py-0.5 bg-primary text-white uppercase tracking-widest">
                        DEFAULT
                      </span>
                    )}
                  </div>
                  <MapPin
                    className={`w-4 h-4 ${isSelected ? "text-primary" : "opacity-20"}`}
                  />
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground leading-tight">
                    {address.street}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-tight">
                    {address.city}, {address.state}, {address.zip}
                  </p>
                </div>

                {/* LOGISTICS META */}
                <div className="mt-4 pt-4 border-t border-foreground/5 flex flex-wrap gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3 opacity-40" />
                    <span className="text-[10px] font-bold opacity-60 uppercase">
                      {address.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <Phone className="w-3 h-3 opacity-40" />
                    <span className="text-[10px] font-bold opacity-60">
                      {address.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* HIDDEN RADIO FOR ACCESSIBILITY */}
              <input
                type="radio"
                name="address-selection"
                checked={isSelected}
                className="sr-only"
                readOnly
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}
