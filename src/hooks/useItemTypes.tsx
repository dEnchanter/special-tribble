import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useItemTypes = () => {
  const fetchItemTypes = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object for fetching product definitions
      const response = await fetchGet<{ data: ItemType[] }>(Endpoint.GET_ITEM_TYPES);
      return response.data; // Assuming the response contains a `data` field that holds the product definitions
    } catch (error) {
      console.error('Error fetching item types:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['itemTypes'],
    queryFn: fetchItemTypes,
  });
};
