'use client';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/Store/hooks';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartSummary() {
  const cartItems = useAppSelector(state => state.cart.items);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Avoid rendering anything until after hydration
    return null;
  }


   const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
   <Card className="lg:col-span-2 shadow-lg border-none">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {cartItems?.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems?.map(item => (
                  <div
                    key={item?.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      width={60}
                      height={60}
                      className="object-contain rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{item?.title.slice(0, 30)}...</p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-800">${(item?.price * item?.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <p className="flex justify-between text-sm text-gray-600">
                    <span>Total Items:</span>
                    <span>{totalItems}</span>
                  </p>
                  <p className="flex justify-between text-lg font-semibold text-gray-800">
                    <span>Total:</span>
                    <span className="text-blue-600">${totalAmount?.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          {cartItems?.length > 0 && (
            <CardFooter>
              <Button
                asChild
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Link href="/">Continue Shopping</Link>
              </Button>
            </CardFooter>
          )}
        </Card>
  );
}