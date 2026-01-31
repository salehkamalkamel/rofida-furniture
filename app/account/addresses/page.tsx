import Link from "next/link";
import { getUserAddresses } from "@/actions/address-actions";
import {
  Plus,
  MapPin,
  Phone,
  MessageSquare,
  ShieldCheck,
  Edit3,
} from "lucide-react";
import DeleteAddressButton from "@/components/delete-address-button";
import { Suspense } from "react";
import AddressesPageSkeleton from "@/components/skeleton/addresses-page-skeleton";

export default async function AddressesPage() {
  return (
    <Suspense fallback={<AddressesPageSkeleton />}>
      <AddressPageLayout />
    </Suspense>
  );
}

async function AddressPageLayout() {
  const userAddresses = await getUserAddresses();

  return (
    <div className="space-y-10" dir="rtl">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b-2 border-foreground pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
              Location_Database_V2
            </span>
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            عناوين التوصيل
          </h1>
          <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-tight">
            إدارة وجهات الشحن المعتمدة للعمليات اللوجستية
          </p>
        </div>

        <Link
          href="/account/addresses/new"
          className="flex items-center gap-3 bg-foreground text-background px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-primary transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عنوان جديد</span>
        </Link>
      </div>

      {userAddresses.length === 0 ? (
        /* EMPTY STATE TERMINAL */
        <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-foreground/10 bg-muted/5">
          <div className="w-16 h-16 bg-muted flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8 text-foreground/20" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[.4em] text-foreground/40 mb-2">
            Null_Records_Found
          </p>
          <p className="text-sm font-bold text-muted-foreground">
            لا توجد عناوين محفوظة حالياً في السجل
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userAddresses.map((address) => (
            <div
              key={address.id}
              className={`relative border-2 p-8 transition-all bg-background flex flex-col ${
                address.isDefault
                  ? "border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-foreground/5"
                  : "border-foreground/10 hover:border-foreground/30"
              }`}
            >
              {/* DEFAULT BADGE STAMP */}
              {address.isDefault && (
                <div className="absolute top-0 left-0 bg-primary text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" />
                  الافتراضي
                </div>
              )}

              {/* ADDRESS IDENTIFIER */}
              <div className="flex justify-between items-start mb-6 pt-2">
                <div>
                  <h3 className="font-black text-lg uppercase tracking-tight leading-none">
                    {address.label || "SITE_OFFICE"}
                  </h3>
                  <p className="text-[9px] font-mono opacity-40 mt-1 uppercase">
                    Ref_ID: {address.id.toString().padStart(4, "0")}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 border flex items-center justify-center ${address.isDefault ? "border-primary/30 bg-primary/10" : "border-foreground/5"}`}
                >
                  <MapPin
                    className={`w-5 h-5 ${address.isDefault ? "text-primary" : "opacity-20"}`}
                  />
                </div>
              </div>

              {/* MANIFEST DETAILS */}
              <div className="flex-1 space-y-4">
                <div>
                  <span className="text-[9px] font-black opacity-30 uppercase tracking-widest block mb-1">
                    Recipient
                  </span>
                  <p className="font-black text-sm uppercase tracking-tight">
                    {address.fullName}
                  </p>
                </div>

                <div>
                  <span className="text-[9px] font-black opacity-30 uppercase tracking-widest block mb-1">
                    Destination_Path
                  </span>
                  <p className="text-xs font-bold text-muted-foreground leading-relaxed uppercase tracking-tighter">
                    {address.street}
                    <br />
                    {address.city}, {address.state}, {address.zip}
                    <br />
                    {address.country}
                  </p>
                </div>

                {/* CONTACT COMMS BLOCK */}
                <div className="pt-4 border-t border-foreground/5 space-y-2">
                  <div className="flex items-center gap-3 font-mono" dir="ltr">
                    <Phone className="w-3 h-3 opacity-30" />
                    <span className="text-[10px] font-bold opacity-60">
                      {address.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-mono" dir="ltr">
                    <MessageSquare className="w-3 h-3 text-green-600/50" />
                    <span className="text-[10px] font-bold opacity-60">
                      {address.whatsApp}
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION COMMANDS */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-foreground/10">
                <Link
                  href={`/account/addresses/edit/${address.id}`}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                  تعديل
                </Link>

                <DeleteAddressButton
                  addressId={address.id}
                  isDefault={address.isDefault}
                />

                {!address.isDefault && (
                  <button className="text-[10px] font-black uppercase tracking-widest text-primary mr-auto hover:opacity-70">
                    Set_As_Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
