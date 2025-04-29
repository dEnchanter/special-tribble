import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useProductDef = () => {
  const fetchProductDefs = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object for fetching product definitions
      const response = await fetchGet<{ data: ProductDef[] }>(Endpoint.GET_PRODUCT_DEF);
      return response.data; // Assuming the response contains a `data` field that holds the product definitions
    } catch (error) {
      console.error('Error fetching product definitions:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['productDefs'],
    queryFn: fetchProductDefs,
  });
};
