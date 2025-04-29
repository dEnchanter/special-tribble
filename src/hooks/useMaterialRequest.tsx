import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useMaterialRequest = () => {
  const fetchMaterialRequests = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object for fetching material requests
      const response = await fetchGet<{ data: MaterialRequest[] }>(Endpoint.GET_MATERIAL_REQUEST);
      return response.data; // Assuming the response contains a `data` field that holds the material requests
    } catch (error) {
      console.error('Error fetching material requests:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['materialRequests'],
    queryFn: fetchMaterialRequests,
  });
};
