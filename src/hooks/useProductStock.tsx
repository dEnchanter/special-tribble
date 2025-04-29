import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useProductStock = () => {
  const fetchProductStock = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object for fetching product stock
      const response = await fetchGet<{ data: ProductStock[] }>(Endpoint.GET_PRODUCTION_STOCK);
      return response.data; // Assuming the response contains a `data` field that holds the product stock
    } catch (error) {
      console.error('Error fetching product stock:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['productStock'],
    queryFn: fetchProductStock,
  });
};
