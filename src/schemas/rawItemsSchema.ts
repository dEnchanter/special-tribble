import { z } from 'zod';

// Define the schema for the Raw Items form
export const rawItemsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  quantity: z.number().min(0, "Quantity must be greater than or equal to 0"),
  description: z.string().min(1, "Description is required"),
  unit: z.string().min(1, "Unit is required"),
  image_url: z.string().url("Enter a valid URL for the image"),
  typeId: z.number().min(0, "TypeId must be a positive number"),
});

// Define the type for the Raw Items form data
export type RawItemFormData = z.infer<typeof rawItemsSchema>;
