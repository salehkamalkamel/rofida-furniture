"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export interface WishlistItem {
  id: string
  name: string
  nameEn: string
  price: number
  originalPrice?: number
  image: string
  description: string
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isInWishlist: (id: string) => boolean
  toggleItem: (item: WishlistItem) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  const addItem = (item: WishlistItem) => {
    setItems(prev => {
      if (prev.find(i => i.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id)
  }

  const toggleItem = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeItem(item.id)
    } else {
      addItem(item)
    }
  }

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      isInWishlist,
      toggleItem
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
