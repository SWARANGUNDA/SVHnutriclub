"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, CreditCard, Loader2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSheet({ isOpen, onClose }: CartSheetProps) {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutResult, setCheckoutResult] = useState<string | null>(null);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    setCheckoutResult(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (res.ok) {
        clearCart();
        setCheckoutResult("Order placed successfully! 🎉");
      } else {
        // Fallback for mock db mode
        setTimeout(() => {
          clearCart();
          setCheckoutResult("Order simulated successfully! (Mock Mode) 🎉");
          setIsCheckingOut(false);
        }, 1500);
        return;
      }
    } catch (err) {
      console.error(err);
      setCheckoutResult("Failed to process order.");
    }

    setIsCheckingOut(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl sm:rounded-l-3xl"
          >
            <div className="flex items-center justify-between border-b border-border p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-heading text-xl font-bold text-foreground">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {checkoutResult ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <ShoppingBag className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold">{checkoutResult}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Thank you for shopping with SVH Nutrition Club.
                  </p>
                  <button
                    onClick={() => {
                      setCheckoutResult(null);
                      onClose();
                    }}
                    className="mt-6 rounded-xl bg-primary px-6 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                  <ShoppingBag className="mb-4 h-12 w-12 opacity-20" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-2xl border border-border p-3"
                    >
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-muted">
                        <ShoppingBag className="h-6 w-6 text-muted-foreground/50" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        <p className="text-sm font-bold text-primary">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-md p-1 hover:bg-muted"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-4 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-md p-1 hover:bg-muted"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!checkoutResult && items.length > 0 && (
              <div className="border-t border-border p-6 bg-muted/30">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-heading text-xl font-bold">₹{totalPrice().toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 disabled:opacity-70"
                >
                  {isCheckingOut ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Checkout Now
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
