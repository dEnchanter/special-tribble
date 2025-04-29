import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useRoles = () => {
  const fetchRoles = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object for fetching roles
      const response = await fetchGet<{ data: Role[] }>(Endpoint.GET_ROLES);
      return response.data; // Assuming the response contains a `data` field that holds the roles
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  });
};
