/* eslint-disable @typescript-eslint/no-explicit-any */
// components/forms/ProductionStagesForm.tsx
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
import { ProductionStagesFormData, productionStagesSchema } from "@/schemas/productionStageSchema";

const ProductionStagesForm = ({ closeDialog, initialValues }: { closeDialog: () => void, initialValues?: Partial<ProductionStages> }) => {
  const form = useForm<z.infer<typeof productionStagesSchema>>({
    resolver: zodResolver(productionStagesSchema),
    defaultValues: {
      changeDate: initialValues?.changeDate || "",
      stageName: initialValues?.stageName || "",
      description: initialValues?.description || "",
      productionId: initialValues?.productionId || 0,
      staffId: initialValues?.staffId || 0,
    },
  });

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const onSubmit: SubmitHandler<ProductionStagesFormData> = async (data) => {
    setIsLoadingSubmit(true);

    const processedData = { ...data };

    try {
      if (initialValues?.id) {
        const responseData: any = await fetchPatch(`${Endpoint.UPDATE_PRODUCTION_STAGES}/${initialValues.id}`, processedData);
        toast.success(responseData?.message || "Production Stage updated successfully!");
      } else {
        const responseData: any = await fetchPost(Endpoint.CREATE_PRODUCTION_STAGES, processedData);
        toast.success(responseData?.message || "Production Stage created successfully!");
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
      <div className="font-medium">{initialValues ? 'Update' : 'Create'} Production Stage</div>
      <Form {...form}>
        <form 
          className="space-y-6" 
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Production Stage Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <FormField
              control={form.control}
              name="changeDate"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Change Date</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="date" placeholder="Change Date" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="stageName"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Stage Name</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input placeholder="Stage Name" {...field} />
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

            <FormField
              control={form.control}
              name="productionId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Production ID</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="Production ID" {...field} />
                  </FormControl>
                  {error && <FormMessage className="text-[#DC3E42] text-xs p-1">{error.message}</FormMessage>}
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="staffId"
              render={({ field, fieldState: { error } }) => (
                <div>
                  <Label className="text-xs">Staff ID</Label>
                  <FormControl className={field.value ? 'font-medium' : 'border-gray-300'}>
                    <Input type="number" placeholder="Staff ID" {...field} />
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
              {initialValues?.id ? "Update Production Stage" : "Create Production Stage"}
            </CustomButton>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductionStagesForm;
