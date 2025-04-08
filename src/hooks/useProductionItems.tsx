// src/hooks/useProductionItems.ts
import { fetchItemsInProduction } from '@/helpers/get-items-in-production';
import { useQuery } from '@tanstack/react-query';

export const useProductionItems = () => {
  return useQuery({
    queryKey: ['productionItems'],
    queryFn: fetchItemsInProduction,
  });
};
