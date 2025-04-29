import { z } from 'zod';

// Define the schema for the Material Request form
export const materialRequestSchema = z.object({
  requestDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Enter a valid request date"
  }),
  approveDate: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Enter a valid approve date"
  }),
  requesterId: z.number().min(1, "Requester ID is required"),
  approvedId: z.number().min(1, "Approved ID is required"),
  quantity: z.record(z.unknown()).refine(val => Object.keys(val).length > 0, {
    message: "Quantity is required"
  }),
  materials: z.record(z.unknown()).refine(val => Object.keys(val).length > 0, {
    message: "Materials are required"
  }),
  isAssigned: z.boolean(),
  productionId: z.number().min(1, "Production ID is required"),
});

// Define the type for the Material Request form data
export type MaterialRequestFormData = z.infer<typeof materialRequestSchema>;
