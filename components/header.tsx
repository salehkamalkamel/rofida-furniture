import { getCartItemsCount } from "@/actions/cart-actions";
import { getWishlistItemsCount } from "@/actions/wishlist-actions";
import HeaderLayout from "./header-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const cartLength = (await getCartItemsCount()) || 0;
  const wishlistLength = (await getWishlistItemsCount()) || 0;
  const isAuthinticated = Boolean(session?.user);
  return (
    <HeaderLayout
      isAuthinticated={isAuthinticated}
      cartLength={cartLength.data}
      wishlistLength={wishlistLength.success ? wishlistLength.data : 0}
    />
  );
}
