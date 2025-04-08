// src/hooks/useProductionItems.ts
import { fetchDashboard } from '@/helpers/get-dashboard';
import { useQuery } from '@tanstack/react-query';

export const useDashboardItems = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
  });
};
