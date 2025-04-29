import { z } from 'zod';

// Define the schema for the Staff form
export const staffSchema = z.object({
  staffName: z.string().min(1, "Staff name is required"),
  dob: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Enter a valid date of birth"
  }),
  picture: z.string().url("Enter a valid URL for the picture").optional(),
  address: z.string().min(1, "Address is required"),
  lga: z.string().min(1, "LGA is required"),
  stateOfOrigin: z.string().min(1, "State of origin is required"),
  country: z.string().min(1, "Country is required"),
  identity: z.object({
    additionalProp1: z.record(z.unknown()).optional(),
  }).optional(),
  email: z.string().email("Enter a valid email"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  nextOfKin: z.object({
    additionalProp1: z.record(z.unknown()).optional(),
  }).optional(),
  references: z.object({
    additionalProp1: z.record(z.unknown()).optional(),
  }).optional(),
  createdBy: z.number().min(0, "Created by must be a positive number").optional(),
  roleId: z.string().min(1, "Select a role").optional(),
});

// Define the type for the Staff form data
export type StaffFormData = z.infer<typeof staffSchema>;