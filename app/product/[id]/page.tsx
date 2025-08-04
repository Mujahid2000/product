import { Metadata } from 'next';
import Image from 'next/image';
import { fetchProductById, fetchProducts } from '../../../utils/api';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/Component/CartButton';
import { Product } from '@/app/Types/index';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

// Explicitly type generateStaticParams to match the dynamic route
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const products = await fetchProducts();
  return products.map(product => ({ id: product.id.toString() }));
}

// Explicitly type generateMetadata to handle dynamic params
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const product = await fetchProductById(Number(resolvedParams.id));
    return {
      title: `${product.title} | E-commerce Showcase`,
      description: product.description.slice(0, 160),
    };
  } catch (error) {
    console.error('Error fetching product metadata:', error);
    return {
      title: 'Product Not Found | E-commerce Showcase',
      description: 'The requested product could not be loaded.',
    };
  }
}

// Define the page props type with Promise for params
type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  let resolvedParams: { id: string };
  try {
    // Resolve the params Promise as per your instruction
    resolvedParams = await params;
  } catch (error) {
    console.error('Error resolving params:', error);
    return (
      <div className="text-center text-red-500 pt-20">
        Error resolving product ID: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  try {
    const product = await fetchProductById(Number(resolvedParams.id));
    if (!product) return notFound();

    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="max-w-4xl mx-auto shadow-lg border-none transform transition-all duration-300 hover:shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-t-lg">
            <CardTitle className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-indigo-600" />
              {product.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                className="object-contain rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              />
            </div>
            <div className="space-y-6">
              <p className="text-gray-600 text-lg">${product.price.toFixed(2)}</p>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-800">{product.category}</span></p>
              <AddToCartButton product={{ id: product.id, title: product.title, price: product.price, image: product.image }} />
            </div>
          </CardContent>
          {/* <AddToCartButton product={{ id: product.id, title: product.title, price: product.price, image: product.image }} /> */}
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    return (
      <div className="text-center text-red-500 pt-20">
        Error loading product: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }
}