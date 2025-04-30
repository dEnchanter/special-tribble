/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/ProductionForm.tsx
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
import { ProductionFormData, productionSchema } from "@/schemas/productSchema";

const ProductionForm = ({ closeDialog, initialValues }: { closeDialog: () => void, initialValues?: Partial<Product> }) => {
  const form = useForm<z.infer<typeof productionSchema>>({
    resolver: zodResolver(productionSchema),
    defaultValues: {
      assignDate: initialValues?.assignDate || "",
      code: initialValues?.code || "",
      stage: initialValues?.stage || "",
      tailorId: initialValues?.tailorId || 0,
      productInfo: initialValues?.productInfo || {},
      materialRequestId: initialValues?.materialRequestId || 0,
    },
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmit: SubmitHandler<ProductionFormData> = async (data) => {
    setIsLoadingSubmit(true);

    const processedData = { ...data };

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(`${Endpoint.UPDATE_PRODUCTION}/${initialValues.id}`, processedData);
        toast.success(responseData?.message || "Production updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_PRODUCTION, processedData);
        toast.success(responseData?.message || "Production created successfully!");
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
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Production</div>
      <Form {...form}>
        <form 
          className="space-y-6" 
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Production Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <FormField
              control={form.control}
              name="assignDate"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Assign Date</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="date" placeholder="Assign Date" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Production Code</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Code" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="stage"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Stage</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Stage" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="tailorId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Tailor ID</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="Tailor ID" {...field} />
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
              {initialValues?.id ? "Update Production" : "Create Production"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductionForm;
