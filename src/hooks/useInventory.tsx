// src/hooks/useProductionItems.ts
import { fetchInventory } from '@/helpers/get-inventory';
import { useQuery } from '@tanstack/react-query';

export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory,
  });
};
