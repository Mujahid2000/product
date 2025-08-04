'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useAppSelector } from '@/Store/hooks';
import { FC } from 'react';

interface CartItemType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CartSummary: FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items as CartItemType[]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);



  
  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
        </div>
        <div className="text-sm text-gray-500">{totalItems} items</div>
      </div>

      {/* Cart Content */}
      <div className="px-6 py-6 space-y-5">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is currently empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Totals */}
            <div className="border-t pt-4 text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-900">
                <span>Total:</span>
                <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <Link href="/" className="px-6 py-4 bg-gray-50 border-t">
          <div
            
            className="block w-full text-center text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2 transition"
          >
            Continue Shopping
          </div>
        </Link>
      )}
    </div>
  );
};

const CartItem: FC<{ item: CartItemType }> = ({ item }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">
          {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
        </p>
        <p className="text-xs text-gray-500">
          ${item.price.toFixed(2)} × {item.quantity}
        </p>
      </div>
      <div className="text-sm font-semibold text-gray-800">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartSummary;
