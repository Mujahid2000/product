'use client';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/Store/hooks';
import { addOrder } from '@/Store/AllStore/Slice/orderSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {  CheckCircle, } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function CheckoutForm() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: '',
    shippingAddress: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.shippingAddress.trim()) newErrors.shippingAddress = 'Shipping address is required';
    if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Valid 10-digit phone number is required';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newOrderId = uuidv4();
    const order = {
      id: newOrderId,
      customerName: formData.fullName,
      shippingAddress: formData.shippingAddress,
      phoneNumber: formData.phoneNumber,
      items: cartItems,
      totalItems,
      totalAmount,
      orderDate: new Date().toISOString(),
    };

    dispatch(addOrder(order));
    setSubmitted(true);
    setOrderId(newOrderId);
    toast.success('Order placed successfully!', {
      duration: 4000,
      position: 'top-right',
      style: {
        background: '#22c55e',
        color: '#ffffff',
        padding: '16px',
        borderRadius: '8px',
      },
    });
    toast.success(`Thank You`, {
      duration: 3000,
      position: 'top-right',
    });
  };

  if (submitted) {
    return (
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="shadow-lg border-none">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
              <CheckCircle className="h-8 w-8 text-green-600" />
              Order Confirmed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg text-gray-600 mb-6">Thank you for your purchase! Your order has been successfully placed.</p>
            <div className="space-y-4">
              <p className="text-gray-800">Order ID: {orderId?.slice(0, 8)}</p>
              <p className="text-gray-800">Name: {formData.fullName}</p>
              <p className="text-gray-800">Shipping Address: {formData.shippingAddress}</p>
              <p className="text-gray-800">Phone: {formData.phoneNumber}</p>
              <Separator />
              <p className="text-gray-800 font-semibold">Items Ordered:</p>
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="object-contain rounded-md"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.title.slice(0, 40)}...</p>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <p className="text-lg font-semibold text-gray-800">
                Total: <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Checkout Form */}
        <Card className="lg:col-span-3 shadow-lg border-none">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-xl text-gray-800">Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    aria-invalid={!!errors.fullName}
                    className={`rounded-lg transition-all duration-200 ${
                      errors.fullName ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shippingAddress" className="text-sm font-medium text-gray-700">
                    Shipping Address
                  </Label>
                  <Input
                    id="shippingAddress"
                    type="text"
                    value={formData.shippingAddress}
                    onChange={e => setFormData({ ...formData, shippingAddress: e.target.value })}
                    placeholder="123 Main St, City, Country"
                    aria-invalid={!!errors.shippingAddress}
                    className={`rounded-lg transition-all duration-200 ${
                      errors.shippingAddress ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                  />
                  {errors.shippingAddress && <p className="text-sm text-red-500">{errors.shippingAddress}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="123-456-7890"
                    aria-invalid={!!errors.phoneNumber}
                    className={`rounded-lg transition-all duration-200 ${
                      errors.phoneNumber ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'
                    }`}
                  />
                  {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}