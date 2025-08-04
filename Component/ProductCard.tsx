import { Product } from '@/Types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


export default function ProductCard({ product }: { product: Product }) {
  return (
     <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                 
                  
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{product.title.slice(0,20)}...</h3>
                  <div className="flex items-center mb-3">
                    <p className="text-sm text-muted-foreground ml-2">({product.category} reviews)</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      
                    </div>
                    <Link href={`/product/${product.id}`}>
                    <Button>
                      Details
                    </Button>
                    </Link>
                  
                  </div>
                </CardContent>
              </Card>
  );
}