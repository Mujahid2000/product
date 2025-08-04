import CartSummary from '@/Component/CartSummary';
import CheckoutForm from '@/Component/CheckoutForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | E-commerce Showcase',
  description: 'Complete your purchase with our secure and streamlined checkout process.',
  robots: 'noindex',
};

export default function CheckoutPage() {
  return (
    <div className='flex flex-col lg:flex-row gap-8 container mx-auto px-4 py-12'>
      <CheckoutForm />
      <CartSummary/>
    </div>
  );
}