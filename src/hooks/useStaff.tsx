import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useStaff = () => {
  const fetchStaffs = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object
      const response = await fetchGet<{ data: Staff[] }>(Endpoint.GET_USERS);
      return response.data; // Assuming the response contains a `staff` field
    } catch (error) {
      console.error('Error fetching staffs:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['staffs'],
    queryFn: fetchStaffs,
  });
};
