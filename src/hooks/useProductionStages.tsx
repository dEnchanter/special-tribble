import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useProductionStages = () => {
  const fetchProductionStages = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object for fetching production stages
      const response = await fetchGet<{ data: ProductionStages[] }>(Endpoint.GET_PRODUCTION_STAGES);
      return response.data; // Assuming the response contains a `data` field that holds the production stages
    } catch (error) {
      console.error('Error fetching production stages:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['productionStages'],
    queryFn: fetchProductionStages,
  });
};
