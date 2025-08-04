'use client';

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/Store/hooks';
import { Order, CartItem } from '@/app/Types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { Package } from 'lucide-react';
import { addOrder } from '@/Store/AllStore/Slice/orderSlice';

export default function OrderTable() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.order.orders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Sync orders with localStorage
  useEffect(() => {
    // Load orders from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        const parsedOrders: Order[] = JSON.parse(storedOrders);
        // Sync localStorage orders to Redux if not already present
        parsedOrders.forEach(order => {
          if (!orders.find(o => o.id === order.id)) {
            dispatch(addOrder(order));
          }
        });
      }
    }
  }, [dispatch]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  return (
    <section className="max-w-5xl mx-auto">
      <Card className="shadow-lg border-none">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="flex items-center gap-2 text-2xl text-gray-800">
            <Package className="h-6 w-6 text-blue-600" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders placed yet.</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-700 font-semibold">Order ID</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Customer</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Items</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Total</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Date</TableHead>
                    <TableHead className="text-gray-700 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(order => (
                    <TableRow
                      key={order.id}
                      className="cursor-pointer hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.totalItems}</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {selectedOrder && (
                <Card className="mt-6 shadow-md border-none">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Order Details - {selectedOrder.id.slice(0, 8)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><strong className="text-gray-700">Customer:</strong> {selectedOrder.customerName}</p>
                        <p><strong className="text-gray-700">Phone:</strong> {selectedOrder.phoneNumber}</p>
                        <p className="md:col-span-2"><strong className="text-gray-700">Address:</strong> {selectedOrder.shippingAddress}</p>
                      </div>
                      <Separator />
                      <p className="text-gray-700 font-semibold">Items Ordered:</p>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item: CartItem) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              width={50}
                              height={50}
                              className="object-contain rounded-md"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{item.title.slice(0, 40)}...</p>
                              <p className="text-sm text-gray-500">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <p className="text-lg font-semibold text-gray-800">
                        Total: <span className="text-blue-600">${selectedOrder.totalAmount.toFixed(2)}</span>
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => setSelectedOrder(null)}
                    >
                      Close
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}