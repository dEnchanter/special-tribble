import { Endpoint } from '@/services/api';
import { fetchGet } from '@/services/fetcher';
import { useQuery } from '@tanstack/react-query';

export const useInvoiceStages = () => {
  const fetchInvoiceStages = async () => {
    try {
      // Use the appropriate endpoint from the Endpoint object for fetching invoice stages
      const response = await fetchGet<{ data: InvoiceStages[] }>(Endpoint.GET_INVOICE_STAGES);
      return response.data; // Assuming the response contains a `data` field that holds the invoice stages
    } catch (error) {
      console.error('Error fetching invoice stages:', error);
      throw error; // Handle the error as needed
    }
  };

  return useQuery({
    queryKey: ['invoiceStages'],
    queryFn: fetchInvoiceStages,
  });
};
