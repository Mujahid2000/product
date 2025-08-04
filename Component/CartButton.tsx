'use client';

import { CartItem } from '@/app/Types';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/Store/AllStore/Slice/cartSlice';
import { useAppDispatch } from '@/Store/hooks';
import { ShoppingCart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface AddToCartButtonProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      } as CartItem)
    );
    toast.success(`${product.title} added to cart!`, {
      duration: 3000,
      position: 'top-right',
    });
  };

  return (
    <>
      
      <Button
      onClick={handleAddToCart}
                      size="sm"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Add to Cart
                       <ShoppingCart className="h-4 w-4" />
                    </Button>
      <Toaster />
    </>
  );
}