// src/hooks/useProductionItems.ts
import { fetchStaffs } from '@/helpers/get-staffs';
import { useQuery } from '@tanstack/react-query';

export const useStaff = () => {
  return useQuery({
    queryKey: ['staffs'],
    queryFn: fetchStaffs,
  });
};
