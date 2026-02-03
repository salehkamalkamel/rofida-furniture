import { Address } from "@/db/schema";
import { EmptyAddressState } from "./empty-address-state";
import NewAddressForm from "./new-address-form";
import SavedAddressList from "./saved-address-list";
import { Plus, AlertTriangle, ChevronRight, Map } from "lucide-react";
import { ShippingRules } from "@/actions/shipping-actions";

type Props = {
  savedAddresses: Address[];
  onAddNewAddress: () => void;
  handleSelectAddress: (addressId: number) => void;
  selectedAddressId: number | null;
  showNewAddressForm: boolean;
  closeNewAddressForm: () => void;
  setCurrentShippingRule: (value: number | null) => void;
  errors?: string;
  shippingRules: ShippingRules;
};

export default function CheckoutAddress({
  handleSelectAddress,
  savedAddresses,
  selectedAddressId,
  showNewAddressForm,
  closeNewAddressForm,
  errors,
  onAddNewAddress,
  shippingRules,
  setCurrentShippingRule,
}: Props) {
  const hasSavedAddresses = savedAddresses.length > 0;

  return (
    <section
      className="bg-background border-2 border-foreground overflow-hidden"
      dir="rtl"
    >
      {/* SECTION STATUS BAR */}
      <div className="bg-muted/5 border-b-2 border-foreground p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center">
            <Map className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] leading-none">
              عنوان التوصيل
            </h2>
            <p className="text-[10px] font-bold opacity-40 mt-1 uppercase tracking-tighter">
              Logistics / Delivery Node
            </p>
          </div>
        </div>

        {hasSavedAddresses && !showNewAddressForm && (
          <button
            onClick={onAddNewAddress}
            className="group flex items-center gap-2 px-4 py-2 bg-foreground text-background hover:bg-primary transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">
              إضافة عنوان
            </span>
          </button>
        )}

        {showNewAddressForm && (
          <button
            onClick={closeNewAddressForm}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-4 h-4" />
            العودة للقائمة
          </button>
        )}
      </div>

      <div className="p-4 sm:p-8">
        {/* SYSTEM ERROR ALERT */}
        {errors && (
          <div className="mb-8 flex gap-4 p-4 bg-destructive/5 border-2 border-destructive animate-in fade-in slide-in-from-top-2">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-destructive block mb-1">
                Field Validation Error
              </span>
              <p className="text-sm font-bold text-destructive">{errors}</p>
            </div>
          </div>
        )}

        {/* COMPONENT ROUTING */}
        <div className="relative">
          {!hasSavedAddresses && !showNewAddressForm && (
            <EmptyAddressState onAddNew={onAddNewAddress} />
          )}

          {hasSavedAddresses && !showNewAddressForm && (
            <SavedAddressList
              setCurrentShippingRule={setCurrentShippingRule}
              handleSelectAddress={handleSelectAddress}
              addresses={savedAddresses}
              selectedAddressId={selectedAddressId}
            />
          )}

          {showNewAddressForm && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <NewAddressForm
                setCurrentShippingRule={setCurrentShippingRule}
                closeNewAddressForm={closeNewAddressForm}
                shippingRules={shippingRules.data}
              />
            </div>
          )}
        </div>
      </div>

      {/* TECHNICAL FOOTER ACCENT */}
      <div className="h-1 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)]" />
    </section>
  );
}
