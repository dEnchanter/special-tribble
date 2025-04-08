// src/hooks/useProductionItems.ts
import { fetchProducts } from '@/helpers/get-products';
import { useQuery } from '@tanstack/react-query';

export const useProduct = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
};
