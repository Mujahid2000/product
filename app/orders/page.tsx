import OrderTable from '@/Component/OrderTable';
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Orders | E-commerce Showcase',
  description: 'View your order history.',
};

export default function OrdersPage() {
  return (
    <section>
      <OrderTable />
    </section>
  );
}