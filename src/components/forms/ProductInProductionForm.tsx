/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/ProductInProductionForm.tsx
"use client"

import { Button, CustomButton } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { Form, FormControl, FormField, FormMessage } from "../ui/form";
import { Endpoint } from "@/services/api";
import { fetchPost, fetchPatch } from "@/services/fetcher";
import { toast } from "sonner";
import { z } from "zod";
import { ProductInProductionFormData, productInProductionSchema } from "@/schemas/inProductionSchema";

const ProductInProductionForm = ({ closeDialog, initialValues }: { closeDialog: () => void, initialValues?: Partial<ProductInProduction> }) => {
  const form = useForm<z.infer<typeof productInProductionSchema>>({
    resolver: zodResolver(productInProductionSchema),
    defaultValues: {
      dateRequested: initialValues?.dateRequested || "",
      requestedBy: initialValues?.requestedBy || 0,
      quantity: initialValues?.quantity || {},
      productGuide: initialValues?.productGuide || {},
      isActive: initialValues?.isActive || true,
      productId: initialValues?.productId || 0,
    },
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmit: SubmitHandler<ProductInProductionFormData> = async (data) => {
    setIsLoadingSubmit(true);

    const processedData = { ...data };

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(`${Endpoint.UPDATE_PRODUCT_IN_PRODUCTION}/${initialValues.id}`, processedData);
        toast.success(responseData?.message || "Product in Production updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_PRODUCT_IN_PRODUCTION, processedData);
        toast.success(responseData?.message || "Product in Production created successfully!");
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
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Product in Production</div>
      <Form {...form}>
        <form 
          className="space-y-6" 
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Product in Production Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <FormField
              control={form.control}
              name="dateRequested"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Date Requested</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="date" placeholder="Date Requested" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="requestedBy"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Requested By (User ID)</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="Requested By" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="productId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Product ID</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="Product ID" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            {/* Other fields like quantity, product guide, etc., can be added here */}
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
              {initialValues?.id ? "Update Product in Production" : "Create Product in Production"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductInProductionForm;
