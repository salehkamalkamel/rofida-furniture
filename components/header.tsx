"use client";

import { useEffect, useState } from "react";
import HeaderLayout from "./header-layout";
import { getCartItemsCount } from "@/actions/cart-actions";
import { getWishlistItemsCount } from "@/actions/wishlist-actions";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const [cartLength, setCartLength] = useState(0);
  const [wishlistLength, setWishlistLength] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    authClient.getSession().then((session) => {
      setIsAuthenticated(Boolean(session));
    });

    getCartItemsCount().then((res) => {
      setCartLength(res?.data ?? 0);
    });

    getWishlistItemsCount().then((res) => {
      setWishlistLength(res.success ? res.data : 0);
    });
  }, []);

  return (
    <HeaderLayout
      isAuthinticated={isAuthenticated}
      cartLength={cartLength}
      wishlistLength={wishlistLength}
    />
  );
}
