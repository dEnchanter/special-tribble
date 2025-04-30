/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/ProductDefForm.tsx
"use client"

import { Button, CustomButton } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { Form, FormControl, FormField, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Endpoint } from "@/services/api";
import { fetchPost, fetchPatch } from "@/services/fetcher";
import { toast } from "sonner";
import { z } from "zod";
import { ProductDefFormData, productDefSchema } from "@/schemas/productDefSchema"; // Assuming productDefSchema is defined
import { useStaff } from "@/hooks/useStaff";

interface ProductDefFormProps extends React.ComponentProps<"form"> {
  closeDialog: () => void;
  initialValues?: Partial<ProductDef>;
}

const ProductDefForm = ({ className, closeDialog, initialValues }: ProductDefFormProps) => {
  const form = useForm<z.infer<typeof productDefSchema>>({
    resolver: zodResolver(productDefSchema),
    defaultValues: {
      code: initialValues?.code || "",
      name: initialValues?.name || "",
      cost: initialValues?.cost || 0,
      def: initialValues?.def || {},
      productSizes: initialValues?.productSizes || {},
      description: initialValues?.description || "",
      genderType: initialValues?.genderType || "",
      creatorId: initialValues?.creatorId || 0,
    },
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const { data: staffMembers, isLoading: staffLoading, isError: staffError } = useStaff();

  const onSubmit: SubmitHandler<ProductDefFormData> = async (data) => {
    setIsLoadingSubmit(true);

    const processedData = { ...data };

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(`${Endpoint.UPDATE_PRODUCT_DEF}/${initialValues.id}`, processedData);
        toast.success(responseData?.message || "Product Definition updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_PRODUCT_DEF, processedData);
        toast.success(responseData?.message || "Product Definition created successfully!");
      }
      closeDialog();
    } catch (error: any) {
      toast.error(error?.message || 'An unexpected error occurred');
    } finally {
      setIsLoadingSubmit(false);
    }
  };

  return (
    <>
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Product Definition</div>
      <Form {...form}>
        <form 
          className={cn("space-y-6", className)} // Added space between sections and className from props
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Product Definition Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Product Code</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Product Code" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Product Name</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="cost"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Product Cost</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="Product Cost" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Description</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />
            
            {/* Gender Type Selection */}
            <FormField
              control={form.control}
              name="genderType"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Gender Type</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Select value={String(field.value)} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Unisex">Unisex</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="creatorId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Generated By</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Select value={String(field.value)} onValueChange={(value) => field.onChange(Number(value))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Staff" />
                      </SelectTrigger>
                      <SelectContent>
                        {staffLoading ? (
                          <SelectItem disabled value="nil">Loading...</SelectItem>
                        ) : staffError ? (
                          <SelectItem disabled value="nil">Error loading staff</SelectItem>
                        ) : (
                          staffMembers?.map((staff) => (
                            <SelectItem key={staff.id} value={staff.id.toString()}>
                              {staff.staffName}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-2">
            <Button type="button" size="lg" variant="outline" onClick={closeDialog}>Cancel</Button>
            <CustomButton
              type="submit"
              size="lg"
              className=" bg-[#0F3F5F] hover:bg-[#0F3F5F]"
              isLoading={isLoadingSubmit}
            >
              {initialValues?.id ? "Update Product Definition" : "Create Product Definition"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductDefForm;
