import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useProductStockStage = () => {
  const fetchProductStockStage = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object for fetching product stock stages
      const response = await fetchGet<{ data: ProductStockStage[] }>(Endpoint.GET_PRODUCT_STOCK_STAGE);
      return response.data; // Assuming the response contains a `data` field that holds the product stock stages
    } catch (error) {
      console.error('Error fetching product stock stages:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['productStockStage'],
    queryFn: fetchProductStockStage,
  });
};