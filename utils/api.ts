import { Product } from '@/app/Types';
import axios from 'axios';


export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get('https://fakestoreapi.com/products');
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return response.data;
};